import { Request, Response } from "express";
import pool from "../../config/db.js";
import { ChannelUser } from "../../types/channelUser.type.js";
import { RowDataPacket } from "mysql2";


interface Users{
    ChatID: number,
    UserID: number,
    StatusName: string,
}

export const getUserChannelsController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user!;
    try{
        console.log("aloooo");
        const [rows] = await pool.query<(ChannelUser & RowDataPacket)[]>("SELECT c.ChatID as ChatID, c.ChatName as ChatName, cu.IsChatCreator as IsChatCreator, c.ImageUrl as ImageUrl, ct.TypeName AS ChatType FROM ChatUsers as cu INNER JOIN chats c ON cu.ChatID = c.ChatID INNER JOIN ChatTypes as ct ON c.ChatTypeID = ct.ChatTypeID WHERE UserID = ?", [id]);
        console.log(rows);
        const [ users ] = await pool.query<(Users & RowDataPacket)[]>("SELECT cu.UserID as UserID, cu.ChatID AS ChatID, us.StatusName AS StatusName FROM ChatUsers AS cu INNER JOIN Users AS u ON cu.UserID = u.UserID INNER JOIN UserStatuses AS us ON us.UserStatusID = u.UserStatusID INNER JOIN Chats AS c ON cu.ChatID = c.ChatID WHERE c.ChatTypeID = 2");
        console.log(users);
        const filtered = rows.map(row => {
            if (row.ChatType === "PM"){
                row.Status = users.find(el => row.ChatID == el.ChatID && el.UserID !== Number(id))?.StatusName;
            }
            return row;
        })
        console.log(users);
        await res.json({
            channels: filtered
        });
    }
    catch(err: unknown){
        await res.status(500).json({error: "GetChannels: Database error"});
    }
    
}