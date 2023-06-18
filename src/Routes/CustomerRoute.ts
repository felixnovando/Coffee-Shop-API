import { Router } from "express";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { AddCustomerHandler, DeleteCustomerHandler, GetAllCustomerHandler, GetCustomerHandler, UpdateCustomerHandler } from "../handler/customer";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllCustomerHandler);

router.post("/", AddCustomerHandler);

router.put("/", UpdateCustomerHandler);

router.delete("/", DeleteCustomerHandler);

router.get("/:id", GetCustomerHandler);

export default router;