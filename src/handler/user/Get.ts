import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getUser } from "../../model/User";

export const GetUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getUser(id);
    });
};