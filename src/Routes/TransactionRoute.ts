import { Request, Response, Router } from "express";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { handleError, handleTransaction } from "../helper/ResponseHelper";
import { Transaction, addTransaction, deleteTransaction, getAllTransaction, getTransaction, updateTransaction } from "../model/Transaction";
import { plainToInstance } from "class-transformer";
import { DeleteTransactionDTO, InsertTransactionDTO, UpdateTransactionDTO } from "../dto/transaction";
import { validateDTO } from "../dto/validate";
import { addDetailTransaction } from "../model/TransactionDetail";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", async (req: Request, res: Response) => {
    handleTransaction(res, "Success", async () => {
        return await getAllTransaction();
    });
});

router.post("/", async (req: Request, res: Response) => {
    const body = plainToInstance(InsertTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Added", async () => {
        const transaction = await addTransaction(body);

        const details = await Promise.all(body.details.map(async (detail) => {
            const detaiData = await addDetailTransaction(transaction.id, detail);
            return detaiData;
        }));

        return <Transaction>{
            ...transaction,
            transaction_details: details
        };
    });
});

router.put("/", async (req: Request, res: Response) => {
    const body = plainToInstance(UpdateTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Updated", async () => {
        return await updateTransaction(body);
    });
});

router.delete("/", async (req: Request, res: Response) => {
    const body = plainToInstance(DeleteTransactionDTO, req.body);

    const errors = await validateDTO(body);
    if (errors) {
        handleError(res, errors);
        return;
    }

    handleTransaction(res, "Transaction Deleted", async () => {
        return await deleteTransaction(body.id);
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    handleTransaction(res, "Success", async () => {
        return await getTransaction(id);
    });
});


export default router;