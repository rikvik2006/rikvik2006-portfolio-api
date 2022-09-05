import { NextFunction, Request, Response, Router } from "express";
import { generateUsername } from "unique-username-generator";
import Users from "../../database/schemas/Users";
import { User } from "../../database/schemas/Users";
import { hashPassword } from "../../helpers/dataHashing";
import passport from "passport";
import { isSuperUser } from "../../helpers/middlewares";

const router = Router();

router.post("/login", passport.authenticate('local'), (req: Request, res: Response) => {
    console.log("Logged in");
    res.redirect("http://localhost:3000/", 200)
})

router.post("/continuelogin", async (req: Request, res: Response) => {
    const { name, surname, username }: { name: string, surname: string, username: string } = req.body;
    const userID = req.user?.id;


    if (!name || !surname || !username) return res.sendStatus(400);

    try {
        const userDB = await Users.findById(userID);

        if (!userDB) return res.status(403).send({ msg: "I cant retrive your userID, if you have a cookie blocker disable it!" })

        userDB!.name = name;
        userDB!.surname = surname;
        userDB!.username = username;

        await userDB?.save();
        res.status(200).send(userDB);
    } catch (err) {
        console.log(err);
        res.status(403).send({ msg: "An error occured, if you have a cookie bloocker disable it" })
    }
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

        const avatar = `https://avatars.dicebear.com/api/bottts/${username}.svg`

        const newUser = await Users.create({ email, username, password, avatar })
        res.status(201).send({ newUser })
    }
})


router.use(isSuperUser);

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

    //ciaod

    res.status(200).send(data);
})

export default router;