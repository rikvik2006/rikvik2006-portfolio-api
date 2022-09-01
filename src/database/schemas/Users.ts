import mongoose from "mongoose";

export interface User {
    id: string
    email: string;
    username: string;
    password: string;
    name: string;
    surename: string;
    avatar: string;
    createdAt: Date;
}

const User = new mongoose.Schema<User>({

    //Required

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

    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "Jhon"
    },
    surename: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "Doe",
    },
    avatar: {
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