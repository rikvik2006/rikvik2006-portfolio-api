import { Request, Response, Router } from "express"
import { getUserController } from "../../controllers/user";
import { isAuthenticated } from "../../helpers/middlewares";
import Users, { User } from "../../database/schemas/Users";
const router = Router();

router.get("/", isAuthenticated, getUserController);

router.put("/", async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).send({ msg: "Unatorized: You need to login to use this endpoint" })
    }

    const { email, name, surname, username, password, avatar }: { email: string | undefined, name: string | undefined, surname: string | undefined, username: string | undefined, password: string | undefined, avatar: string | undefined } = req.body

    try {
        let userDB = await Users.findById(req.user.id);
        if (!userDB) return res.status(400).send({ msg: `${req.user.id} doen't exist` });

        userDB.email = email || req.user.email;
        userDB.name = name || req.user.name;
        userDB.surname = surname || req.user.surname;
        userDB.username = username || req.user.username;
        userDB.password = password || req.user.password;
        userDB.avatar = avatar || req.user.avatar;

        await userDB.save();
        res.status(200).send(userDB);
    } catch (err) {
        res.status(400).send(err);
    }

})

export default router;