import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { uploadFile } from "../../helper/FileHelper";

export const AddFileHandler = (req: Request, res: Response) => {
    const file = req.file;

    handleTransaction(res, "File Uploaded", async () => {

        if (file === undefined) throw new Error("File must be exists");

        return await uploadFile(file);
    });
};