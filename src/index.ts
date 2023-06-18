import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./Routes/UserRoute";
import menuRouter from "./Routes/MenuRoute";
import customerRouter from "./Routes/CustomerRoute";
import transactionRouter from "./Routes/TransactionRoute";
import authRouter from "./Routes/AuthRoute";
import toppingRouter from "./Routes/ToppingRoute";
import fileRouter from "./Routes/FileRoute";
import typeRouter from "./Routes/PaymentRoute";
import path from "path";
import cors from "cors";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS !== "*" ? process.env.ALLOWED_ORIGINS?.split(",") : "*";

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

const app: Express = express();
const port = process.env.PORT;

app.use(cors(options));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use("/user", userRouter);

app.use("/menu", menuRouter);

app.use("/payment", typeRouter);

app.use("/file", fileRouter);

app.use("/topping", toppingRouter);

app.use("/customer", customerRouter);

app.use("/transaction", transactionRouter);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    res.redirect("Home.html");
});

app.listen(port, () => {
    console.log(`Server is runing at https://localhost/${port}`);
});