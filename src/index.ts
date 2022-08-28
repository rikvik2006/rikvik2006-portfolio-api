import express from "express";
import cors from "cors";
const app = express();
import router from "./router";
import { config } from "dotenv";
import "./database";
import session from "express-session";
import mongodbStore from "connect-mongo";
import passport from "passport";
import "./stategies/local";

config();

const PORT = 3001

app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7 * 6
        },
        store: mongodbStore.create({
            mongoUrl: process.env.MONGO_URI,
        })

    })
)

app.use(passport.initialize());
app.use(passport.session());

// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata

declare module 'express-session' {
    export interface SessionData {
        visited: boolean; //[key: string]: any
    }
}

declare global {
    namespace Express {
        interface User {
            email: string;
        }
    }
}

app.listen(PORT, () => console.log(`Express application run on http://localhost:${PORT}`))

app.use("/api", router);
