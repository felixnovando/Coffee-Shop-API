import { Router } from "express";
import FileMiddleware from "../middleware/FileMiddleware";
import { AddFileHandler, ClearFileHandler, DeleteFileHandler, GetAllFileHandler, GetFileHandler } from "../handler/file";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router: Router = Router();

const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
if (disableAuth === false) {
    router.use(AuthMiddleware);
}

router.get("/", GetAllFileHandler);

router.post("/", FileMiddleware, AddFileHandler);

router.delete("/", DeleteFileHandler);

router.delete("/clear", ClearFileHandler);

router.get("/:id", GetFileHandler);

export default router;