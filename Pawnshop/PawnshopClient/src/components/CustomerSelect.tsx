import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

interface CustomerSelectProps {
  selectedCustomerId: string;
  onCustomerSelect: (customerId: string) => void;
}

export default function CustomerSelect({
  selectedCustomerId,
  onCustomerSelect,
}: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
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

  return (
    <div className="mb-4">
      <label className="text-xl font-semibold mb-6 block text-center">
        Select Customer
      </label>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <select
        value={selectedCustomerId}
        onChange={(e) => onCustomerSelect(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Choose a customer</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.firstName} {customer.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}
