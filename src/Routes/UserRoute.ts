import { Router } from "express";
import { AddUserHandler, DeleteUserHandler, GetAllUserHandler, GetUserHandler, UpdateUserHandler } from "../handler/user";

const router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllUserHandler);

router.post("/", AddUserHandler);

router.put("/", UpdateUserHandler);

router.delete("/", DeleteUserHandler);

router.get("/:id", GetUserHandler);

export default router;
