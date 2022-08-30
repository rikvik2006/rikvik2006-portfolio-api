import { Request, Response, Router } from "express";
import { isAuthenticated } from "../../helpers/middlewares";
const router = Router();

router.use(isAuthenticated)

router.get("/", (req: Request, res: Response) => {
    const responseBody = {
        image: "https://imgur.com/dS5gThg.png"
    }

    res.status(200).send(responseBody);
})

export default router;