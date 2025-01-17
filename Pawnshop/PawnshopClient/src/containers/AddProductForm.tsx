import { useState } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function AddProductForm() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [productModel, setProductModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [yearOfProduction, setYearOfProduction] = useState<number | undefined>();
  const [technicalCondition, setTechnicalCondition] = useState('');
  const [purchasePrice, setPurchasePrice] = useState<number | undefined>();
  const [salePrice, setSalePrice] = useState<number | undefined>();
  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [transactionType, setTransactionType] = useState<'pawn' | 'sale' | ''>('');
  
  const [dateOfReceipt, setDateOfReceipt] = useState(getCurrentDate());
  const [redemptionDeadline, setRedemptionDeadline] = useState('');
  const [loanValue, setLoanValue] = useState<number | undefined>();
  const [interestRate, setInterestRate] = useState<number | undefined>();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !selectedCustomerId ||
      !productName ||
      !productDescription ||
      !category ||
      !technicalCondition ||
      !purchasePrice ||
      !transactionType ||
      !dateOfReceipt
    ) {
      showAlert('Please fill in all required fields.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

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

      await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showAlert('Product successfully added!', 'success');
      navigate('/dashboard/products');
    } catch {
      showAlert('Failed to add product. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <CustomerSelect 
        selectedCustomerId={selectedCustomerId} 
        onCustomerSelect={setSelectedCustomerId} 
      />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div className="space-y-6">
            <CreateForm 
              label="Product Name" 
              placeholder="Enter product name" 
              type="text" 
              value={productName} 
              required={true} 
              onChange={(e) => setProductName(e.target.value)} 
            />
            <CreateForm 
              label="Product Description" 
              placeholder="Enter product description" 
              type="text" 
              value={productDescription} 
              required={true} 
              onChange={(e) => setProductDescription(e.target.value)} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label="Category" 
                placeholder="Enter category" 
                type="text" 
                value={category} 
                required={true} 
                onChange={(e) => setCategory(e.target.value)} 
              />
              <CreateForm 
                label="Brand" 
                placeholder="Enter brand" 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
              />
              <CreateForm 
                label="Model" 
                placeholder="Enter model" 
                type="text" 
                value={productModel} 
                onChange={(e) => setProductModel(e.target.value)} 
              />
              <CreateForm 
                label="Serial Number" 
                placeholder="Enter serial number (if applicable)" 
                type="text" 
                value={serialNumber} 
                onChange={(e) => setSerialNumber(e.target.value)} 
              />
              <CreateForm 
                label="Year of Production" 
                placeholder="Enter year of production (if applicable)" 
                type="number" 
                value={yearOfProduction?.toString()} 
                onChange={(e) => setYearOfProduction(Number(e.target.value))} 
              />
              <CreateForm 
                label="Technical Condition" 
                placeholder="Enter technical condition" 
                type="text" 
                value={technicalCondition} 
                required={true} 
                onChange={(e) => setTechnicalCondition(e.target.value)} 
              />
              <CreateForm 
                label="Purchase Price" 
                placeholder="Enter purchase price" 
                type="number" 
                value={purchasePrice?.toString()} 
                required={true} 
                onChange={(e) => setPurchasePrice(Number(e.target.value))} 
              />
              <CreateForm 
                label="Sale Price" 
                placeholder="Enter sale price (if for sale)" 
                type="number" 
                value={salePrice?.toString()} 
                onChange={(e) => setSalePrice(Number(e.target.value))} 
              />
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  onChange={(e) => setProductImages(e.target.files)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100
                    transition-colors duration-200"
                  multiple
                />
              </div>
              <CreateForm 
                label="Additional Notes" 
                placeholder="Enter additional notes (if applicable)" 
                type="text" 
                value={additionalNotes} 
                onChange={(e) => setAdditionalNotes(e.target.value)} 
              />
            </div>
          </div>

          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CreateForm 
                  label="Transaction Type" 
                  placeholder="Enter transaction type (pawn / sale)" 
                  type="text" 
                  value={transactionType} 
                  required={true} 
                  onChange={(e) => setTransactionType(e.target.value as 'pawn' | 'sale')} 
                />
                <CreateForm 
                  label="Date of Receipt" 
                  placeholder="Enter date of receipt" 
                  type="date" 
                  value={dateOfReceipt} 
                  required={true} 
                  onChange={(e) => setDateOfReceipt(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CreateForm 
                  label="Redemption Deadline" 
                  placeholder="Enter redemption deadline (if pawned)" 
                  type="date" 
                  value={redemptionDeadline} 
                  onChange={(e) => setRedemptionDeadline(e.target.value)} 
                />
                <CreateForm 
                  label="Loan Value" 
                  placeholder="Enter loan value (if pawned)" 
                  type="number" 
                  value={loanValue?.toString()} 
                  onChange={(e) => setLoanValue(Number(e.target.value))} 
                />
                <CreateForm 
                  label="Interest Rate" 
                  placeholder="Enter interest rate (if pawned)" 
                  type="number" 
                  value={interestRate?.toString()} 
                  onChange={(e) => setInterestRate(Number(e.target.value))} 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button 
              type="submit" 
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
