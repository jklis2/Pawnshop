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
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">        
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="First Name" type="text" placeholder="Enter first name" value={customerData.firstName} required={true} onChange={handleChange} name="firstName" />
              <CreateForm label="Last Name" type="text" placeholder="Enter last name" value={customerData.lastName} required={true} onChange={handleChange} name="lastName" />
              <CreateForm label="PESEL" type="text" placeholder="Enter PESEL" value={customerData.pesel} required={true} onChange={handleChange} name="pesel" />
              <CreateForm label="Date of Birth" type="date" placeholder="Enter date of birth" value={customerData.dateOfBirth} required={true} onChange={handleChange} name="dateOfBirth" />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Street" type="text" placeholder="Enter street" value={customerData.street} required={true} onChange={handleChange} name="street" />
              <CreateForm label="House Number" type="text" placeholder="Enter house number" value={customerData.houseNumber} required={true} onChange={handleChange} name="houseNumber" />
              <CreateForm label="Postal Code" type="text" placeholder="Enter postal code" value={customerData.postalCode} required={true} onChange={handleChange} name="postalCode" />
              <CreateForm label="City" type="text" placeholder="Enter city" value={customerData.city} required={true} onChange={handleChange} name="city" />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">ID Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="ID Series" type="text" placeholder="Enter ID series" value={customerData.idSeries} required={true} onChange={handleChange} name="idSeries" />
              <CreateForm label="ID Number" type="text" placeholder="Enter ID number" value={customerData.idNumber} required={true} onChange={handleChange} name="idNumber" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Phone Number" type="text" placeholder="Enter phone number" value={customerData.phoneNumber} onChange={handleChange} name="phoneNumber" />
              <CreateForm label="Email" type="email" placeholder="Enter email" value={customerData.email} onChange={handleChange} name="email" />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Information</h3>
            <CreateForm label="Notes" type="text" placeholder="Enter customer notes" value={customerData.notes} onChange={handleChange} name="notes" />
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
