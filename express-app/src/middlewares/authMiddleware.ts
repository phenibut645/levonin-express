import { Request, Response, NextFunction } from "express"
import { verifyToken, VerifyTokenResponse } from "../services/token.service.js";

declare module "express"{
    export interface Request{
        user?:{id:string};
        reason?: string
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("ja cho pidor")
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            await res.status(401).json({error: "There is no token"});
            return;
        }
        const verifyTokenResponse: VerifyTokenResponse = await verifyToken(authHeader.split(" ")[1]);
        if(!verifyTokenResponse.error){
            if(verifyTokenResponse.exists && !verifyTokenResponse.expired){
                req.user = {id: verifyTokenResponse.userId!.toString()};
                next();
                return;
            }
            else{
                await res.status(403).json({error: `Permission denied${verifyTokenResponse.expired && ". Token expired"}`})
                return;
            }
        }
        else{
            await res.status(500).json({"error": verifyTokenResponse.error})
        }
    }
    catch(err: unknown){
        console.error(err);
        res.status(500).json({error:"Database error2"});
    }
}