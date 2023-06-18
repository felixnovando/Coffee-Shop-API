import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getAllCustomer } from "../../model/Customer";

export const GetAllCustomerHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllCustomer();
    });
};