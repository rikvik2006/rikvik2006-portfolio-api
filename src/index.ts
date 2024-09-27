import express from "express";
const app = express();
import router from "./router";
import { config } from "dotenv";
import "./database";
import session from "express-session";
import mongodbStore from "connect-mongo";
import passport from "passport";
import "./stategies/local";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APIBaseURL, ClientBaseURL } from "./constants";

config();

const PORT = 3001;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

console.log("🧨 ClientBaseURL", ClientBaseURL);

// app.use(
//     cors({
//         // origin: [ClientBaseURL ?? "http://localhost:3000"],
//         origin: ClientBaseURL,
//         credentials: true,
//     })
// );

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7 * 6,
            secure: "auto",
            domain: new URL(ClientBaseURL!).hostname,
        },
        store: mongodbStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
//

type id = {
    id: string;
};

declare module "express-session" {
    export interface SessionData {
        visited: boolean; //[key: string]: any
        user: id;
    }
}

declare global {
    namespace Express {
        interface User {
            email: string;
        }
    }
}

app.listen(PORT, () =>
    console.log(`Express application run on http://localhost:${PORT}`)
);

app.use("/api", router);
