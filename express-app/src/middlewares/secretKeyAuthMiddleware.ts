import { Request, Response, NextFunction } from "express"
import { secretApiKey } from "../config/configData.js";

export const secretKeyAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = req.headers["x-api-key"];
    if(!key){
        await res.status(401).json({error: "Key is missing"});
        return;
    }
    else if (key !== secretApiKey){
        await res.status(403).json({error: "Access denied"});
        return;
    }

    next();
}