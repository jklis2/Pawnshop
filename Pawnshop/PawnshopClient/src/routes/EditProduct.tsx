import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditProductForm from "../containers/EditProductForm";
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
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
  productImages?: string[];
  additionalNotes?: string;
  transactionType: string;
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function EditProduct() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setError(t('routes.errors.fetchProduct'));
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, t]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-600">{t('routes.loading.product')}</p>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-red-600">{error}</p>
    </div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-600">{t('routes.errors.productNotFound')}</p>
    </div>;
  }

  const formattedData = {
    id: product.id,
    clientId: product.clientId,
    name: product.productName,
    description: product.productDescription,
    category: product.category,
    brand: product.brand,
    model: product.productModel,
    serialNumber: product.serialNumber || '',
    yearOfProduction: product.yearOfProduction,
    technicalCondition: product.technicalCondition,
    purchasePrice: product.purchasePrice,
    salePrice: product.salePrice,
    images: product.productImages,
    additionalNotes: product.additionalNotes,
    transactionType: product.transactionType,
    dateOfReceipt: product.dateOfReceipt,
    redemptionDeadline: product.redemptionDeadline,
    loanValue: product.loanValue,
    interestRate: product.interestRate
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Edytuj Produkt</h1>
      <EditProductForm initialData={formattedData} />
    </div>
  );
}
