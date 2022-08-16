import mongoose from "mongoose";

export type Product = {
    id: string;
    name: string;
    icon: string;
    description: string;
    tags: string[];
    price: number;
    remaning: number;
}

const ReqSting = {
    type: mongoose.SchemaTypes.String,
    required: true,
}
const ReqNum = {
    type: mongoose.SchemaTypes.Number,
    required: true,
}

const ProductsSchema = new mongoose.Schema<Product>({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    name: ReqSting,
    icon: ReqSting,
    description: ReqSting,
    tags: {
        type: [mongoose.SchemaTypes.String],
        required: true,
    },
    price: ReqNum,
    remaning: ReqNum,
})

export default mongoose.model("products", ProductsSchema);

