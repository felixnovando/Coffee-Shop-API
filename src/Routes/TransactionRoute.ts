import { Router } from "express";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { AddTransactionHandler, DeleteTransactionHandler, GetAllTransactionHandler, GetTransactionHandler, UpdateTransactionHandler } from "../handler/transaction";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllTransactionHandler);

router.post("/", AddTransactionHandler);

router.put("/", UpdateTransactionHandler);

router.delete("/", DeleteTransactionHandler);

router.get("/:id", GetTransactionHandler);


export default router;