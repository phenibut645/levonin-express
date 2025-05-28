import { Request, Response } from "express"
import pool from "../config/db.js";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.type";
import { generateToken } from "../services/token.service.js";
import { EncryptionHandler } from "../handlers/EncryptionHandler.js";

export const authorizeController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(username && password){
        const hashedPassword = await EncryptionHandler.hashPassword(password);
        console.log(hashedPassword);
        const [rows] = await pool.query<(User & RowDataPacket)[]>("SELECT * FROM Users WHERE Username = ?", [username]);
        if(rows.length){
            const response = await EncryptionHandler.comparePasswords(password, rows[0].PasswordHash)
            if(response){
                try{
                    console.log(rows)
                    const tokenStructure = await generateToken(rows[0].UserID);
                    await res.json({token: tokenStructure.token});
                }
                catch(err: unknown){
                    console.error(err)
                    await res.status(500).json({error: "Authorize: Database error"});
                }
            }
            else{
                await res.status(400).json({error: "Invalid datas"});
            }
        }
        else{
            await res.status(400).json({error: "Invalid datas"});
        }
            
    }
    else{
        await res.status(400).json({error: "Username and password is required"});
    }
}