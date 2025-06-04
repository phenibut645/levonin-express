import { Request, Response } from "express";
import pool from "../../config/db.js";
import { unwatchFile } from "fs";
import { RowDataPacket } from "mysql2";

export const addChannel = async (req: Request, res: Response) => {
    const missing = ["userId"].find(key => !req.body[key]);
        if (missing) {
             res.status(400).json({ error: `Missing field: ${missing}` });
             return;
        }
    try{
        const [rows] = await pool.query<(RowDataPacket)[]>("SELECT Username FROM Users WHERE UserID = ?", [req.body.userId]);
        if(!rows.length) {
            res.status(501).json({
                response: {
                    success: false,
                    error: "idk"
                }
            })
            return;
        }
        const username = rows[0]["Username"];

        const [rows2] = await pool.query<(RowDataPacket)[]>("SELECT Username FROM Users WHERE UserID = ?", [req.user?.id]);
        if(!rows2.length) {
            res.status(501).json({
                response: {
                    success: false,
                    error: "idk"
                }
            })
            return;
        }
        const username2 = rows[0]["Username"];

        await pool.query("INSERT INTO Chats(ChatName, ChatTypeID, ImageUrl) VALUES(?, ?, ?)", [`${username}-${username2}`, 2, "..."]);
        const [chatRows] = await pool.query<(RowDataPacket)[]>("SELECT ChatID FROM Chats WHERE ChatName = ?", [`${username}-${username2}`]);
        if(!rows2.length) {
            res.status(501).json({
                response: {
                    success: false,
                    error: "idk"
                }
            })
            return;
        }
        const chatId = chatRows[0]["ChatID"];

        await pool.query("INSERT INTO ChatUsers(IsChatCreator, ChatID, UserID) VALUES(?, ?, ?)", [1, chatId, req.user?.id]);
        await pool.query("INSERT INTO ChatUsers(IsChatCreator, ChatID, UserID) VALUES(?, ?, ?)", [0, chatId, req.body.userId]);
        res.json({response:{
            success:true
        }})
    }
    catch{
        res.status(501).json({
            response: {
                success: true,
                error: "idk"
            }
        })
    }
}