import { Request, Response } from "express";
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";

export const checkUsername = async (req: Request, res: Response) => {
    if(req.params.username && typeof req.params.username === "string"){
        const {success, response, error } = await DatabaseHandler.CheckUsername(req.params.username);
        if(success) res.json({response: {
            success: true,
            exists: response
        }})
        else{
            res.status(500).json({response:{
                success: false,
                message: "Database error"
            }})
        }
    }
    else {
        res.status(401).json({response: {
            success: false,
            message: "Username is missing"
        }});
    }
}