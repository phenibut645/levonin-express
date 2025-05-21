import { Request, Response } from "express";
import pool from "../config/db.js";

export const getUsers = async (req: Request, res: Response) => {
    try{
        const [rows] = await pool.query("SELECT * FROM Users");
        res.json(rows);
    }
    catch(err: unknown){
        console.log(err)
        res.json({"message": "err"});
    }
}