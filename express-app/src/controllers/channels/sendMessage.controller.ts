import { Request, Response } from "express";
import pool from "../../config/db.js";
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";
import { isUserInChannel } from "../../services/channel.service.js";


export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    if(!req.user){
        res.status(501).json({response:{
            success:false,
            error:"user id not found"
        }})
        return;
    }
    try{
        const missing = ["chatId", "content"].find(key => !req.body[key]);
        if (missing) {
             res.status(400).json({ error: `Missing field: ${missing}` });
             return;
        }
        const {chatId, content} = req.body;
        const { id } = req.user;
        if(await isUserInChannel(Number(id), Number(chatId))){
            await DatabaseHandler.SendMessage(content, Number(id), chatId);
            res.json({
                response:{
                    success:true
                }
            })
        }
        
    }
    catch(err:unknown){
        console.log(err);
        res.status(501).json({response:{
            success:false,
            error:"idk"
        }})
    }
}