import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  pesel: string;
}

interface CustomerSelectProps {
  selectedCustomerId: string;
  onCustomerSelect: (customerId: string) => void;
  initialCustomer?: Customer | null;
}

export default function CustomerSelect({
  selectedCustomerId,
  onCustomerSelect,
  initialCustomer = null,
}: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    initialCustomer
      ? `${initialCustomer.firstName} ${initialCustomer.lastName}; PESEL: ${initialCustomer.pesel}`
      : ""
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    initialCustomer
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          setError(
            "Expected an array of customers, but received something else."
          );
        }
      })
      .catch(() => {
        setError("Failed to load customers. Please try again later.");
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 5) {
      const filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.pesel.includes(searchTerm)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  }, [searchTerm, customers]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    onCustomerSelect(customer._id);
    setSearchTerm(
      `${customer.firstName} ${customer.lastName}; PESEL: ${customer.pesel}`
    );
  };

  const clearSelection = () => {
    setSelectedCustomer(null);
    setSearchTerm("");
    onCustomerSelect("");
  };

  return (
    <div className="mb-4">
      <label className="text-xl font-semibold mb-6 block text-center">
        Search for Customer
      </label>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter first name, last name, or PESEL"
          className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
          disabled={!!selectedCustomer}
        />
        {selectedCustomer && (
          <button
            onClick={clearSelection}
            className="absolute right-2 top-2 text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      {!selectedCustomer &&
        searchTerm.length >= 5 &&
        filteredCustomers.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md shadow-md">
            {filteredCustomers.map((customer) => (
              <li
                key={customer._id}
                onClick={() => handleCustomerSelect(customer)}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${
                  selectedCustomerId === customer._id ? "bg-gray-300" : ""
                }`}
              >
                {customer.firstName} {customer.lastName}; PESEL:{" "}
                {customer.pesel}
              </li>
            ))}
          </ul>
        )}

      {!selectedCustomer &&
        searchTerm.length >= 5 &&
        filteredCustomers.length === 0 && (
          <p className="text-center text-gray-500">No customers found.</p>
        )}
    </div>
  );
}
