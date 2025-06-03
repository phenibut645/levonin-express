import { Request, Response } from "express"
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";

export const isUserToken = async (req: Request, res: Response) => {
    if(req.params.userId && req.params.token){
        const {userId, token} = req.params;
        const {success, response, error} = await DatabaseHandler.IsUserToken(token, Number(userId));
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
                error: "token or userId is missing"
            }
        })
    }
}