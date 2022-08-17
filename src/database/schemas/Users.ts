import mongoose from "mongoose";

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}

const User = new mongoose.Schema<User>({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
})

export default mongoose.model("users", User);