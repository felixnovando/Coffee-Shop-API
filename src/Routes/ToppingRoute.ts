import { Router } from "express";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { AddToppingHandler, DeleteToppingHandler, GetAllToppingHandler, GetToppingHandler, UpdateToppingHandler } from "../handler/topping";
import FileMiddleware from "../Middleware/FileMiddleware";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllToppingHandler);

router.post("/", FileMiddleware, AddToppingHandler);

router.put("/", FileMiddleware, UpdateToppingHandler);

router.delete("/", DeleteToppingHandler);

router.get("/:id", GetToppingHandler);

export default router;

