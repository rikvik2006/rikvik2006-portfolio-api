import mongoose from "mongoose";

export interface Skil {
    name: string;
    description: string;
}

const SkilsModel = new mongoose.Schema<Skil>({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
})

export default mongoose.model("Skils", SkilsModel);