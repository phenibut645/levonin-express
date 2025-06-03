import { Request, Response } from "express";
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";

interface Users{
    ChatID: number,
    UserID: number,
    StatusName: string,
}

export const getUserId = async (req: Request, res: Response): Promise<void> => {
    if (req.params.username){
        const { username } = req.params;
        const { success, response, error } = await DatabaseHandler.GetUserId(username);
        if(success){
            res.json({response:{
                success: true,
                message: response
            }})
        }
        else{
            console.log(error);
            res.status(501).json({response:{
                success: false,
                message: "idk"
            }})
        }
    }
    else{
        res.status(400).json({
            response: {
                success: false,
                error: "token is missing"
            }
        })
    }

}