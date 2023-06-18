import { Router } from "express";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { AddMenuHandler, DeleteMenuHandler, GetAllMenuHandler, GetMenuHandler, UpdateMenuHandler } from "../handler/menu";
import FileMiddleware from "../Middleware/FileMiddleware";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllMenuHandler);

router.post("/", FileMiddleware, AddMenuHandler);

router.put("/", FileMiddleware, UpdateMenuHandler);

router.delete("/", DeleteMenuHandler);

router.get("/:id", GetMenuHandler);

export default router;

