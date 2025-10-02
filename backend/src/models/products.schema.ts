// src/models/Product.ts
import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  farmer: Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  category: string;
  available: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { 
    timestamps: true,
    versionKey: false
   }
);

export default model<IProduct>("Product", productSchema);
