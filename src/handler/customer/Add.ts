import { plainToInstance } from "class-transformer";
import { InsertCustomerDTO } from "../../dto/customer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../helper/ResponseHelper";
import { addCustomer } from "../../model/Customer";
import { Request, Response } from "express";

export const AddCustomerHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(InsertCustomerDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Customer Added", async () => {
        return await addCustomer(body);
    });
};