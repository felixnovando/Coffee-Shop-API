import { Router } from "express";
import { AddPaymentHandler, DeletePaymentHandler, GetAllPaymentHandler, GetPaymentHandler, UpdatePaymentHandler } from "../handler/payment";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllPaymentHandler);

router.post("/", AddPaymentHandler);

router.put("/", UpdatePaymentHandler);

router.delete("/", DeletePaymentHandler);

router.get("/:id", GetPaymentHandler);

export default router;