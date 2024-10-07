import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
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
  phoneNumber?: string;
  email?: string;
  notes?: string;
}

const CustomerSchema: Schema = new Schema({
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
  phoneNumber: { type: String },
  email: { type: String },
  notes: { type: String },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
