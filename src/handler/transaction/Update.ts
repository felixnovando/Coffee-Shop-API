import { Request, Response } from "express";
import { UpdateTransactionDTO } from "../../dto/transaction";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { updateTransaction } from "../../model/Transaction";
import { plainToInstance } from "class-transformer";

export const UpdateTransactionHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(UpdateTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Updated", async () => {
        return await updateTransaction(body);
    });
};