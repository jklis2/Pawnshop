import { Request, Response } from 'express';
import Customer from '../models/customer.model';

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, pesel, dateOfBirth, street, houseNumber, postalCode, city, idSeries, idNumber, phoneNumber, email, notes } = req.body;

    if (!firstName || !lastName || !pesel || !dateOfBirth || !street || !houseNumber || !postalCode || !city || !idSeries || !idNumber) {
      res.status(400).json({ message: 'Please fill in all required fields.' });
      return;
    }

    const newCustomer = new Customer({
      firstName,
      lastName,
      pesel,
      dateOfBirth,
      street,
      houseNumber,
      postalCode,
      city,
      idSeries,
      idNumber,
      phoneNumber,
      email,
      notes,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the customer.', error });
  }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the customer.', error });
  }
};

export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the customers.', error });
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCustomer) {
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the customer.', error });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    res.status(200).json({ message: `Customer with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the customer.', error });
  }
};