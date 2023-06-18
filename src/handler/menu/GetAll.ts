import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getAllMenu } from "../../model/Menu";

export const GetAllMenuHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllMenu();
    });
};