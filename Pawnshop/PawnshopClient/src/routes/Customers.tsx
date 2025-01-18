import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CustomerCard from "../components/CustomerCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  pesel: string;
  phoneNumber?: string;
  dateOfBirth: string;
  email: string;
  notes?: string;
  items: string[];
}

export default function Customers() {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 15;
  const { showAlert } = useAlert();
  const { employee } = useAuth();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`);
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      showAlert(t('routes.customers.error.fetch'), "error");
    }
  };

  useEffect(() => {
    fetchCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/customers/${id}`);
      showAlert(t('routes.customers.success.delete'), "success");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      showAlert(t('routes.customers.error.delete'), "error");
    }
  };

  const handleCardExpansion = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">{t('routes.customers.title')}</h1>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <SearchBar<Customer>
            placeholder={t('search.customers')}
            data={customers}
            onSearch={(results) => setFilteredCustomers(results)}
            searchKeys={['firstName', 'lastName', 'pesel', 'phoneNumber', 'email']}
          />
        </div>

        <div className="flex flex-col items-center">
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <CustomerCard
                key={customer._id}
                id={customer._id}
                firstName={customer.firstName}
                lastName={customer.lastName}
                street={customer.street}
                houseNumber={customer.houseNumber}
                postalCode={customer.postalCode}
                city={customer.city}
                idSeries={customer.idSeries}
                idNumber={customer.idNumber}
                pesel={customer.pesel}
                phoneNumber={customer.phoneNumber || ""}
                dateOfBirth={customer.dateOfBirth}
                email={customer.email}
                notes={customer.notes || ""}
                items={customer.items}
                isExpanded={expandedCardId === customer._id}
                onExpand={() => handleCardExpansion(customer._id)}
                onDelete={() => handleDelete(customer._id)}
                role={employee?.role || ""}
              />
            ))
          ) : (
            <p>{t('routes.customers.noCustomers')}</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCustomers={filteredCustomers.length}
          customersPerPage={customersPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
