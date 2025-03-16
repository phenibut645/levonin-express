import { Request, Response } from "express"
import pool from "../../config/db"
import { Channel } from "../../types/channel.types";
import { RowDataPacket } from "mysql2";

export const getChannelsController = async (req: Request, res: Response): Promise<void> => {
    const [rows] = await pool.query<(Channel & RowDataPacket)[]>("SELECT * FROM ");
}