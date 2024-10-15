import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CreateForm from "../components/CreateForm";

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

interface EditCustomerFormProps {
  initialValues: Customer;
  onSubmit: (updatedValues: Customer) => void;
}

export default function EditCustomerForm({ initialValues, onSubmit }: EditCustomerFormProps) {
  const [customerData, setCustomerData] = useState<Customer>(initialValues); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(customerData);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard/customers');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Customer</h1>
      <div className="grid grid-cols-2 gap-4">
        <CreateForm label="First Name" type="text" name="firstName" value={customerData.firstName} onChange={handleInputChange} />
        <CreateForm label="Last Name" type="text" name="lastName" value={customerData.lastName} onChange={handleInputChange} />
        <CreateForm label="PESEL" type="text" name="pesel" value={customerData.pesel} onChange={handleInputChange} />
        <CreateForm label="Date of Birth" type="date" name="dateOfBirth" value={customerData.dateOfBirth} onChange={handleInputChange} />
        <CreateForm label="Street" type="text" name="street" value={customerData.street} onChange={handleInputChange} />
        <CreateForm label="House Number" type="text" name="houseNumber" value={customerData.houseNumber} onChange={handleInputChange} />
        <CreateForm label="Postal Code" type="text" name="postalCode" value={customerData.postalCode} onChange={handleInputChange} />
        <CreateForm label="City" type="text" name="city" value={customerData.city} onChange={handleInputChange} />
        <CreateForm label="ID Series" type="text" name="idSeries" value={customerData.idSeries} onChange={handleInputChange} />
        <CreateForm label="ID Number" type="text" name="idNumber" value={customerData.idNumber} onChange={handleInputChange} />
        <CreateForm label="Phone Number" type="text" name="phoneNumber" value={customerData.phoneNumber} onChange={handleInputChange} />
        <CreateForm label="Email" type="email" name="email" value={customerData.email} onChange={handleInputChange} />
      </div>
      <div className="grid grid-cols-1 mb-4">
        <CreateForm label="Notes" type="text" name="notes" value={customerData.notes} onChange={handleInputChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white px-4 py-2 mb-4 mr-4 rounded hover:bg-red-700 transition duration-300 ease-in-out float-right"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-4 py-2 mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out float-right"
        >
          Save Changes
        </button>
      </div>
      
    </div>
  );
}
