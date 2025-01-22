import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import CustomerSelect from '../components/CustomerSelect';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
}

interface ProductFormData {
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
  client?: Customer | null;
}

interface EditProductFormProps {
  initialData: ProductFormData;
}

export default function EditProductForm({ initialData }: EditProductFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialData.clientId);
  const [initialCustomer, setInitialCustomer] = useState<Customer | null>(initialData.client || null);

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
  const [additionalNotes, setAdditionalNotes] = useState(initialData.additionalNotes || '');
  const [transactionType] = useState(initialData.transactionType);
  const [dateOfReceipt] = useState(initialData.dateOfReceipt);
  const [redemptionDeadline, setRedemptionDeadline] = useState(initialData.redemptionDeadline || '');
  const [loanValue, setLoanValue] = useState<number | undefined>(initialData.loanValue);
  const [interestRate, setInterestRate] = useState<number | undefined>(initialData.interestRate);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!initialData.clientId) return;
      
      try {
        console.log('Fetching customer with ID:', initialData.clientId);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${initialData.clientId}`);
        console.log('Received customer data:', response.data);
        if (response.data) {
          const customerData: Customer = {
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            pesel: response.data.pesel
          };
          setInitialCustomer(customerData);
          console.log('Set initial customer:', customerData);
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [initialData.clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Konwersja wartości na odpowiednie typy
      const parsedYearOfProduction = yearOfProduction ? parseInt(yearOfProduction.toString()) : null;
      const parsedPurchasePrice = parseFloat(purchasePrice.toString());
      const parsedSalePrice = salePrice ? parseFloat(salePrice.toString()) : null;
      const parsedLoanValue = loanValue ? parseFloat(loanValue.toString()) : null;
      const parsedInterestRate = interestRate ? parseFloat(interestRate.toString()) : null;

      const productData = {
        name: productName,
        description: productDescription,
        category,
        brand: brand || '',
        model: productModel || '',
        serialNumber: serialNumber || '',
        yearOfProduction: parsedYearOfProduction,
        technicalCondition,
        purchasePrice: parsedPurchasePrice,
        salePrice: parsedSalePrice,
        additionalNotes: additionalNotes || '',
        transactionType,
        dateOfReceipt,
        redemptionDeadline: redemptionDeadline || null,
        loanValue: parsedLoanValue,
        interestRate: parsedInterestRate,
        clientId: selectedCustomerId,
      };

      console.log('Sending update request with data:', productData);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${initialData.id}`,
        productData
      );

      console.log('Update response:', response.data);

      if (response.data) {
        navigate('/dashboard/products');
      } else {
        setError("No data received from server after update");
      }
    } catch (error) {
      console.error('Error updating product:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Failed to update product";
        console.error('Server error:', errorMessage);
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.customer.select')}</h3>
            <CustomerSelect 
              onCustomerSelect={setSelectedCustomerId}
              initialCustomer={initialCustomer}
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.productDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.pricingData')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.additionalData')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm 
                label={t('forms.product.fields.additionalNotes.label')} 
                placeholder={t('forms.product.fields.additionalNotes.placeholder')} 
                type="text" 
                value={additionalNotes} 
                onChange={(e) => setAdditionalNotes(e.target.value)} 
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">{t('forms.product.sections.transactionData')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CreateForm 
                  label={t('forms.product.fields.transactionType.label')} 
                  placeholder={t('forms.product.fields.transactionType.placeholder')} 
                  type="text" 
                  value={transactionType} 
                  required={true}
                  disabled={true}
                  onChange={() => {}} 
                />
                <CreateForm 
                  label={t('forms.product.fields.dateOfReceipt.label')} 
                  placeholder={t('forms.product.fields.dateOfReceipt.placeholder')} 
                  type="date" 
                  value={dateOfReceipt} 
                  required={true} 
                  disabled={true}
                  onChange={() => {}}
                />
              </div>
              {transactionType === 'pawn' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CreateForm 
                    label={t('forms.product.fields.redemptionDeadline.label')} 
                    placeholder={t('forms.product.fields.redemptionDeadline.placeholder')} 
                    type="date" 
                    value={redemptionDeadline} 
                    required={true}
                    onChange={(e) => setRedemptionDeadline(e.target.value)} 
                  />
                  <CreateForm 
                    label={t('forms.product.fields.loanValue.label')} 
                    placeholder={t('forms.product.fields.loanValue.placeholder')} 
                    type="number" 
                    value={loanValue?.toString()} 
                    required={true}
                    onChange={(e) => setLoanValue(Number(e.target.value))} 
                  />
                  <CreateForm 
                    label={t('forms.product.fields.interestRate.label')} 
                    placeholder={t('forms.product.fields.interestRate.placeholder')} 
                    type="number" 
                    value={interestRate?.toString()} 
                    required={true}
                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                  />
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}

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
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md 
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              {loading ? t('common.saving') : t('forms.product.editSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
