import { Request, Response } from "express";
import { User } from "../../database/schemas/Users"
import { getUserInformationService } from "../../service/user";

export const getUserController = async (req: Request, res: Response) => {
    const user = req.user as User;

    try {
        const userInf = await getUserInformationService(user.id);
        res.send(userInf);
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: "Error" })
    }
}