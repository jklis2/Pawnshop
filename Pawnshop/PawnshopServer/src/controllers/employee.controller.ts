import { Request, Response } from "express";
import mongoose from "mongoose";
import Employee from "../models/employee.model";

export const addEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
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
      login,
      password,
      role,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !pesel ||
      !dateOfBirth ||
      !street ||
      !houseNumber ||
      !postalCode ||
      !city ||
      !idSeries ||
      !idNumber ||
      !phoneNumber ||
      !email ||
      !login ||
      !password ||
      !role
    ) {
      res.status(400).json({ message: "Please fill in all required fields." });
      return;
    }

    if (!["admin", "employee"].includes(role)) {
      res
        .status(400)
        .json({ message: 'Invalid role. Use either "admin" or "employee".' });
      return;
    }

    const newEmployee = new Employee({
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
      login,
      password,
      role,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the employee.", error });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid employee ID format." });
      return;
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the employee.",
        error,
      });
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching all employees.",
        error,
      });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid employee ID format." });
      return;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while updating the employee.",
        error,
      });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid employee ID format." });
      return;
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    res
      .status(200)
      .json({ message: `Employee with ID ${id} has been deleted.` });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the employee.",
        error,
      });
  }
};

export const loginEmployee = async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body;

  try {
    const employee = await Employee.findOne({ login });
    if (!employee) {
      res.status(401).json({ message: "Invalid login or password" });
      return;
    }

    if (employee.password !== password) {
      res.status(401).json({ message: "Invalid login or password" });
      return;
    }

    res.json({
      firstName: employee.firstName,
      lastName: employee.lastName,
      login: employee.login,
      role: employee.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};