import { useEffect, useState } from "react";
import axios from "axios";
import CustomerCard from "../components/CustomerCard";

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
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCardExpansion = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-bold mb-4">Customers Page</h1>
      <p className="text-center text-lg mb-8">
        Here you can manage all your customers.
      </p>
      <div className="flex flex-col items-center">
        {customers.length > 0 ? (
          customers.map((customer) => (
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
              isExpanded={expandedCardId === customer._id}
              onExpand={() => handleCardExpansion(customer._id)}
            />
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
}
