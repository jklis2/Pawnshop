import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  productModel: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  additionalNotes?: string;
  transactionType: 'pawn' | 'sale';
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: string;
}

interface EditProductFormProps {
  initialData: Product;
}

export default function EditProductForm({ initialData }: EditProductFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(initialData.clientId);

  const [productName, setProductName] = useState(initialData.productName);
  const [productDescription, setProductDescription] = useState(initialData.productDescription);
  const [category, setCategory] = useState(initialData.category);
  const [brand, setBrand] = useState(initialData.brand);
  const [productModel, setProductModel] = useState(initialData.productModel);
  const [serialNumber, setSerialNumber] = useState(initialData.serialNumber || '');
  const [yearOfProduction, setYearOfProduction] = useState(initialData.yearOfProduction || undefined);
  const [technicalCondition, setTechnicalCondition] = useState(initialData.technicalCondition);
  const [purchasePrice, setPurchasePrice] = useState(initialData.purchasePrice);
  const [salePrice, setSalePrice] = useState(initialData.salePrice || undefined);
  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState(initialData.additionalNotes || '');
  const [transactionType, setTransactionType] = useState(initialData.transactionType);
  const [dateOfReceipt, setDateOfReceipt] = useState(initialData.dateOfReceipt);
  const [redemptionDeadline, setRedemptionDeadline] = useState(initialData.redemptionDeadline || '');
  const [loanValue, setLoanValue] = useState(initialData.loanValue || undefined);
  const [interestRate, setInterestRate] = useState(initialData.interestRate || undefined);
  const [notes, setNotes] = useState(initialData.notes || '');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch(() => {
        setError('Failed to load customers.');
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('category', category);
      formData.append('brand', brand);
      formData.append('productModel', productModel);
      formData.append('serialNumber', serialNumber);
      if (yearOfProduction) formData.append('yearOfProduction', yearOfProduction.toString());
      formData.append('technicalCondition', technicalCondition);
      if (purchasePrice) formData.append('purchasePrice', purchasePrice.toString());
      if (salePrice) formData.append('salePrice', salePrice.toString());
      formData.append('additionalNotes', additionalNotes);
      formData.append('transactionType', transactionType);
      formData.append('dateOfReceipt', dateOfReceipt);
      formData.append('redemptionDeadline', redemptionDeadline);
      if (loanValue) formData.append('loanValue', loanValue.toString());
      if (interestRate) formData.append('interestRate', interestRate.toString());
      formData.append('notes', notes);
      formData.append('clientId', selectedCustomerId);

      if (productImages) {
        for (let i = 0; i < productImages.length; i++) {
          formData.append('productImages', productImages[i]);
        }
      }

      const response = await axios.put(`http://localhost:5000/api/products/${initialData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccessMessage('Product successfully updated!');
      } else {
        setError('Failed to update product. Please try again.');
      }
    } catch {
      setError('Failed to update product. Please try again.');
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CreateForm label="Product Name" placeholder="Enter product name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <CreateForm label="Product Description" placeholder="Enter product description" type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Category" placeholder="Enter category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          <CreateForm label="Brand" placeholder="Enter brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Model" placeholder="Enter model" type="text" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
          <CreateForm label="Serial Number (if applicable)" placeholder="Enter serial number" type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Year of Production (if applicable)" placeholder="Enter year of production" type="number" value={yearOfProduction?.toString()} onChange={(e) => setYearOfProduction(Number(e.target.value))} />
          <CreateForm label="Technical Condition" placeholder="Enter technical condition" type="text" value={technicalCondition} onChange={(e) => setTechnicalCondition(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Purchase Price" placeholder="Enter purchase price" type="number" value={purchasePrice.toString()} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
          <CreateForm label="Sale Price (if for sale)" placeholder="Enter sale price" type="number" value={salePrice?.toString()} onChange={(e) => setSalePrice(Number(e.target.value))} />
        </div>
        <CreateForm label="Product Images" placeholder="Upload product images" type="file" onChange={(e) => setProductImages(e.target.files)} className="block w-full" />
        <CreateForm label="Additional Notes (if applicable)" placeholder="Enter additional notes" type="text" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        <h2 className="text-2xl font-semibold mb-6 text-center">Transaction Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Transaction Type" placeholder="Enter transaction type (pawn / sale)" type="text" value={transactionType} onChange={(e) => setTransactionType(e.target.value as 'pawn' | 'sale')} />
          <CreateForm label="Date of Receipt" placeholder="Enter date of receipt" type="date" value={dateOfReceipt} onChange={(e) => setDateOfReceipt(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Redemption Deadline (if pawned)" placeholder="Enter redemption deadline" type="date" value={redemptionDeadline} onChange={(e) => setRedemptionDeadline(e.target.value)} />
          <CreateForm label="Loan Value (if pawned)" placeholder="Enter loan value" type="number" value={loanValue?.toString()} onChange={(e) => setLoanValue(Number(e.target.value))} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Interest Rate (if pawned)" placeholder="Enter interest rate" type="number" value={interestRate?.toString()} onChange={(e) => setInterestRate(Number(e.target.value))} />
          <CreateForm label="Notes" placeholder="Enter product notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
          <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Choose a customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save Changes
        </button>
      </form>
    </div>
  );
}
