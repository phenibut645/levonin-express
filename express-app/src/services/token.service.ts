import pool from "../config/db.js";
import crypto from "crypto";
import { DateTime } from "luxon";
import { Token } from "../types/token.type";
import { RowDataPacket } from "mysql2";
import { token_expiration_time } from "../config/configData.js";

export interface TokenStructure {
    token: string,
    createdAt: string,
    userId: number
}

export interface VerifyTokenResponse {
    exists?: boolean,
    expired?: boolean | null,
    userId?: number | null,
    error?: string
}

export const generateToken = async (userId: number): Promise<TokenStructure> => {
    const token = crypto.randomBytes(32).toString("hex");
    const createdAt = DateTime.now().toISO();

    await pool.query("INSERT INTO tokens(TOKEN, created_at) VALUES (?, ?, ?)", [token, createdAt, userId])
    return { token, createdAt, userId };
};

export const verifyToken = async (token: string): Promise<VerifyTokenResponse> => {
    const verifyTokenResponse: VerifyTokenResponse = {};
    try{
        const [rows] = await pool.query<(Token & RowDataPacket)[]>("SELECT * FROM tokens WHERE token = ?", [token]);
        const exists = rows.length > 0;
        const expired = exists ? DateTime.fromISO(rows[0].created_at).diffNow("minutes").minutes > token_expiration_time : null;

        verifyTokenResponse.exists = exists;
        verifyTokenResponse.expired = expired;
        verifyTokenResponse.userId = exists ? rows[0].user_id : null;

        if(expired){
            await pool.query("DELETE FROM tokens WHERE id = ?", [rows[0].id]);
        }
    }
    catch(err: unknown){
        verifyTokenResponse.error = "Database error";
    }
    return verifyTokenResponse;
}