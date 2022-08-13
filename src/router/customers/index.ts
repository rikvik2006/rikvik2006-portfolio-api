import { Request, Response, Router } from "express";
import UsersSchema from "../../database/schemas/Users";

const router = Router()


router.get("", async (req: Request, res: Response) => {
    req.session.visited = true;

    let data

    try {
        data = await UsersSchema.find()
    } catch (err) {
        console.log(err);
    }

    res.status(200).send({
        data
    })
})

router.post("/create", async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    let userDB = await UsersSchema.findOne({ $or: [{ email: email }, { userName: username }] })
    if (userDB) {
        res.status(400).send({
            msg: "User arledy exist",
        })
    } else {
        userDB = await UsersSchema.create({ email: email, userName: username, password: password })

        res.status(201).send({
            userDB,
        })
    }

})

export default router;