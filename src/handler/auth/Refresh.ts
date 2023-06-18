import { Request, Response } from "express";
import { VerifiedTokenResult, generateAccessToken, getToken, verifyRefreshToken } from "../../Helper/AuthHelper";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { LoggedUser } from "../../model/User";

export const RefreshHandler = async (req: Request, res: Response) => {
    const token = getToken(req);

    handleTransaction(res, "Success", async () => {
        const result: VerifiedTokenResult = verifyRefreshToken(token);

        const newToken = generateAccessToken(<LoggedUser>{
            id: result.id,
            role: result.role
        });

        interface RefreshTokenResult extends VerifiedTokenResult {
            access_token: string,
        }

        return <RefreshTokenResult>{
            ...result,
            access_token: newToken,
            exp: result.exp * 1000,
            iat: result.iat * 1000
        };
    });
};