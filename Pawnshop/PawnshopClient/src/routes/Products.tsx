import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

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
  productImages?: string[];
  additionalNotes?: string;
  transactionType: "pawn" | "sale" | "redeemed" | "sold";
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  notes?: string;
  clientId: string;
  clientName?: string;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const fetchProductsAndCustomers = async () => {
    try {
      const productsResponse = await axios.get(
        "http://localhost:5000/api/products"
      );
      const productsData: Product[] = productsResponse.data;

      const customersResponse = await axios.get(
        "http://localhost:5000/api/customers"
      );
      const customersData: Customer[] = customersResponse.data;

      const updatedProducts = productsData.map((product) => {
        const customer = customersData.find(
          (c) => c._id === product.clientId
        );
        return {
          ...product,
          clientName: customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Unknown Client",
        };
      });

      const filteredProducts = updatedProducts.filter(
        (product) =>
          product.transactionType === "pawn" ||
          product.transactionType === "sale"
      );

      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts);
      setLoading(false);
    } catch {
      setError(
        "Failed to load products or customers. Please try again later."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCustomers();
  }, []);

  const handleDeleteProduct = () => {
    fetchProductsAndCustomers();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">All products</h1>
      <div className="p-4">
        <SearchBar
          placeholder="Search by product name, brand, or category"
          data={products}
          onSearch={(results) => setFilteredProducts(results)}
          searchKeys={["productName", "brand", "category"]}
        />
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="space-y-8">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    _id={product._id}
                    productName={product.productName}
                    productDescription={product.productDescription}
                    category={product.category}
                    brand={product.brand}
                    model={product.productModel}
                    serialNumber={product.serialNumber}
                    yearOfProduction={product.yearOfProduction}
                    technicalCondition={product.technicalCondition}
                    purchasePrice={product.purchasePrice}
                    salePrice={product.salePrice}
                    productImages={product.productImages}
                    additionalNotes={product.additionalNotes}
                    transactionType={product.transactionType}
                    dateOfReceipt={product.dateOfReceipt}
                    redemptionDeadline={product.redemptionDeadline}
                    loanValue={product.loanValue}
                    interestRate={product.interestRate}
                    transactionNotes={product.notes}
                    clientName={product.clientName}
                    onDelete={handleDeleteProduct}
                  />
                ))
              ) : (
                <p>No products found.</p>
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
