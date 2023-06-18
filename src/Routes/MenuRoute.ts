import { Router } from "express";
import { AddMenuHandler, DeleteMenuHandler, GetAllMenuHandler, GetMenuHandler, UpdateMenuHandler } from "../handler/menu";
import FileMiddleware from "../middleware/FileMiddleware";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllMenuHandler);

router.post("/", FileMiddleware, AddMenuHandler);

router.put("/", FileMiddleware, UpdateMenuHandler);

router.delete("/", DeleteMenuHandler);

router.get("/:id", GetMenuHandler);

export default router;

