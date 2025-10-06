import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.schema";
import Product from "../models/products.schema";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";
if (!MONGO_URL) {
  console.error("MONGO_URL missing in .env");
  process.exit(1);
}

// you can change these if you like
const FARMER_EMAIL = "seedfarmer@example.com";
const FARMER_PASSWORD = "Passw0rd!";

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("db connected");

    // 1) ensure a verified farmer exists
    let farmer = await User.findOne({ email: FARMER_EMAIL });
    if (!farmer) {
      const hashed = await bcrypt.hash(FARMER_PASSWORD, 10);
      farmer = await User.create({
        name: "Seed Farmer",
        email: FARMER_EMAIL,
        password: hashed,
        role: "farmer",
        isVerified: true,
      });
      console.log("created farmer:", FARMER_EMAIL);
    } else {
      if (farmer.role !== "farmer") {
        farmer.role = "farmer";
      }
      if (!farmer.isVerified) {
        farmer.isVerified = true;
      }
      await farmer.save();
      console.log("farmer ready:", FARMER_EMAIL);
    }

    // 2) sample products for this farmer
    const samples = [
    { name: "Organic Tomatoes", price: 1200, quantity: 50, category: "vegetable", location: "Calabar", available: true },
    { name: "Fresh Cucumbers", price: 800, quantity: 40, category: "vegetable", location: "Uyo", available: true },
    { name: "Free-range Eggs (crate)", price: 3500, quantity: 15, category: "protein", location: "Abeokuta", available: true },
    { name: "Yellow Garri 5kg", price: 4200, quantity: 20, category: "grain", location: "Sapele", available: true },
    { name: "Ofada Rice 10kg", price: 12500, quantity: 10, category: "grain", location: "Ibadan", available: true },
    ];

    // 3) remove old samples by this farmer to avoid duplicates
    await Product.deleteMany({ farmer: farmer._id });
    console.log("cleared old products for farmer");

    // 4) insert fresh samples
    const docs = await Product.insertMany(
      samples.map((p) => ({ ...p, farmer: farmer!._id }))
    );
    console.log(`inserted ${docs.length} products`);

    console.log("done seeding products.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();

