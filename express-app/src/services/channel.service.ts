import { RowDataPacket } from "mysql2"
import pool from "../config/db.js"
import { ChannelUser } from "../types/channelUser.type"

export const isUserInChannel = async (user_id: number, channel_id: number): Promise<boolean | null> => {
    try{
        const [rows] = await pool.query<(ChannelUser & RowDataPacket)[]>("SELECT * FROM ChatUsers WHERE UserID = ? AND ChatID = ?", [user_id, channel_id]);
        return rows.length > 0;
    }
    catch(err: unknown){
        console.error(err);
        return null;
    }
}