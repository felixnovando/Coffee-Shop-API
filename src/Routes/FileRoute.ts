import { Router } from "express";
import FileMiddleware from "../Middleware/FileMiddleware";
// import AuthMiddleware from "../Middleware/AuthMiddleware";
import { AddFileHandler, ClearFileHandler, DeleteFileHandler, GetAllFileHandler, GetFileHandler } from "../handler/file";

const router: Router = Router();

// router.use(AuthMiddleware);

router.get("/", GetAllFileHandler);

router.post("/", FileMiddleware, AddFileHandler);

router.delete("/", DeleteFileHandler);

router.delete("/clear", ClearFileHandler);

router.get("/:id", GetFileHandler);

export default router;