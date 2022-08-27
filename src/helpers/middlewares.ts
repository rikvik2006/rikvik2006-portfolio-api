import { NextFunction, Request, Response } from "express";
import { User } from "../database/schemas/Users";


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send({ msg: "Unathorized" })

export const isSuperUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.email === "riccardo.bussano@gmail.com") next()
    else res.status(403).send({ msg: "Unathorized" })
}