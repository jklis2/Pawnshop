import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

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
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
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

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const { employee } = useAuth();
  const { showAlert } = useAlert();

  const fetchProductsAndCustomers = async () => {
    try {
      const productsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      const productsData: Product[] = productsResponse.data;

      const customersResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/customers`
      );
      const customersData: Customer[] = customersResponse.data;

      const updatedProducts = productsData.map((product) => {
        const customer = customersData.find((c) => c.id === product.clientId);
        return {
          ...product,
          client: customer
            ? {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
              }
            : {
                id: '',
                firstName: 'Unknown',
                lastName: 'Client',
              },
        };
      });

      const activeProducts = updatedProducts.filter(
        (product) =>
          product.transactionType === "pawn" ||
          product.transactionType === "sale"
      );

      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
      setLoading(false);
      setError(null);
    } catch {
      setError(t('routes.products.error.fetch'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      showAlert(t('routes.products.success.delete'), "success");
      fetchProductsAndCustomers();
    } catch {
      console.error("Error deleting product");
      showAlert(t('routes.products.error.delete'), "error");
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('routes.products.title')}</h1>
      <div className="p-4">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <SearchBar<Product>
              placeholder={t('search.products')}
              data={products}
              onSearch={(results) => setFilteredProducts(results)}
              searchKeys={['productName', 'productDescription', 'brand', 'productModel', 'serialNumber']}
            />
          </div>
        </div>
        {loading && <p className="text-center">{t('routes.products.loading')}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="space-y-8">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={() => handleDelete(product.id)}
                    role={employee?.role || ""}
                  />
                ))
              ) : (
                <p>{t('routes.products.noProducts')}</p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalCustomers={filteredProducts.length}
              customersPerPage={productsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
}
