import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateForm from '../components/CreateForm';
import { useAlert } from '../context/AlertContext';

type EmployeeData = {
  _id: string;
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
  login: string;
  password: string;
  role: string;
};

interface EditEmployeeFormProps {
  employee: EmployeeData;
}

export default function EditEmployeeForm({ employee }: EditEmployeeFormProps) {
  const [employeeData, setEmployeeData] = useState<EmployeeData>(employee);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

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
      if (!employeeData[field as keyof EmployeeData]) {
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
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/employees/${employeeData._id}`, employeeData);
  
      if (response.status === 200) {
        showAlert('Employee updated successfully!', 'success');
        navigate('/dashboard/employees');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      showAlert('Failed to update employee. Please try again.', 'error');
    }
  };
  

  const handleGoBack = () => {
    navigate('/dashboard/employees');
  };

  return (
    <form className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Employee</h2>
      <div className="grid grid-cols-2 gap-4">
        <CreateForm label="First Name" type="text" placeholder="Enter first name" value={employeeData.firstName} required={true} onChange={handleChange} name="firstName" />
        <CreateForm label="Last Name" type="text" placeholder="Enter last name" value={employeeData.lastName} required={true} onChange={handleChange} name="lastName" />
        <CreateForm label="PESEL" type="text" placeholder="Enter PESEL" value={employeeData.pesel} required={true} onChange={handleChange} name="pesel" />
        <CreateForm label="Date of Birth" type="date" placeholder="YYYY-MM-DD" value={employeeData.dateOfBirth} required={true} onChange={handleChange} name="dateOfBirth" />
        <CreateForm label="Street" type="text" placeholder="Enter street" value={employeeData.street} required={true} onChange={handleChange} name="street" />
        <CreateForm label="House Number" type="text" placeholder="Enter house number" value={employeeData.houseNumber} required={true} onChange={handleChange} name="houseNumber" />
        <CreateForm label="Postal Code" type="text" placeholder="Enter postal code" value={employeeData.postalCode} required={true} onChange={handleChange} name="postalCode" />
        <CreateForm label="City" type="text" placeholder="Enter city" value={employeeData.city} required={true} onChange={handleChange} name="city" />
        <CreateForm label="ID Series" type="text" placeholder="Enter ID series" value={employeeData.idSeries} required={true} onChange={handleChange} name="idSeries" />
        <CreateForm label="ID Number" type="text" placeholder="Enter ID number" value={employeeData.idNumber} required={true} onChange={handleChange} name="idNumber" />
        <CreateForm label="Phone Number" type="tel" placeholder="Enter phone number" value={employeeData.phoneNumber} required={true} onChange={handleChange} name="phoneNumber" />
        <CreateForm label="Email" type="email" placeholder="Enter email" value={employeeData.email} required={true} onChange={handleChange} name="email" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <CreateForm label="Login" type="text" placeholder="Enter login" value={employeeData.login} required={true} onChange={handleChange} name="login" />
        <CreateForm label="Password" type="password" placeholder="Enter new password" value={employeeData.password} required={true} onChange={handleChange} name="password" />
        <CreateForm label="Role" type="text" placeholder="Enter role (admin or employee)" value={employeeData.role} required={true} onChange={handleChange} name="role" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white px-4 py-2 mb-4 mr-4 rounded hover:bg-red-700 transition duration-300 ease-in-out float-right"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-4 py-2 mb-4 rounded hover:bg-teal-800 transition duration-300 ease-in-out float-right"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
