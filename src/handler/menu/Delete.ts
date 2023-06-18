import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { Request, Response } from "express";
import { DeleteMenuDTO } from "../../dto/menu";
import { deleteMenu } from "../../model/Menu";

export const DeleteMenuHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteMenuDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Menu Deleted", async () => {
        return await deleteMenu(body.id);
    });
};