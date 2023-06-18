import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { Request, Response } from "express";
import { DeleteToppingDTO } from "../../dto/topping";
import { deleteTopping } from "../../model/Topping";

export const DeleteToppingHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteToppingDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Topping Deleted", async () => {
        return await deleteTopping(body.id);
    });
};