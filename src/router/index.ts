import { Router } from "express";
const router = Router();

// import customersRouter from "./customers";
import serviceRouter from "./service";
import authRouter from "./auth";
import skilsRouter from "./skils";
import cdnRouter from "./cdn";
import userRouter from "./user";

// router.use("/customers", customersRouter);
router.use("/services", serviceRouter);
router.use("/auth", authRouter);
router.use("/skils", skilsRouter);
router.use("/cdn", cdnRouter);
router.use("/user", userRouter);

export default router;