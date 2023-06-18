import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getPayment } from "../../model/Payment";

export const GetPaymentHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getPayment(id);
    });
};