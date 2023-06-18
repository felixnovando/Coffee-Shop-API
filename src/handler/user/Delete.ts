import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { deleteUser } from "../../model/User";
import { Request, Response } from "express";
import { DeleteUserDTO } from "../../dto/user";

export const DeleteUserHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteUserDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "User Deleted", async () => {
        return await deleteUser(body.id);
    });
};