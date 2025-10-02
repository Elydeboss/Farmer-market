import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db";
import morgan from "morgan";
import userRoutes from "./routes/user.routes"
import adminRoutes from "./routes/admin.route";

const app = express();

connectDB();

const PORT = process.env.PORT || 3500;



app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript backend!");
});

app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
