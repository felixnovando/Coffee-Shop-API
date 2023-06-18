import { plainToInstance } from "class-transformer";
import { InsertTransactionDTO } from "../../dto/transaction";
import { Request, Response } from "express";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { Transaction, addTransaction } from "../../model/Transaction";
import { addDetailTransaction } from "../../model/TransactionDetail";

export const AddTransactionHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(InsertTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Added", async () => {
        const transaction = await addTransaction(body);

        const details = await Promise.all(body.details.map(async (detail) => {
            const detaiData = await addDetailTransaction(transaction.id, detail);
            return detaiData;
        }));

        return <Transaction>{
            ...transaction,
            transaction_details: details
        };
    });
};