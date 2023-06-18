import { Router } from "express";
import { AddCustomerHandler, DeleteCustomerHandler, GetAllCustomerHandler, GetCustomerHandler, UpdateCustomerHandler } from "../handler/customer";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllCustomerHandler);

router.post("/", AddCustomerHandler);

router.put("/", UpdateCustomerHandler);

router.delete("/", DeleteCustomerHandler);

router.get("/:id", GetCustomerHandler);

export default router;