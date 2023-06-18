import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getAllTransaction } from "../../model/Transaction";

export const GetAllTransactionHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllTransaction();
    });
};