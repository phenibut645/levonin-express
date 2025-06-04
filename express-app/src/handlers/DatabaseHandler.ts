import { RowDataPacket } from "mysql2";
import pool from "../config/db.js";
import { User } from "../types/user.type";
import { defaultUserRoleId, defaultUserStatusId, user } from "../config/configData.js";
import { EncryptionHandler } from "./EncryptionHandler.js";

interface DBHandlerResponse<T> {
    success: boolean,
    response: T | null,
    error?: string
}

interface Usernames {
    refreshed: boolean,
    usernames: string[]
}

interface AddUserProps{
    username: string,
    email: string,
    password: string,
    roleId?: number,
    statusId?: number,
    returnId?: boolean
}

export class DatabaseHandler {

    static async GetUsers(): Promise<DBHandlerResponse<User[]>> {
        let errorMsg = "Unknown error";
        try{
            const [rows] = await pool.query<(User & RowDataPacket)[]>("SELECT * FROM Users");
            return {success: true, response: rows};
        }
        catch(err: unknown){
            console.log(err)

            if(typeof err === "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success: false, response: null, error: errorMsg};
        }
    }

    static async CheckUsername(username: string): Promise<DBHandlerResponse<boolean>>{
        let errorMsg = "Unknown error";
        const response: DBHandlerResponse<boolean> = {
            success: true,
            response: null
        }
        try{
            const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserID FROM Users WHERE Username = ?", [username]);
            response.response = rows.length > 0;
        }
        catch(err:unknown){
            response.success = false;

            if(typeof err === "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            response["error"] = errorMsg;
        }
        return response;
    }

    static async AddUser({username, email, password, roleId, statusId, returnId}: AddUserProps): Promise<DBHandlerResponse<number>>{
        let errorMsg = "Unknown error";
        let userId = null;
        const { success: checkSuccess, response: checkResponse, error: checkError} = await this.CheckUsername(username);

        if(!checkSuccess || checkResponse) return {success: false, response: null, error: checkError || "Username is already taken"};

        try{
            const hashedPassword = await EncryptionHandler.hashPassword(password);
            await pool.query("INSERT INTO Users(Username, Email, PasswordHash, RoleID, UserStatusID) VALUES(?, ?, ?, ?, ?);",
                 [username, email, hashedPassword, roleId ? roleId : defaultUserRoleId, statusId ? statusId : defaultUserStatusId])
            if(returnId){
                const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserID FROM Users WHERE Username = ?", [username]);
                userId = rows[0].UserID;
            }
            return {success: true, response: userId, error: errorMsg};
        }
        catch(err: unknown){
            console.log(err)

            if(typeof err === "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success: false, response: null, error: errorMsg};
        }
    }
    static async CheckToken(token: string): Promise<DBHandlerResponse<boolean>>{
        let errorMsg = "Unknown error";
        let response = false;
        try{
            const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserTokenID FROM UserTokens WHERE Token = ?", [token]);
            if(rows.length) response = true;
            return {success: true, response}
        }
        catch(err: unknown){
            console.log(err);

            if(typeof err == "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success: false, response: false, error: errorMsg};
        }
    }
    static async IsUserToken(token: string, userId: number){
        let errorMsg = "Unknown error";
        let response = false;
        try{
            const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserTokenID FROM UserTokens WHERE Token = ? AND UserID = ?", [token, userId]);
            if(rows.length) response = true;
            return {success: true, response}
        }
        catch(err: unknown){
            console.log(err);

            if(typeof err == "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success: false, response: false, error: errorMsg};
        }
    }

    static async GetUsersInChannel(channel_id: number){
        let errorMsg = "Unknown error";
        try{
            const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserID FROM ChatUsers WHERE ChatID = ?", [channel_id]);
            return {success: true, response: rows}
        }
        catch(err: unknown){
            console.log(err);

            if(typeof err == "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success: false, error: errorMsg};
        }
    }

    static async GetUserId(username: string){
        let errorMsg = "Unknown error";
        try{
            const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserID FROM Users WHERE Username = ?", [username]);
            return {success: true, response: rows.length ? rows[0]["UserID"] : null}
        }
        catch(err: unknown){
            console.log(err);
            if(typeof err === "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;

            return {success:false, error: errorMsg}
        }
    }
    static async SendMessage(content: string, userId: number, chatId: number): Promise<DBHandlerResponse<boolean>>{
        let errorMsg = "Unknown error";
        try{

            await pool.query<(number & RowDataPacket)[]>("INSERT INTO ChatMessages(Content, CreatedAt, ChatID, UserID) VALUES (?, ?, ?, ?)", [content, new Date().toISOString(), chatId, userId]);
            return {success: true, response: true}
        }
        catch(err: unknown){
            console.log(err);
            if(typeof err === "string") errorMsg = err;
            else if(err instanceof Error) errorMsg = err.message;
            return {success:false, response: false, error: errorMsg}
        }
    }
}

// Example of method

// let errorMsg = "Unknown error";
// let response = false;
// try{
//     const [rows] = await pool.query<(number & RowDataPacket)[]>("SELECT UserTokenID FROM UserTokens WHERE Token = ? AND UserID = ?", [token, userId]);
//     if(rows.length) response = true;
//     return {success: true, response}
// }
// catch(err: unknown){
//     console.log(err);

//     if(typeof err == "string") errorMsg = err;
//     else if(err instanceof Error) errorMsg = err.message;

//     return {success: false, response: false, error: errorMsg};
// }