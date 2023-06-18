import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getAllTopping } from "../../model/Topping";

export const GetAllToppingHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllTopping();
    });
};