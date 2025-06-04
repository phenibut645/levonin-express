import { Response, Request } from "express";
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";

export const checkToken = async (req: Request, res: Response) => {
    if (req.params.token){
        const { token } = req.params;
        const { success, response, error } = await DatabaseHandler.CheckToken(token);
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