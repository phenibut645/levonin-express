import { Request, Response } from "express"
import pool from "../../config/db.js";
import { RowDataPacket } from "mysql2";

export interface UsersInChannel{
    ChatID: number,
    ChatUserID: number,
    Username: string,
    StatusName: string,
    RoleName: string,
    IsChatCreator: number,
}

interface Chat{
    ChatID: number
}

const getUsers = async (req:Request, res: Response) => {
    let error = "Unknown";
    try{
        const [rows] = await pool.query<(UsersInChannel & RowDataPacket)[]>("SELECT cu.ChatID AS ChatID, cu.ChatUserID AS ChatUserID, u.Username AS Username, us.StatusName AS StatusName, r.RoleName AS RoleName, cu.IsChatCreator AS IsChatCreator FROM ChatUsers AS cu INNER JOIN Users AS u ON cu.UserID = u.UserID INNER JOIN UserStatuses AS us ON u.UserStatusID = us.UserStatusID INNER JOIN Roles AS r ON u.RoleID = r.RoleID");
        console.log("bilet na kometu", req.user);
        const [chats] = await pool.query<(Chat & RowDataPacket)[]>("SELECT ChatID FROM ChatUsers WHERE UserID = ?", [req.user?.id]);
        const chatIds = chats.map(chat => chat.ChatID);
        console.log("OH GODAAAMN");
        rows.forEach(row => {
            console.log(row);
        })
        const test = rows.filter(row => chatIds.includes(row.ChatID));
        console.log(test);
        console.log("ommgmggm");
        res.json({response:{
            success: true,
            users: test
        }})
        return;
    }
    catch(err: unknown){
        console.log(err);
        
        if(typeof err === "string") error = err;
        res.status(401).json({response:{
            success: false,
            error
        }})
        return;
    }
};

export default getUsers;