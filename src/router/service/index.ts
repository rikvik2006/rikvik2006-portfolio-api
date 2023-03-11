import { NextFunction, Request, Response, Router } from "express";
import Products from "../../database/schemas/Products";
import { Product } from "../../database/schemas/Products";
import { User } from "../../database/schemas/Users";
import { isAuthenticated } from "../../helpers/middlewares";
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


router.use(isAuthenticated);


router.post("/create", async (req: Request, res: Response) => {

    const data: Product = req.body

    const createProduct = await Products.create(data)
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(400).send({
                msg: "The the entered parameters don't statisfy the required types"
            })
        })
})

router.delete("/create/:id",async (req: Request, res: Response) => {
    const id: String = req.params.id

    try {
        const deletedProductes = await Products.findOneAndDelete({ id })
        deletedProductes?.save();
        return res.status(200).send({ msg: "Products has been deleted " })
    } catch (err) {
        return res.status(400).send({
            msg: "The ID you enterend doesn't exist",
        })
    }
})

export default router;