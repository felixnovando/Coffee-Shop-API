import { Request, Response } from "express";
import { handleTransaction } from "../../Helper/ResponseHelper";
import { uploadFile } from "../../Helper/FileHelper";

export const AddFileHandler = (req: Request, res: Response) => {
    const file = req.file;

    handleTransaction(res, "File Uploaded", async () => {

        if (file === undefined) throw new Error("File must be exists");

        return await uploadFile(file);
    });
};