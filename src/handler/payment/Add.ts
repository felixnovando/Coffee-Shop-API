import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { InsertPaymentDTO } from "../../dto/payment";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { addPayment } from "../../model/Payment";

export const AddPaymentHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(InsertPaymentDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Payment Added", async () => {
        return await addPayment(body);
    });
};