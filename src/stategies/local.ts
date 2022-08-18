import passport from "passport";
import { Strategy } from "passport-local";
import Users from "../database/schemas/Users";
import { comparePassword } from "../helpers/dataHashing";

passport.serializeUser((user: any, done) => {
    console.log("Serializing user...")
    console.log(user);
    done(null, user.id) // req.sessions.passport.user = { id: user.id }
})

passport.deserializeUser(async (id: string, done) => {
    console.log("Deserilizing user...")
    console.log(id);

    try {
        const user = await Users.findById(id);
        if (!user) throw new Error("User not found");
        console.log(user);
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
})

passport.use(
    new Strategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            console.log(email);
            console.log(password);

            try {
                if (!email || !password) throw Error("Missing credentials");

                const userDB = await Users.findOne({ email });

                if (!userDB) throw Error("User not found");

                const isValid = comparePassword(password, userDB.password);

                if (isValid) {
                    console.log("Auth succesfull");
                    done(null, userDB);
                } else {
                    console.log("Invalid auth");
                    done(null, null);
                }
            } catch (err) {
                done(err, null);
            }
        }
    ),
)