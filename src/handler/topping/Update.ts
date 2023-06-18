import { plainToInstance } from "class-transformer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { Request, Response } from "express";
import { UpdateToppingDTO } from "../../dto/topping";
import { updateTopping } from "../../model/Topping";
import { uploadFile } from "../../helper/FileHelper";

export const UpdateToppingHandler = async (req: Request, res: Response) => {
    const uploadedFile = req.file ? await uploadFile(req.file) : null;

    const body = plainToInstance(UpdateToppingDTO, {
        ...req.body,
        fileId: uploadedFile?.id ?? undefined
    });

    const errors = await validateDTO(body);

    console.log(body);

    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Topping Updated", async () => {
        return await updateTopping(body);
    });
};