import { Request, Response } from "express";
import pool from "../config/db.js";

export const getUsers = async (req: Request, res: Response) => {
    console.log(process.env.USER, process.env.HOST, process.env.PASSWORD)
    try{
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    }
    catch(err: unknown){
        res.json({user:process.env.USER});
    }
}