import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateForm from "../components/CreateForm";
import { useAlert } from '../context/AlertContext';

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

export default function EditCustomerForm() {
  const { id: customerId } = useParams<{ id: string }>();
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        showAlert('Failed to fetch customer data. Please try again later.', 'error');
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId, showAlert]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'pesel',
      'dateOfBirth',
      'street',
      'houseNumber',
      'postalCode',
      'city',
      'idSeries',
      'idNumber',
    ];

    for (const field of requiredFields) {
      if (!customerData?.[field as keyof typeof customerData]) {
        showAlert(`Field ${field} must be filled out.`, 'error');
        return false;
      }
    }

    if (customerData?.pesel.length !== 11 || !/^\d+$/.test(customerData.pesel)) {
      showAlert('PESEL must be exactly 11 digits long and only contain numbers.', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/customers/${customerId}`, customerData);

      if (response.status === 200) {
        showAlert('Customer updated successfully!', 'success');
        navigate('/dashboard/customers');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      showAlert('Failed to update customer. Please try again.', 'error');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/customers');
  };

  if (!customerData) {
    return <div>Loading customer data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Customer</h1>
      <div className="grid grid-cols-2 gap-4">
        <CreateForm label="First Name" type="text" name="firstName" value={customerData.firstName} required={true} onChange={handleInputChange} />
        <CreateForm label="Last Name" type="text" name="lastName" value={customerData.lastName} required={true} onChange={handleInputChange} />
        <CreateForm label="PESEL" type="text" name="pesel" value={customerData.pesel} required={true} onChange={handleInputChange} />
        <CreateForm label="Date of Birth" type="date" name="dateOfBirth" value={customerData.dateOfBirth} required={true} onChange={handleInputChange} />
        <CreateForm label="Street" type="text" name="street" value={customerData.street} required={true} onChange={handleInputChange} />
        <CreateForm label="House Number" type="text" name="houseNumber" value={customerData.houseNumber} required={true} onChange={handleInputChange} />
        <CreateForm label="Postal Code" type="text" name="postalCode" value={customerData.postalCode} required={true} onChange={handleInputChange} />
        <CreateForm label="City" type="text" name="city" value={customerData.city} required={true} onChange={handleInputChange} />
        <CreateForm label="ID Series" type="text" name="idSeries" value={customerData.idSeries} required={true} onChange={handleInputChange} />
        <CreateForm label="ID Number" type="text" name="idNumber" value={customerData.idNumber} required={true} onChange={handleInputChange} />
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
