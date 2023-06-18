import { Router } from "express";
import { AddToppingHandler, DeleteToppingHandler, GetAllToppingHandler, GetToppingHandler, UpdateToppingHandler } from "../handler/topping";
import FileMiddleware from "../middleware/FileMiddleware";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllToppingHandler);

router.post("/", FileMiddleware, AddToppingHandler);

router.put("/", FileMiddleware, UpdateToppingHandler);

router.delete("/", DeleteToppingHandler);

router.get("/:id", GetToppingHandler);

export default router;

