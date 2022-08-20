import mongoose from "mongoose";

export interface Skil {
    name: string;
    icon: string;
}

const SkilsModel = new mongoose.Schema<Skil>({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    icon: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
})

export default mongoose.model("Skils", SkilsModel);