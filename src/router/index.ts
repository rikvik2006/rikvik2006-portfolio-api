import { Router } from "express";
const router = Router();

import customersRouter from "./customers";

router.use("/customers", customersRouter);


export default router;