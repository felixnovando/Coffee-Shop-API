import { Request, Response } from "express";
import { VerifiedTokenResult, getToken, verifyAccessToken } from "../../Helper/AuthHelper";
import { handleTransaction } from "../../Helper/ResponseHelper";

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