import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import employeeRoutes from './routes/employee.routes';
import Product from './models/product.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MongoDB connection string is missing in .env file!");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running and connected to MongoDB!");
});

app.use("/api", customerRoutes);
app.use("/api", productRoutes);
app.use('/api', employeeRoutes);

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Starting automatic item status update...");

    const products = await Product.find({ transactionType: "pawn" });

    products.forEach(async (product) => {
      product.updateStatusAfterDeadline(); 
      await product.save();
    });

    console.log("Automatic item status update completed.");
  } catch (error) {
    console.error("Error during automatic item status update:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
