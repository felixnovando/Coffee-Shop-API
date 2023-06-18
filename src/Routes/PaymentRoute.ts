import { Router } from "express";
import { AddPaymentHandler, DeletePaymentHandler, GetAllPaymentHandler, GetPaymentHandler, UpdatePaymentHandler } from "../handler/payment";
// import AuthMiddleware from "../Middleware/AuthMiddleware";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllPaymentHandler);

router.post("/", AddPaymentHandler);

router.put("/", UpdatePaymentHandler);

router.delete("/", DeletePaymentHandler);

router.get("/:id", GetPaymentHandler);

export default router;