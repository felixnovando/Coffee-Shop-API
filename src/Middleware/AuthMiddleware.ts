import { NextFunction, Request, Response } from "express";
import { getToken, verifyAccessToken } from "../helper/AuthHelper";
import { ErrorResponse } from "../types";
import { getUser } from "../model/User";


const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization || req.headers.authorization == "")
            throw new Error("Token was not provided");

        const jwt_token = getToken(req);

        const data = verifyAccessToken(jwt_token);

        if (data) {
            const user = await getUser(data.id);
            req.user = user;
            return next();
        }

        throw new Error("Invalid Token");
    } catch (e) {
        res.status(401).json(<ErrorResponse>{
            message: "Unauthorized",
            errors: [(e as Error).message]
        });
    }
};

export default AuthMiddleware;