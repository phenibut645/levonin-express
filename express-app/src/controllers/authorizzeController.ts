import { Request, Response } from "express"
import pool from "../config/db.js";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.type";
import { generateToken } from "../services/token.service.js";

export const authorizeController = async (req: Request, res: Response) => {
    const { username, password } = req.query;
    if(username && password){
        const [rows] = await pool.query<(User & RowDataPacket)[]>("SELECT * FROM Users WHERE Username = ? AND PasswordHash = ?", [username, password]);
        if(rows.length){
            try{
                const tokenStructure = await generateToken(rows[0].id);
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
        await res.status(400).json({error: "Username and password is required"});
    }
}