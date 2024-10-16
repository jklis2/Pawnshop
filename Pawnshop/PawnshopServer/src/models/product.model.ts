import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  category: string;
  brand?: string;
  productModel?: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  productImages?: string[];
  additionalNotes?: string;
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
  dateOfReceipt: Date;
  redemptionDeadline?: Date;
  loanValue?: number;
  interestRate?: number;
  clientId: mongoose.Types.ObjectId;
  updateStatusAfterDeadline: () => void;
}

const ProductSchema: Schema<IProduct> = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  productModel: { type: String },
  serialNumber: { type: String },
  yearOfProduction: { type: Number },
  technicalCondition: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  salePrice: { type: Number },
  productImages: { type: [String] },
  additionalNotes: { type: String },
  transactionType: {
    type: String,
    enum: ["pawn", "sale", "redeemed", "sold"],
    required: true,
  },
  dateOfReceipt: { type: Date, required: true },
  redemptionDeadline: { type: Date },
  loanValue: { type: Number },
  interestRate: { type: Number },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

ProductSchema.methods.updateStatusAfterDeadline = function () {
  const now = new Date();
  if (this.transactionType === "pawn" && this.redemptionDeadline && this.redemptionDeadline < now) {
    this.transactionType = "sale";
  }
};

export default mongoose.model<IProduct>("Product", ProductSchema);
