import { Request, Response } from "express"
import pool from "../../config/db.js";
import { ChannelMessage } from "../../types/channelMessage.type.js";
import { RowDataPacket } from "mysql2";

export const getMessagesController = async (req: Request, res: Response): Promise<void> => {
    try{
        const {channel_id} = req.params;
        const [rows] = await pool.query<(ChannelMessage & RowDataPacket)[]>("SELECT cm.ChatMessageID, cm.Content, cm.CreatedAt, cm.ChatID, cm.UserID, u.Username FROM ChatMessages cm INNER JOIN Users u ON u.UserID = cm.UserID WHERE ChatID = ?", channel_id);
        await res.json({messages: rows});
    }
    catch(err: unknown){
        await res.status(500).json({error: "GetMessages: Database error"});
    }
}