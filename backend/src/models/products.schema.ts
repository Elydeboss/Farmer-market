// src/models/products.schema.ts
import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  farmer: Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  category: string;
  location: string;
  available: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true }, // new
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// helpful indexes for search and performance
productSchema.index({ name: "text" });
productSchema.index({ category: 1, location: 1, price: 1, available: 1, createdAt: -1 });

export default model<IProduct>("Product", productSchema);
