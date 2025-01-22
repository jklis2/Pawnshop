import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../models/product.model';
import { Customer } from '../models/customer.model';
import multer from 'multer';

const productRepository = AppDataSource.getRepository(Product);
const customerRepository = AppDataSource.getRepository(Customer);

const upload = multer({ dest: 'uploads/' });

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received request body:', req.body);
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

    const productImages = req.files ? (req.files as Express.Multer.File[]).map(file => file.filename) : [];

    // Logowanie danych wejściowych
    console.log('Received data:', {
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

    if (!clientId) {
      res.status(400).json({ message: 'Client ID is required' });
      return;
    }

    console.log('Looking for customer with ID:', clientId);
    const customer = await customerRepository.findOne({ 
      where: { id: clientId }
    });

    if (!customer) {
      console.log('Customer not found:', clientId);
      res.status(404).json({ message: `Customer with ID ${clientId} not found.` });
      return;
    }

    console.log('Found customer:', customer);

    // Create a new product with the exact property names from the model
    const newProduct = new Product();
    
    // Required fields
    if (!productName || !productDescription || !category || !technicalCondition || !purchasePrice || !transactionType) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    newProduct.productName = productName;
    newProduct.productDescription = productDescription;
    newProduct.category = category;
    newProduct.technicalCondition = technicalCondition;
    newProduct.purchasePrice = Number(purchasePrice);
    newProduct.transactionType = transactionType;
    newProduct.dateOfReceipt = dateOfReceipt ? new Date(dateOfReceipt) : new Date();
    newProduct.client = customer;

    // Optional fields
    if (brand) newProduct.brand = brand;
    if (productModel) newProduct.productModel = productModel;
    if (serialNumber) newProduct.serialNumber = serialNumber;
    if (yearOfProduction) newProduct.yearOfProduction = Number(yearOfProduction);
    if (salePrice) newProduct.salePrice = Number(salePrice);
    if (productImages.length > 0) newProduct.productImages = productImages;
    if (additionalNotes) newProduct.additionalNotes = additionalNotes;
    if (redemptionDeadline) newProduct.redemptionDeadline = new Date(redemptionDeadline);
    if (loanValue) newProduct.loanValue = Number(loanValue);
    if (interestRate) newProduct.interestRate = Number(interestRate);

    console.log('Created product:', newProduct);

    console.log('Saving product:', newProduct);
    const savedProduct = await productRepository.save(newProduct);
    console.log('Saved product:', savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ message: 'An error occurred while adding the product.', error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await productRepository.findOne({ where: { id }, relations: ['client'] });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the product.', error });
  }
};

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepository.find({ relations: ['client'] });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching all products.', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await productRepository.findOne({ where: { id }, relations: ['client'] });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    Object.assign(product, updates);

    const updatedProduct = await productRepository.save(product);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the product.', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await productRepository.findOne({ where: { id }, relations: ['client'] });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    await productRepository.remove(product);

    res.status(200).json({ message: `Product with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the product.', error });
  }
};