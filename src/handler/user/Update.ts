import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UpdateUserDTO } from "../../dto/user";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { USER_ROLES, updateUser } from "../../model/User";
import { hashPassword } from "../../Helper/AuthHelper";

export const UpdateUserHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(UpdateUserDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "User Updated", async () => {

        if (body.role && !USER_ROLES.includes(body.role.toLowerCase())) {
            throw new Error("Invalid User Role");
        }

        return await updateUser({
            ...body,
            password: body.password ? await hashPassword(body.password) : body.password
        });
    });
};