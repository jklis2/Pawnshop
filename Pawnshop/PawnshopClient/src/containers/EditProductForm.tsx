import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';
import { useAlert } from '../context/AlertContext';

interface Customer {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
}

interface EditProductFormProps {
  initialData: {
    id: string;
    clientId: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    model: string;
    serialNumber: string;
    yearOfProduction?: number;
    technicalCondition: string;
    purchasePrice: number;
    salePrice?: number;
    images?: string[];
    additionalNotes?: string;
    transactionType: string;
    dateOfReceipt: string;
    redemptionDeadline?: string;
    loanValue?: number;
    interestRate?: number;
  };
}

export default function EditProductForm({ initialData }: EditProductFormProps) {
  const { t } = useTranslation();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(initialData.clientId);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [productName, setProductName] = useState(initialData.name);
  const [productDescription, setProductDescription] = useState(initialData.description);
  const [category, setCategory] = useState(initialData.category);
  const [brand, setBrand] = useState(initialData.brand);
  const [productModel, setProductModel] = useState(initialData.model);
  const [serialNumber, setSerialNumber] = useState(initialData.serialNumber);
  const [yearOfProduction, setYearOfProduction] = useState<number | undefined>(initialData.yearOfProduction);
  const [technicalCondition, setTechnicalCondition] = useState(initialData.technicalCondition);
  const [purchasePrice, setPurchasePrice] = useState(initialData.purchasePrice);
  const [salePrice, setSalePrice] = useState<number | undefined>(initialData.salePrice);
  const [images, setImages] = useState<FileList | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState(initialData.additionalNotes || '');
  const [transactionType, setTransactionType] = useState(initialData.transactionType);
  const [dateOfReceipt, setDateOfReceipt] = useState(initialData.dateOfReceipt);
  const [redemptionDeadline, setRedemptionDeadline] = useState(initialData.redemptionDeadline || '');
  const [loanValue, setLoanValue] = useState<number | undefined>(initialData.loanValue);
  const [interestRate, setInterestRate] = useState<number | undefined>(initialData.interestRate);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/customers/${initialData.clientId}`)
      .then((response) => {
        setSelectedCustomer(response.data);
      })
      .catch(() => {
        showAlert(t('forms.product.validation.fetchError'), 'error');
      });
  }, [initialData.clientId, showAlert, t]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('clientId', selectedCustomerId);
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('model', productModel);
    formData.append('serialNumber', serialNumber);
    if (yearOfProduction) formData.append('yearOfProduction', yearOfProduction.toString());
    formData.append('technicalCondition', technicalCondition);
    formData.append('purchasePrice', purchasePrice.toString());
    if (salePrice) formData.append('salePrice', salePrice.toString());
    formData.append('transactionType', transactionType);
    formData.append('dateOfReceipt', dateOfReceipt);
    if (redemptionDeadline) formData.append('redemptionDeadline', redemptionDeadline);
    if (loanValue) formData.append('loanValue', loanValue.toString());
    if (interestRate) formData.append('interestRate', interestRate.toString());
    if (additionalNotes) formData.append('additionalNotes', additionalNotes);

    if (images) {
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${initialData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        showAlert(t('forms.product.validation.editSuccess'), 'success');
        navigate('/dashboard/products');
      } else {
        showAlert(t('forms.product.validation.editError'), 'error'); 
      }
    } catch {
      showAlert(t('forms.product.validation.editError'), 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CustomerSelect 
        selectedCustomerId={selectedCustomerId} 
        onCustomerSelect={setSelectedCustomerId} 
        initialCustomer={selectedCustomer}
      />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('forms.product.editTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <CreateForm 
              label={t('forms.product.fields.name.label')} 
              placeholder={t('forms.product.fields.name.placeholder')} 
              type="text" 
              value={productName} 
              required={true} 
              onChange={(e) => setProductName(e.target.value)} 
            />
            <CreateForm 
              label={t('forms.product.fields.description.label')} 
              placeholder={t('forms.product.fields.description.placeholder')} 
              type="text" 
              value={productDescription} 
              required={true} 
              onChange={(e) => setProductDescription(e.target.value)} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm 
                label={t('forms.product.fields.category.label')} 
                placeholder={t('forms.product.fields.category.placeholder')} 
                type="text" 
                value={category} 
                required={true} 
                onChange={(e) => setCategory(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.brand.label')} 
                placeholder={t('forms.product.fields.brand.placeholder')} 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.model.label')} 
                placeholder={t('forms.product.fields.model.placeholder')} 
                type="text" 
                value={productModel} 
                onChange={(e) => setProductModel(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.serialNumber.label')} 
                placeholder={t('forms.product.fields.serialNumber.placeholder')} 
                type="text" 
                value={serialNumber} 
                onChange={(e) => setSerialNumber(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.yearOfProduction.label')} 
                placeholder={t('forms.product.fields.yearOfProduction.placeholder')} 
                type="number" 
                value={yearOfProduction?.toString()} 
                onChange={(e) => setYearOfProduction(Number(e.target.value))} 
              />
              <CreateForm 
                label={t('forms.product.fields.technicalCondition.label')} 
                placeholder={t('forms.product.fields.technicalCondition.placeholder')} 
                type="text" 
                value={technicalCondition} 
                required={true} 
                onChange={(e) => setTechnicalCondition(e.target.value)} 
              />
              <CreateForm 
                label={t('forms.product.fields.purchasePrice.label')} 
                placeholder={t('forms.product.fields.purchasePrice.placeholder')} 
                type="number" 
                value={purchasePrice.toString()} 
                required={true} 
                onChange={(e) => setPurchasePrice(Number(e.target.value))} 
              />
              <CreateForm 
                label={t('forms.product.fields.salePrice.label')} 
                placeholder={t('forms.product.fields.salePrice.placeholder')} 
                type="number" 
                value={salePrice?.toString()} 
                onChange={(e) => setSalePrice(Number(e.target.value))} 
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.product.fields.images.label')}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                  className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-emerald-50 file:text-emerald-700
                           hover:file:bg-emerald-100
                           cursor-pointer"
                />
              </div>
              <CreateForm 
                label={t('forms.product.fields.additionalNotes.label')} 
                placeholder={t('forms.product.fields.additionalNotes.placeholder')} 
                type="text" 
                value={additionalNotes} 
                onChange={(e) => setAdditionalNotes(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('forms.product.sections.transactionData')}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CreateForm 
                  label={t('forms.product.fields.transactionType.label')} 
                  placeholder={t('forms.product.fields.transactionType.placeholder')} 
                  type="text" 
                  value={transactionType} 
                  required={true} 
                  onChange={(e) => setTransactionType(e.target.value)} 
                />
                <CreateForm 
                  label={t('forms.product.fields.dateOfReceipt.label')} 
                  placeholder={t('forms.product.fields.dateOfReceipt.placeholder')} 
                  type="date" 
                  value={dateOfReceipt} 
                  required={true} 
                  onChange={(e) => setDateOfReceipt(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CreateForm 
                  label={t('forms.product.fields.redemptionDeadline.label')} 
                  placeholder={t('forms.product.fields.redemptionDeadline.placeholder')} 
                  type="date" 
                  value={redemptionDeadline} 
                  onChange={(e) => setRedemptionDeadline(e.target.value)} 
                />
                <CreateForm 
                  label={t('forms.product.fields.loanValue.label')} 
                  placeholder={t('forms.product.fields.loanValue.placeholder')} 
                  type="number" 
                  value={loanValue?.toString()} 
                  onChange={(e) => setLoanValue(Number(e.target.value))} 
                />
                <CreateForm 
                  label={t('forms.product.fields.interestRate.label')} 
                  placeholder={t('forms.product.fields.interestRate.placeholder')} 
                  type="number" 
                  value={interestRate?.toString()} 
                  onChange={(e) => setInterestRate(Number(e.target.value))} 
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/products')}
              className="px-6 py-2 border border-red-600 text-red-600 rounded-md 
                       hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.product.cancel')}
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-emerald-600 text-white rounded-md 
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.product.editSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
