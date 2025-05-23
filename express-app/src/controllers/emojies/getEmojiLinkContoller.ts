import { Request, Response } from "express";
import pool from "../../config/db.js";
import { RowDataPacket } from "mysql2/promise";
import { Emoji } from "../../types/emoji.type";
import { emojiesPath } from "../../config/configData.js";

interface GetEmojiLinkResponse {
    link: string;
}

export const getEmojiLinkController = async (req: Request, res: Response): Promise<void> => {
    const { tag } = req.query;

    if(!tag || typeof tag !== 'string'){
        await res.status(400).json({error: "Emoji tag is required"})
        return;
    }

    try{
        const [rows] = await pool.query<(Emoji & RowDataPacket)[]>("SELECT VisaulID, VisualPath, Tag FROM MessagingVisauls WHERE Tag = ?", [tag]);
        if(rows.length){
            const response: GetEmojiLinkResponse = {
                link: emojiesPath + "/" + rows[0].file_name
            };
            await res.json(response);
        }
        else{
            await res.status(400).json({error: "This tag doesn't exist"})
        }
    }
    catch(err: unknown){
        console.error(err);
        await res.status(500).json({error: "Database error3"})
    }
};