import { NextFunction, Request, Response, Router } from "express";
import Skils from "../../database/schemas/Skils";
import { Skil } from "../../database/schemas/Skils";
const router = Router();


router.get("/", async (req: Request, res: Response) => {
    let data

    try {
        data = await Skils.find();

        if (data.length === 0) {
            return res.sendStatus(204)
        }
    } catch (err) {
        console.log(err);
    }

    res.status(200).send(data);
})

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.user) next()
    else res.sendStatus(401);
})

router.post("/add", async (req: Request, res: Response) => {

    const data: Skil = req.body;

    const newSkil = await Skils.create(data)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(400).send({
                msg: "The entered parameters don't statisfy the required types"
            })
        })
})

export default router;