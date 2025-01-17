import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditCustomerForm from "../containers/EditCustomerForm";

interface Customer {
  firstName: string;
  lastName: string;
  pesel: string;
  dateOfBirth: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

export default function EditCustomer() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        alert("Failed to fetch customer data.");
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleUpdate = async (updatedValues: Customer) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, updatedValues);
      alert("Customer updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer.");
    }
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center">Edit Customer</h2>
      <EditCustomerForm initialValues={customer} onSubmit={handleUpdate} />
    </div>
  );
}
