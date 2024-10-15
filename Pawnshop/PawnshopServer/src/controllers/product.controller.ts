import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import Customer from "../models/customer.model";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const addProduct = [
  upload.array("productImages"),
  async (req: Request, res: Response): Promise<void> => {
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
        additionalNotes,
        transactionType,
        dateOfReceipt,
        redemptionDeadline,
        loanValue,
        interestRate,
        clientId,
      } = req.body;

      const customer = await Customer.findById(clientId);
      if (!customer) {
        res
          .status(404)
          .json({ message: `Customer with ID ${clientId} not found.` });
        return;
      }

      const productImages = req.files
        ? (req.files as Express.Multer.File[]).map((file) =>
            file.buffer.toString("base64")
          )
        : [];

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
        clientId,
      });

      const savedProduct = await newProduct.save();

      customer.items.push(savedProduct._id as mongoose.Types.ObjectId);
      await customer.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error while adding product:", error);
      res
        .status(500)
        .json({
          message: "An error occurred while adding the product.",
          error,
        });
    }
  },
];

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product ID format." });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the product.",
      error,
    });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching all products.",
      error,
    });
  }
};

export const updateProduct = [
  upload.array("productImages"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid product ID format." });
        return;
      }

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
        additionalNotes,
        transactionType,
        dateOfReceipt,
        redemptionDeadline,
        loanValue,
        interestRate,
        clientId,
      } = req.body;

      const productImages = req.files
        ? (req.files as Express.Multer.File[]).map((file) =>
            file.buffer.toString("base64")
          )
        : [];

      const updatedData = {
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
        productImages: productImages.length ? productImages : undefined,
        additionalNotes,
        transactionType,
        dateOfReceipt,
        redemptionDeadline,
        loanValue,
        interestRate,
        clientId,
      };

      Object.keys(updatedData).forEach(
        (key) =>
          updatedData[key as keyof typeof updatedData] === undefined &&
          delete updatedData[key as keyof typeof updatedData]
      );

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedProduct) {
        res.status(404).json({ message: `Product with ID ${id} not found.` });
        return;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error while updating product:", error);
      res.status(500).json({
        message: "An error occurred while updating the product.",
        error,
      });
    }
  },
];

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product ID format." });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    await Product.findByIdAndDelete(id);

    await Customer.findByIdAndUpdate(product.clientId, {
      $pull: { items: id },
    });

    res
      .status(200)
      .json({ message: `Product with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the product.",
      error,
    });
  }
};
