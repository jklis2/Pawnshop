import { useEffect, useState } from "react";
import axios from "axios";
import CustomerCard from "../components/CustomerCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useAlert } from "../context/AlertContext";

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 15;
  const { showAlert } = useAlert();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      showAlert("Error fetching customers.", "error");
    }
  };

  useEffect(() => {
    fetchCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      showAlert("Customer successfully deleted.", "success");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      showAlert("Error deleting customer.", "error");
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
      <h1 className="text-2xl font-bold text-center mb-4">All Customers</h1>
      <div className="p-4">
        <SearchBar
          placeholder="Search by first name, last name, or PESEL"
          data={customers}
          onSearch={(results) => setFilteredCustomers(results)}
          searchKeys={["firstName", "lastName", "pesel"]}
        />

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
              />
            ))
          ) : (
            <p>No customers found.</p>
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
