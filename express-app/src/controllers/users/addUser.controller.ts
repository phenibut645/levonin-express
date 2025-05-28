import { Request, Response } from "express";
import pool from "../../config/db.js";
import { DatabaseHandler } from "../../handlers/DatabaseHandler.js";


export const addUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const missing = ["username", "email", "password"].find(key => !req.body[key]);
        if (missing) {
             res.status(400).json({ error: `Missing field: ${missing}` });
             return;
        }
        const {username, email, password} = req.body;
        const { success, response, error } = await DatabaseHandler.AddUser({ username, email, password, returnId: true });
        if(!success) res.status(400).json({
            response:{
                success: false,
                message: error
            }
        })
        else if(success && response) res.json({
            response:{
                success:true,
                returnId: response
            }
        })
        return;
        
    }
    catch (err:unknown){
        console.log(err);
        await res.status(500).json({error: "unknown issue"});
    }

}