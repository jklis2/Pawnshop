import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';
import { useAlert } from '../context/AlertContext';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  pesel: string;  
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
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
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

const formatDateToInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EditProductForm({ initialData }: EditProductFormProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(initialData.clientId);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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
  
  const [dateOfReceipt, setDateOfReceipt] = useState(formatDateToInput(initialData.dateOfReceipt));
  const [redemptionDeadline, setRedemptionDeadline] = useState(initialData.redemptionDeadline ? formatDateToInput(initialData.redemptionDeadline) : '');

  const [loanValue, setLoanValue] = useState(initialData.loanValue || undefined);
  const [interestRate, setInterestRate] = useState(initialData.interestRate || undefined);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${initialData.clientId}`)
      .then((response) => {
        setSelectedCustomer(response.data);
      })
      .catch(() => {
        showAlert('Failed to load customer data.', 'error');
      });
  }, [initialData.clientId, showAlert]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      formData.append('clientId', selectedCustomerId);

      if (productImages) {
        for (let i = 0; i < productImages.length; i++) {
          formData.append('productImages', productImages[i]);
        }
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${initialData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        showAlert('Product updated successfully!', 'success');
        navigate('/dashboard/products');
      } else {
        showAlert('Failed to update product. Please try again.', 'error'); 
      }
    } catch {
      showAlert('Failed to update product. Please try again.', 'error');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Edit Product</h1>
      <div className="p-4">
        <CustomerSelect 
          selectedCustomerId={selectedCustomerId} 
          onCustomerSelect={setSelectedCustomerId} 
          initialCustomer={selectedCustomer}
        />
        <h2 className="text-xl font-semibold mb-6 text-center">Product Details</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <CreateForm label="Product Name" placeholder="Enter product name" type="text" value={productName} required={true} onChange={(e) => setProductName(e.target.value)} />
          <CreateForm label="Product Description" placeholder="Enter product description" type="text" value={productDescription} required={true} onChange={(e) => setProductDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <CreateForm label="Category" placeholder="Enter category" type="text" value={category} required={true} onChange={(e) => setCategory(e.target.value)} />
            <CreateForm label="Brand" placeholder="Enter brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <CreateForm label="Model" placeholder="Enter model" type="text" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
            <CreateForm label="Serial Number (if applicable)" placeholder="Enter serial number" type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <CreateForm label="Year of Production (if applicable)" placeholder="Enter year of production" type="number" value={yearOfProduction?.toString()} onChange={(e) => setYearOfProduction(Number(e.target.value))} />
            <CreateForm label="Technical Condition" placeholder="Enter technical condition" type="text" value={technicalCondition} required={true} onChange={(e) => setTechnicalCondition(e.target.value)} />
            <CreateForm label="Purchase Price" placeholder="Enter purchase price" type="number" value={purchasePrice.toString()} required={true} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
            <CreateForm label="Sale Price (if for sale)" placeholder="Enter sale price" type="number" value={salePrice?.toString()} onChange={(e) => setSalePrice(Number(e.target.value))} />
          </div>
          <CreateForm label="Product Images" placeholder="Upload product images" type="file" onChange={(e) => setProductImages(e.target.files)} className="block w-full" />
          <CreateForm label="Additional Notes (if applicable)" placeholder="Enter additional notes" type="text" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
          <h2 className="text-xl font-semibold mb-6 text-center">Transaction Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <CreateForm label="Transaction Type" placeholder="Enter transaction type (pawn / sale)" type="text" value={transactionType} required={true} onChange={(e) => setTransactionType(e.target.value as 'pawn' | 'sale')} />
            <CreateForm label="Date of Receipt" placeholder="Enter date of receipt" type="date" value={dateOfReceipt} required={true} onChange={(e) => setDateOfReceipt(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-2 mt-2">
            <CreateForm label="Redemption Deadline (if pawned)" placeholder="Enter redemption deadline" type="date" value={redemptionDeadline} onChange={(e) => setRedemptionDeadline(e.target.value)} />
            <CreateForm label="Loan Value (if pawned)" placeholder="Enter loan value" type="number" value={loanValue?.toString()} onChange={(e) => setLoanValue(Number(e.target.value))} />
            <CreateForm label="Interest Rate (if pawned)" placeholder="Enter interest rate" type="number" value={interestRate?.toString()} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoBack}
              className="bg-red-500 text-white px-4 py-2 mb-4 mr-4 rounded hover:bg-red-700 transition duration-300 ease-in-out float-right"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-teal-600 text-white px-4 py-2 mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out float-right"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
