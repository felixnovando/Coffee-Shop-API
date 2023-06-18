import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { DeletePaymentDTO } from "../../dto/payment";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { deletePayment } from "../../model/Payment";

export const DeletePaymentHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeletePaymentDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Payment Deleted", async () => {
        return await deletePayment(body.id);
    });
};