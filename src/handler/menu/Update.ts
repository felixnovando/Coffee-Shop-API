import { plainToInstance } from "class-transformer";
import { UpdateMenuDTO } from "../../dto/menu";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { updateMenu } from "../../model/Menu";
import { Request, Response } from "express";
import { uploadFile } from "../../Helper/FileHelper";

export const UpdateMenuHandler = async (req: Request, res: Response) => {
    const uploadedFile = req.file ? await uploadFile(req.file) : null;

    const body = plainToInstance(UpdateMenuDTO, {
        ...req.body,
        fileId: uploadedFile?.id ?? undefined
    });

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Menu Updated", async () => {
        return await updateMenu(body);
    });
};