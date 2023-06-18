import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getCustomer } from "../../model/Customer";

export const GetCustomerHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getCustomer(id);
    });
};