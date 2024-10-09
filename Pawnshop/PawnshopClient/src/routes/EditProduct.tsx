import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditProductForm from "../containers/EditProductForm";

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
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  return (
    <div>
      {product ? (
        <EditProductForm initialData={product} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
