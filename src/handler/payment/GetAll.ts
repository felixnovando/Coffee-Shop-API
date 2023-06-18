import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getAllPayment } from "../../model/Payment";

export const GetAllPaymentHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllPayment();
    });
};