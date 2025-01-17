import React, { useState } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';

export default function AddCustomerForm() {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    pesel: '',
    dateOfBirth: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    idSeries: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    notes: '',
  });

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
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
      if (!customerData[field as keyof typeof customerData]) {
        showAlert(`Field ${field} must be filled out.`, 'error');
        return false;
      }
    }

    if (customerData.pesel.length !== 11 || !/^\d+$/.test(customerData.pesel)) {
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, customerData);

      if (response.status === 201) {
        showAlert('Customer added successfully!', 'success');
        navigate('/dashboard/customers');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      showAlert('Failed to add customer. Please try again.', 'error'); 
    }
  };

  return (
    <form className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <CreateForm label="First Name" type="text" placeholder="Enter first name" value={customerData.firstName} required={true} onChange={handleChange} name="firstName" />
        <CreateForm label="Last Name" type="text" placeholder="Enter last name" value={customerData.lastName} required={true} onChange={handleChange} name="lastName" />
        <CreateForm label="PESEL" type="text" placeholder="Enter PESEL" value={customerData.pesel} required={true} onChange={handleChange} name="pesel" />
        <CreateForm label="Date of Birth" type="date" placeholder="Enter date of birth" value={customerData.dateOfBirth} required={true} onChange={handleChange} name="dateOfBirth" />
        <CreateForm label="Street" type="text" placeholder="Enter street" value={customerData.street} required={true} onChange={handleChange} name="street" />
        <CreateForm label="House Number" type="text" placeholder="Enter house number" value={customerData.houseNumber} required={true} onChange={handleChange} name="houseNumber" />
        <CreateForm label="Postal Code" type="text" placeholder="Enter postal code" value={customerData.postalCode} required={true} onChange={handleChange} name="postalCode" />
        <CreateForm label="City" type="text" placeholder="Enter city" value={customerData.city} required={true} onChange={handleChange} name="city" />
        <CreateForm label="ID Series" type="text" placeholder="Enter ID series" value={customerData.idSeries} required={true} onChange={handleChange} name="idSeries" />
        <CreateForm label="ID Number" type="text" placeholder="Enter ID number" value={customerData.idNumber} required={true} onChange={handleChange} name="idNumber" />
        <CreateForm label="Phone Number" type="text" placeholder="Enter phone number" value={customerData.phoneNumber} onChange={handleChange} name="phoneNumber" />
        <CreateForm label="Email" type="email" placeholder="Enter email" value={customerData.email} onChange={handleChange} name="email" />
      </div>
      <div className="grid grid-cols-1 mb-4">
        <CreateForm label="Notes" type="text" placeholder="Enter Customer notes" value={customerData.notes} onChange={handleChange} name="notes" />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-teal-600 text-white px-4 py-2 w-1/2 mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out float-right"
      >
        Add Customer
      </button>
    </form>
  );
}
