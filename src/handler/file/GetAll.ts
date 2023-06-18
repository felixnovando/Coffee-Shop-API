import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getAllFile } from "../../model/File";

export const GetAllFileHandler = (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllFile();
    });
};