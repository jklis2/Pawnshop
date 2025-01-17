import React, { useState } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeeForm() {
  const [employeeData, setEmployeeData] = useState({
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
    login: '',
    password: '',
    role: '',
  });

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
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
      'phoneNumber',
      'email',
      'login',
      'password',
      'role',
    ];

    for (const field of requiredFields) {
      if (!employeeData[field as keyof typeof employeeData]) {
        showAlert(`Field ${field} must be filled out.`, 'error');
        return false;
      }
    }

    if (employeeData.pesel.length !== 11 || !/^\d+$/.test(employeeData.pesel)) {
      showAlert('PESEL must be exactly 11 digits long and only contain numbers.', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeData.email)) {
      showAlert('Please enter a valid email address.', 'error');
      return false;
    }

    if (employeeData.phoneNumber.length < 9 || employeeData.phoneNumber.length > 15 || !/^\d+$/.test(employeeData.phoneNumber)) {
      showAlert('Phone number must be between 9 and 15 digits and only contain numbers.', 'error');
      return false;
    }

    if (employeeData.role !== 'admin' && employeeData.role !== 'employee') {
      showAlert('Role must be either "admin" or "employee".', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/employees`, employeeData);

      if (response.status === 201) {
        showAlert('Employee added successfully!', 'success');
        navigate('/dashboard/employees');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      showAlert('Failed to add employee. Please try again.', 'error'); 
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
              <CreateForm label="First Name" type="text" placeholder="Enter first name" value={employeeData.firstName} required={true} onChange={handleChange} name="firstName" />
              <CreateForm label="Last Name" type="text" placeholder="Enter last name" value={employeeData.lastName} required={true} onChange={handleChange} name="lastName" />
              <CreateForm label="PESEL" type="text" placeholder="Enter PESEL" value={employeeData.pesel} required={true} onChange={handleChange} name="pesel" />
              <CreateForm label="Date of Birth" type="date" placeholder="YYYY-MM-DD" value={employeeData.dateOfBirth} required={true} onChange={handleChange} name="dateOfBirth" />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Street" type="text" placeholder="Enter street" value={employeeData.street} required={true} onChange={handleChange} name="street" />
              <CreateForm label="House Number" type="text" placeholder="Enter house number" value={employeeData.houseNumber} required={true} onChange={handleChange} name="houseNumber" />
              <CreateForm label="Postal Code" type="text" placeholder="Enter postal code" value={employeeData.postalCode} required={true} onChange={handleChange} name="postalCode" />
              <CreateForm label="City" type="text" placeholder="Enter city" value={employeeData.city} required={true} onChange={handleChange} name="city" />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">ID Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="ID Series" type="text" placeholder="Enter ID series" value={employeeData.idSeries} required={true} onChange={handleChange} name="idSeries" />
              <CreateForm label="ID Number" type="text" placeholder="Enter ID number" value={employeeData.idNumber} required={true} onChange={handleChange} name="idNumber" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Phone Number" type="tel" placeholder="Enter phone number" value={employeeData.phoneNumber} required={true} onChange={handleChange} name="phoneNumber" />
              <CreateForm label="Email" type="email" placeholder="Enter email" value={employeeData.email} required={true} onChange={handleChange} name="email" />
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CreateForm label="Login" type="text" placeholder="Enter login" value={employeeData.login} required={true} onChange={handleChange} name="login" />
              <CreateForm label="Password" type="password" placeholder="Enter password" value={employeeData.password} required={true} onChange={handleChange} name="password" />
              <CreateForm label="Role" type="text" placeholder="Enter role (admin or employee)" value={employeeData.role} required={true} onChange={handleChange} name="role" />
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
