import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getFile } from "../../model/File";

export const GetFileHandler = (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getFile(id);
    });
};