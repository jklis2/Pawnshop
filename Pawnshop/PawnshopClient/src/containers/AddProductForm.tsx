import { useState } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';

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
  const [dateOfReceipt, setDateOfReceipt] = useState('');
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

      await axios.post('http://localhost:5000/api/products', formData, {
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
    <div className="p-4">
      <CustomerSelect 
        selectedCustomerId={selectedCustomerId} 
        onCustomerSelect={setSelectedCustomerId} 
      />
      <h2 className="text-xl font-semibold mb-6 text-center">Product Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <CreateForm label="Product Name" placeholder="Enter product name" type="text" value={productName} required={true} onChange={(e) => setProductName(e.target.value)} />
          <CreateForm label="Product Description" placeholder="Enter product description" type="text" value={productDescription} required={true} onChange={(e) => setProductDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <CreateForm label="Category" placeholder="Enter category" type="text" value={category} required={true} onChange={(e) => setCategory(e.target.value)} />
            <CreateForm label="Brand" placeholder="Enter brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <CreateForm label="Model" placeholder="Enter model" type="text" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
            <CreateForm label="Serial Number (if applicable)" placeholder="Enter serial number" type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <CreateForm label="Year of Production (if applicable)" placeholder="Enter year of production" type="number" value={yearOfProduction?.toString()} onChange={(e) => setYearOfProduction(Number(e.target.value))} />
            <CreateForm label="Technical Condition" placeholder="Enter technical condition" type="text" value={technicalCondition} required={true} onChange={(e) => setTechnicalCondition(e.target.value)} />
            <CreateForm label="Purchase Price" placeholder="Enter purchase price" type="number" value={purchasePrice?.toString()} required={true} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
            <CreateForm label="Sale Price (if for sale)" placeholder="Enter sale price" type="number" value={salePrice?.toString()} onChange={(e) => setSalePrice(Number(e.target.value))} />
          </div>
          <CreateForm label="Product Images" placeholder="Upload product images" type="file" onChange={(e) => setProductImages(e.target.files)} className="block w-full" />
          <CreateForm label="Additional Notes (if applicable)" placeholder="Enter additional notes" type="text" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Transaction Details</h2>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <CreateForm label="Transaction Type" placeholder="Enter transaction type (pawn / sale)" type="text" value={transactionType} required={true} onChange={(e) => setTransactionType(e.target.value as 'pawn' | 'sale')} />
            <CreateForm label="Date of Receipt" placeholder="Enter date of receipt" type="date" value={dateOfReceipt} required={true} onChange={(e) => setDateOfReceipt(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-2 mt-2">
            <CreateForm label="Redemption Deadline (if pawned)" placeholder="Enter redemption deadline" type="date" value={redemptionDeadline} onChange={(e) => setRedemptionDeadline(e.target.value)} />
            <CreateForm label="Loan Value (if pawned)" placeholder="Enter loan value" type="number" value={loanValue?.toString()} onChange={(e) => setLoanValue(Number(e.target.value))} />
            <CreateForm label="Interest Rate (if pawned)" placeholder="Enter interest rate" type="number" value={interestRate?.toString()} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </div>
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 w-1/2 mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out float-right">
          Add product
        </button>
      </form>
    </div>
  );
}
