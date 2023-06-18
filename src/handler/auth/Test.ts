import { Request, Response } from "express";
import { VerifiedTokenResult, getToken, verifyAccessToken } from "../../helper/AuthHelper";
import { handleTransaction } from "../../helper/ResponseHelper";

export const TestHandler = async (req: Request, res: Response) => {

    const token = getToken(req);

    handleTransaction(res, "Success", async () => {
        const result = verifyAccessToken(token);
        return <VerifiedTokenResult>{
            ...result,
            exp: result.exp * 1000,
            iat: result.iat * 1000
        };
    });
};