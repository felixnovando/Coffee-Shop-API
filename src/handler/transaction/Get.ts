import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getTransaction } from "../../model/Transaction";

export const GetTransactionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getTransaction(id);
    });
};