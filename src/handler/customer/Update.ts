import { plainToInstance } from "class-transformer";
import { UpdateCustomerDTO } from "../../dto/customer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { updateCustomer } from "../../model/Customer";
import { Request, Response } from "express";

export const UpdateCustomerHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(UpdateCustomerDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Customer Updated", async () => {
        return await updateCustomer(body);
    });
};