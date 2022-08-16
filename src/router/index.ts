import { Router } from "express";
const router = Router();

import customersRouter from "./customers";
import serviceRouter from "./service";

router.use("/customers", customersRouter);
router.use("/services", serviceRouter);

export default router;