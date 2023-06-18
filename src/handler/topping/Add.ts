import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { Request, Response } from "express";
import { InsertToppingDTO } from "../../dto/topping";
import { addTopping } from "../../model/Topping";
import { uploadFile } from "../../Helper/FileHelper";

export const AddToppingHandler = async (req: Request, res: Response) => {
    const uploadedFile = req.file ? await uploadFile(req.file) : null;

    const body = plainToInstance(InsertToppingDTO, {
        ...req.body,
        fileId: uploadedFile?.id ?? undefined
    });

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Topping Added", async () => {
        return await addTopping(body);
    });
};