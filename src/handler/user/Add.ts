import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { USER_ROLES, addUser } from "../../model/User";
import { Request, Response } from "express";
import { InsertUserDTO } from "../../dto/user";
import { hashPassword } from "../../helper/AuthHelper";

export const AddUserHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(InsertUserDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "User Added", async () => {

        if (!USER_ROLES.includes(body.role.toLowerCase())) {
            throw new Error("Invalid User Role");
        }

        return await addUser({ ...body, password: await hashPassword(body.password) });
    });
};