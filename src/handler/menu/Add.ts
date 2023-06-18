import { plainToInstance } from "class-transformer";
import { InsertMenuDTO } from "../../dto/menu";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { addMenu } from "../../model/Menu";
import { Request, Response } from "express";
import { uploadFile } from "../../helper/FileHelper";

export const AddMenuHandler = async (req: Request, res: Response) => {
    const uploadedFile = req.file ? await uploadFile(req.file) : null;

    const body = plainToInstance(InsertMenuDTO, {
        ...req.body,
        fileId: uploadedFile?.id ?? undefined
    });

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Menu Added", async () => {
        return await addMenu(body);
    });
};