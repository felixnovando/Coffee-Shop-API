import { Router } from "express";
import { LoginHandler, RefreshHandler, TestHandler } from "../handler/auth";
// import AuthMiddleware from "../Middleware/AuthMiddleware";

const router: Router = Router();

// const disableAuth = process.env.DISABLE_AUTH === "true" ? true : false;
// if (disableAuth === false) {
//   router.use(AuthMiddleware);
// }

router.post("/login", LoginHandler);

router.get("/test", TestHandler);

router.get("/refresh", RefreshHandler);

export default router;
