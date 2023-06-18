import { plainToInstance } from "class-transformer";
import { DeleteCustomerDTO } from "../../dto/customer";
import { validateDTO } from "../../dto/validate";
import { handleError, handleTransaction } from "../../Helper/ResponseHelper";
import { deleteCustomer } from "../../model/Customer";
import { Request, Response } from "express";

export const DeleteCustomerHandler = async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteCustomerDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Customer Deleted", async () => {
        return await deleteCustomer(body.id);
    });
};