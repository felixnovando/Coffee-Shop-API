import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { DeleteFileDTO } from "../../dto/file";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { deleteFile } from "../../model/File";

export const DeleteFileHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteFileDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "File Deleted", async () => {
        return await deleteFile(body.id);
    });
};