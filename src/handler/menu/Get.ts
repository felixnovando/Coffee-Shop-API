import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getMenu } from "../../model/Menu";

export const GetMenuHandler = (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getMenu(id);
    });
};