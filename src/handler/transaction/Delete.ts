import { plainToInstance } from "class-transformer";
import { DeleteTransactionDTO } from "../../dto/transaction";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { deleteTransaction } from "../../model/Transaction";
import { Request, Response } from "express";

export const DeleteTransactionHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Deleted", async () => {
        return await deleteTransaction(body.id);
    });
};