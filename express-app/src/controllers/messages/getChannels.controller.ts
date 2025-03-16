import { Request, Response } from "express";
import pool from "../../config/db.js";
import { ChannelUser } from "../../types/channelUser.type";
import { RowDataPacket } from "mysql2";

interface GetChannelsResponse {
    channels: ChannelUser[]
}

export const getChannelsController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user!;
    try{
        const [rows] = await pool.query<(ChannelUser & RowDataPacket)[]>("SELECT * FROM channel_users WHERE user_id = ?", [id]);
        const response: GetChannelsResponse = {
            channels: rows
        }
        await res.json(response);
    }
    catch(err: unknown){
        await res.status(500).json({error: "GetChannels: Database error"});
    }
    
}