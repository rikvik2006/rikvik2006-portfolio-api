import { Router } from "express";

const router = Router()

router.get("", (req, res) => {
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
    res.status(201).send({
        msg: "POST: Created"
    });
})

export default router;