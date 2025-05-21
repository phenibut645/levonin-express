import { Request, Response, NextFunction } from "express"
import { isUserInChannel } from "../services/channel.service.js";

export const channelAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user){
        console.log("user id:", req.user.id);
        const { channel_id } = req.params;
        const { id } = req.user;
        
        if(channel_id){
            if(await isUserInChannel(Number(id), Number(channel_id))){
                next();
            }
            else{
                await res.status(400).json({error: "User isn't in channel. Access denied."})
            }
        }
        else{
            await res.status(400).json({error:"Channel id is required"})
        }
    }
    else{
        console.error("strange thing");
        await res.status(500).json({error: "Server can't find your user id"});
    }
}