import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { getAllUser } from "../../model/User";

export const GetAllUserHandler = async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllUser();
    });
};