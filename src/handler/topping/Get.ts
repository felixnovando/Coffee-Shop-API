import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getTopping } from "../../model/Topping";

export const GetToppingHandler = (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getTopping(id);
    });
};