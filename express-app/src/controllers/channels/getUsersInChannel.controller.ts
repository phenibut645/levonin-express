import { Request, Response } from "express"
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";

export const getUsersInChannel = async (req: Request, res: Response) => {
    if ( req.params.channel_id ){
        const { channel_id } = req.params;
        const { success, response, error } = await DatabaseHandler.GetUsersInChannel(Number(channel_id));
        if(success){
            res.json({response: {
                success:true,
                response
            }})
        }
        else{
            res.status(501).json({
                response: {
                    success,
                    error: "idk"
                }
            })
        }

    }
}