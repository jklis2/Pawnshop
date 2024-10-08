import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function AddProductForm() {
  const [customers, setCustomers] = useState<Customer[]>([]); 
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
    .get('http://localhost:5000/api/customers')
      .then((response) => {
        console.log('Response from server:', response.data); 
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          setError('Expected an array of customers, but received something else.');
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setError('Failed to load customers. Please try again later.');
      });
  }, []);
  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Details</h1>
      <div>
        <CreateForm label="Product Name" placeholder="Enter product name" type="text" />
        <CreateForm label="Product Description" placeholder="Enter product description" type="text" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Category" placeholder="Enter category" type="text" />
          <CreateForm label="Brand" placeholder="Enter brand" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Model" placeholder="Enter model" type="text" />
          <CreateForm label="Serial Number (if applicable)" placeholder="Enter serial number" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Year of Production (if applicable)" placeholder="Enter year of production" type="number" />
          <CreateForm label="Technical Condition" placeholder="Enter technical condition" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Purchase Price" placeholder="Enter purchase price" type="number" />
          <CreateForm label="Sale Price (if for sale)" placeholder="Enter sale price" type="number" />
        </div>
        <CreateForm label="Product Images" placeholder="Upload product images" type="file" />
        <CreateForm label="Additional Notes (if applicable)" placeholder="Enter additional notes" type="text" />
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Transaction Details</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Transaction Type" placeholder="Enter transaction type (pawn / sale)" type="text" />
          <CreateForm label="Date of Receipt" placeholder="Enter date of receipt" type="date" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Redemption Deadline (if pawned)" placeholder="Enter redemption deadline" type="date" />
          <CreateForm label="Loan Value (if pawned)" placeholder="Enter loan value" type="number" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Interest Rate (if pawned)" placeholder="Enter interest rate" type="number" />
          <CreateForm label="Notes" placeholder="Enter product notes" type="text" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Customer
          </label>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Choose a customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
