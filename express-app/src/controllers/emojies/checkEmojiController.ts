import { Request, Response } from "express";
import pool from "../../config/db.js";
import { Emoji } from "../../types/emoji.type";
import { RowDataPacket } from "mysql2/promise";

interface EmojiCheckResponse {
    exists: boolean
}

export const checkEmojiController = async (req: Request, res: Response): Promise<void> => {
    const { tag } = req.query;
    if(!tag){
        await res.status(400).json({"error": "Emoji tag is required"});
        return;
    }
    try{
        const [rows] = await pool.query<(Emoji & RowDataPacket)[]>('SELECT VisualID FROM MessagingVisuals WHERE tag = ?', [tag]);
        const message: EmojiCheckResponse = {
            exists: rows.length > 0 
        }
        await res.json(message);
    }
    catch(err: unknown){
        console.error(err);
        await res.status(500).json({error: "Database error4"})
    }
};