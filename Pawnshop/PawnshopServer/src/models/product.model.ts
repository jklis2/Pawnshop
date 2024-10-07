import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  productModel: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  productImages?: string[];
  additionalNotes?: string;
  transactionType: "pawn" | "sale";
  dateOfReceipt: Date;
  redemptionDeadline?: Date;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  productModel: { type: String, required: true },
  serialNumber: { type: String },
  yearOfProduction: { type: Number },
  technicalCondition: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  salePrice: { type: Number },
  productImages: { type: [String] },
  additionalNotes: { type: String },
  transactionType: { type: String, enum: ["pawn", "sale"], required: true },
  dateOfReceipt: { type: Date, required: true },
  redemptionDeadline: { type: Date },
  loanValue: { type: Number },
  interestRate: { type: Number },
  notes: { type: String },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
