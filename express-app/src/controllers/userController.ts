import { Request, Response } from "express";
import pool from "../config/db.js";
import { DatabaseHandler } from "../handlers/DatabaseHandler.js";

export const getUsers = async (req: Request, res: Response) => {
    try{
        const { response } = await DatabaseHandler.GetUsers();
        res.json(response);
    }
    catch(err: unknown){
        console.log(err)
        res.json({"message": "err"});
    }
}