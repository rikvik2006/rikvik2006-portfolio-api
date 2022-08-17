import { Router } from "express";
const router = Router();

// import customersRouter from "./customers";
import serviceRouter from "./service";
import authRouter from "./auth";

// router.use("/customers", customersRouter);
router.use("/services", serviceRouter);
router.use("/auth", authRouter);

export default router;