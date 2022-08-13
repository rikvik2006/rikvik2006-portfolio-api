import { Request, Response, Router } from "express";

const router = Router()

router.get("", (req: Request, res: Response) => {
    res.status(200).send({
        customers: [
            {
                name: "rikvik2006",
                age: 15,
            },
            {
                name: "GIMMI42PIASTRATO",
                age: 15,
            },
        ]
    })
})

router.post("/create", (req, res) => {

})

export default router;