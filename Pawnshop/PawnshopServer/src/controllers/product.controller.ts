import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import Customer from "../models/customer.model";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      productName,
      productDescription,
      category,
      brand,
      productModel,
      serialNumber,
      yearOfProduction,
      technicalCondition,
      purchasePrice,
      salePrice,
      productImages,
      additionalNotes,
      transactionType,
      dateOfReceipt,
      redemptionDeadline,
      loanValue,
      interestRate,
      notes,
      clientId,
    } = req.body;

    const customer = await Customer.findById(clientId);
    if (!customer) {
      res
        .status(404)
        .json({ message: `Customer with ID ${clientId} not found.` });
      return;
    }

    const newProduct = new Product({
      productName,
      productDescription,
      category,
      brand,
      productModel,
      serialNumber,
      yearOfProduction,
      technicalCondition,
      purchasePrice,
      salePrice,
      productImages,
      additionalNotes,
      transactionType,
      dateOfReceipt,
      redemptionDeadline,
      loanValue,
      interestRate,
      notes,
      clientId,
    });

    const savedProduct = await newProduct.save();

    customer.items.push(savedProduct._id as mongoose.Types.ObjectId);
    await customer.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the product.", error });
  }
};
