import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UpdatePaymentDTO } from "../../dto/payment";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { updatePayment } from "../../model/Payment";

export const UpdatePaymentHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(UpdatePaymentDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Payment Updated", async () => {
        return await updatePayment(body);
    });
};