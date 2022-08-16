import { Request, Response, Router } from "express";
import Products from "../../database/schemas/Products";
import { Product } from "../../database/schemas/Products";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    let data

    try {
        data = await Products.find()

        if (data.length == 0) {
            console.log("In if")
            return res.sendStatus(204)
        }
    } catch (err) {
        console.log(err);
    }

    console.log("Out try...catch")

    res.status(200).send(data)

})


router.post("/create", async (req: Request, res: Response) => {

    const data: Product = req.body

    const createProduct = await Products.create(data)
        .then((data) => {
            console.log(data);
            return res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).send({
                msg: "The the entered parameters don't statisfy the required types"
            })
        })
})


export default router;