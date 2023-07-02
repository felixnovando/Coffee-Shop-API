import { Router } from "express";
import { AddTransactionHandler, DeleteTransactionHandler, GetAllTransactionHandler, GetTransactionHandler, UpdateTransactionHandler } from "../handler/transaction";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllTransactionHandler);

router.post("/", AddTransactionHandler);

router.put("/", UpdateTransactionHandler);

router.delete("/", DeleteTransactionHandler);

router.get("/:id", GetTransactionHandler);

export default router;