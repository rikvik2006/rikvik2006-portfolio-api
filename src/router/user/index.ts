import { Router } from "express"
import { getUserController } from "../../controllers/user";
import { isAuthenticated } from "../../helpers/middlewares";
const router = Router();

router.get("/", isAuthenticated, getUserController);


export default router;