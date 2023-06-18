import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { LoggedUser, getUserByEmail } from "../../model/User";
import { LoginDTO } from "../../dto/auth";
import { Request, Response } from "express";
import { Token, generateAccessToken, generateRefreshToken, verifyPassword, expireTime, refreshTokenExpireTime } from "../../helper/AuthHelper";

export const LoginHandler = async (req: Request, res: Response) => {

    const body = plainToInstance(LoginDTO, req.body);

    const errors = await validateDTO(body);

    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Success", async () => {
        const user = await getUserByEmail(body.email);

        if (user === null)
            throw new Error("Invalid Email or Password");

        const isValid = await verifyPassword(body.password, user.password);

        if (isValid === false)
            throw new Error("Invalid Email or Password");

        const loggedUser: LoggedUser = {
            id: user.id,
            role: user.role
        };
        const token = generateAccessToken(loggedUser);
        const refreshToken = generateRefreshToken(loggedUser);
        const now = new Date();

        const at_exp = new Date(now.setSeconds(now.getSeconds() + expireTime)).getTime();
        const rt_exp = new Date(now.setSeconds(now.getSeconds() + refreshTokenExpireTime)).getTime();

        return <Token>{
            token: token,
            refresh_token: refreshToken,
            access_token_expire_time: at_exp,
            refresh_token_expire_time: rt_exp,
        };
    });
};