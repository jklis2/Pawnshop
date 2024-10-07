import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  pesel: string;
  dateOfBirth: Date;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  login: string;
  password: string;
  role: "admin" | "employee";
}

const EmployeeSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  pesel: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  idSeries: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
