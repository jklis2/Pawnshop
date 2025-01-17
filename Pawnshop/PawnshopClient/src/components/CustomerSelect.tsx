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
      .get(`${import.meta.env.VITE_API_URL}/api/customers`)
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

  useEffect(() => {
    if (initialCustomer) {
      setSelectedCustomer(initialCustomer);
      setSearchTerm(
        `${initialCustomer.firstName} ${initialCustomer.lastName}; PESEL: ${initialCustomer.pesel}`
      );
    }
  }, [initialCustomer]);

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
    <div className="mb-8">
      <label className="text-xl font-semibold mb-4 block text-gray-800">
        Search for Customer<span className="text-red-500"> *</span>
      </label>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter first name, last name, or PESEL"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
          disabled={!!selectedCustomer}
        />
        {selectedCustomer && (
          <button
            onClick={clearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ×
          </button>
        )}
      </div>

      {filteredCustomers.length > 0 && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {filteredCustomers.map((customer) => (
            <button
              key={customer._id}
              onClick={() => handleCustomerSelect(customer)}
              className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-200 ${
                selectedCustomer?._id === customer._id || selectedCustomerId === customer._id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700"
              }`}
            >
              <div className="font-medium">
                {customer.firstName} {customer.lastName}
              </div>
              <div className="text-sm text-gray-500">PESEL: {customer.pesel}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
