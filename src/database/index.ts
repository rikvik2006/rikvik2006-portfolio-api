import mongoose from "mongoose";
import { config } from "dotenv";

config();

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log(`Connected to database`))
    .catch((err) => console.log(err));