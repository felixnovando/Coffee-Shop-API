import { Router } from "express";
import { LoginHandler, RefreshHandler, TestHandler } from "../handler/auth";

const router: Router = Router();

router.post("/login", LoginHandler);

router.get("/test", TestHandler);

router.get("/refresh", RefreshHandler);

export default router;
