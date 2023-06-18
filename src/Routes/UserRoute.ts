import { Router } from "express";
import { AddUserHandler, DeleteUserHandler, GetAllUserHandler, GetUserHandler, UpdateUserHandler } from "../handler/user";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllUserHandler);

router.post("/", AddUserHandler);

router.put("/", UpdateUserHandler);

router.delete("/", DeleteUserHandler);

router.get("/:id", GetUserHandler);

export default router;
