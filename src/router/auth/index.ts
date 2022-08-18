import { NextFunction, Request, Response, Router } from "express";
import { generateUsername } from "unique-username-generator";
import Users from "../../database/schemas/Users";
import { hashPassword } from "../../helpers/dataHashing";

import passport from "passport";

const router = Router();

type User = {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}

router.post("/login", passport.authenticate('local'), (req: Request, res: Response) => {
    console.log("Logged in");
    res.sendStatus(200)
})

router.post("/register", async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    if (!email || !req.body.password) return res.status(400).send({
        msg: "Missing arguments"
    })

    const userDB = await Users.findOne({ email });
    if (userDB) {
        res.status(400).send({
            msg: "Users arledy exist"
        })
    } else {
        const password = hashPassword(req.body.password)
        console.log(password)

        const username = await generateUsername("", 4, 20);

        const newUser = await Users.create({ email, username, password })
        res.status(201).send({ newUser })
    }
})


router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.user) next()
    else res.sendStatus(401);
})

router.get("/", async (req: Request, res: Response) => {
    let data

    try {
        data = await Users.find()

        if (data.length === 0) {
            return res.sendStatus(204);
        }
    } catch (err) {
        console.log(err);
    }

    res.status(200).send(data);
})

export default router;