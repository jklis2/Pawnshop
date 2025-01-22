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

    const product = await productRepository.findOne({ 
      where: { id },
      relations: ['client']
    });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    // Przekształć dane produktu do formatu oczekiwanego przez frontend
    const formattedProduct = {
      id: product.id,
      productName: product.productName,
      productDescription: product.productDescription,
      category: product.category,
      brand: product.brand,
      productModel: product.productModel,
      serialNumber: product.serialNumber,
      yearOfProduction: product.yearOfProduction,
      technicalCondition: product.technicalCondition,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      productImages: product.productImages,
      additionalNotes: product.additionalNotes,
      transactionType: product.transactionType,
      dateOfReceipt: product.dateOfReceipt,
      redemptionDeadline: product.redemptionDeadline,
      loanValue: product.loanValue,
      interestRate: product.interestRate,
      clientId: product.client.id,
      client: product.client
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ message: 'An error occurred while fetching the product.', error });
  }
};

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepository.find({
      relations: {
        client: true
      }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching all products.', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
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
      clientId
    } = req.body;

    console.log('Updating product with ID:', id);
    console.log('Received data:', req.body);

    let product = await productRepository.findOne({ 
      where: { id },
      relations: ['client']
    });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    console.log('Found existing product:', product);

    // Znajdź klienta jeśli został zmieniony
    if (clientId && clientId !== product.client.id) {
      console.log('Client ID changed from', product.client.id, 'to', clientId);
      const customer = await customerRepository.findOne({ where: { id: clientId } });
      if (!customer) {
        res.status(404).json({ message: `Customer with ID ${clientId} not found.` });
        return;
      }
      product.client = customer;
    }

    // Przygotuj obiekt z aktualizacjami
    const updates = {
      productName,
      productDescription,
      category,
      brand,
      productModel,
      serialNumber,
      yearOfProduction: yearOfProduction ? Number(yearOfProduction) : null,
      technicalCondition,
      purchasePrice: Number(purchasePrice),
      salePrice: salePrice ? Number(salePrice) : null,
      additionalNotes,
      transactionType,
      dateOfReceipt: dateOfReceipt ? new Date(dateOfReceipt) : product.dateOfReceipt,
      redemptionDeadline: redemptionDeadline ? new Date(redemptionDeadline) : null,
      loanValue: loanValue ? Number(loanValue) : null,
      interestRate: interestRate ? Number(interestRate) : null
    };

    console.log('Applying updates:', updates);

    // Aktualizuj pola produktu
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        (product as any)[key] = value;
      }
    }

    console.log('Product after updates:', product);

    // Zapisz zmiany
    product = await productRepository.save(product);
    
    console.log('Product saved successfully:', product);

    // Pobierz świeżo zaktualizowany produkt z relacjami
    const updatedProduct = await productRepository.findOne({
      where: { id },
      relations: ['client']
    });

    console.log('Fresh product data:', updatedProduct);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ 
      message: 'An error occurred while updating the product.',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete product with ID:', id);

    // Najpierw sprawdźmy wszystkie produkty
    const allProducts = await productRepository.find();
    console.log('All product IDs in database:', allProducts.map(p => p.id));

    // Szukamy produktu
    const product = await productRepository.findOne({ 
      where: { id },
      relations: ['client'] 
    });

    console.log('Found product:', product);

    if (!product) {
      console.log('Product not found. Available products:', 
        allProducts.map(p => ({
          id: p.id,
          name: p.productName
        }))
      );
      res.status(404).json({ 
        message: `Product with ID ${id} not found.`,
        availableIds: allProducts.map(p => p.id)
      });
      return;
    }

    console.log('Removing product:', {
      id: product.id,
      name: product.productName,
      client: product.client?.id
    });

    await productRepository.remove(product);
    console.log('Product removed successfully');

    res.status(200).json({ 
      message: `Product with ID ${id} has been deleted.`,
      deletedProduct: {
        id: product.id,
        name: product.productName
      }
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ 
      message: 'An error occurred while deleting the product.',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};