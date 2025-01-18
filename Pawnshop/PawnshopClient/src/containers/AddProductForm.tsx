import { useState } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function AddProductForm() {
  const { t } = useTranslation();
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
      showAlert(t('forms.product.validation.required', { field: t('forms.product.fields.required') }), 'error');
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

      showAlert(t('forms.product.validation.success'), 'success');
      navigate('/dashboard/products');
    } catch {
      showAlert(t('forms.product.validation.error'), 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <CustomerSelect 
        selectedCustomerId={selectedCustomerId} 
        onCustomerSelect={setSelectedCustomerId} 
      />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('forms.product.title')}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
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
                value={purchasePrice?.toString()} 
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
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('forms.product.fields.productImages.label')}
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
                label={t('forms.product.fields.additionalNotes.label')} 
                placeholder={t('forms.product.fields.additionalNotes.placeholder')} 
                type="text" 
                value={additionalNotes} 
                onChange={(e) => setAdditionalNotes(e.target.value)} 
              />
            </div>
          </div>

          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('forms.product.sections.transaction')}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CreateForm 
                  label={t('forms.product.fields.transactionType.label')} 
                  placeholder={t('forms.product.fields.transactionType.placeholder')} 
                  type="text" 
                  value={transactionType} 
                  required={true} 
                  onChange={(e) => setTransactionType(e.target.value as 'pawn' | 'sale')} 
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

          <div className="flex justify-end mt-8">
            <button 
              type="submit" 
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {t('forms.product.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
