import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditProductForm from "../containers/EditProductForm";
import { useTranslation } from 'react-i18next';

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
  transactionType: "pawn" | "sale";
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: string; 
}

export default function EditProduct() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        alert(t('routes.errors.fetchProduct'));
      }
    };

    if (id) fetchProduct();
  }, [id, t]);

  if (!product) {
    return <p>{t('routes.loading.product')}</p>;
  }

  const formattedProduct = {
    id: product._id,
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
    additionalNotes: product.additionalNotes,
    transactionType: product.transactionType,
    dateOfReceipt: product.dateOfReceipt,
    redemptionDeadline: product.redemptionDeadline,
    loanValue: product.loanValue,
    interestRate: product.interestRate,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">{t('routes.edit.product')}</h1>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <EditProductForm initialData={formattedProduct} />
      </div>
    </div>
  );
}
