import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';

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
  const [message, setMessage] = useState('');

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

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${employeeData._id}`, employeeData);

      if (response.status === 200) {
        setMessage('Employee updated successfully!');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Failed to update employee. Please try again.');
    }
  };


  return (
    <form className="w-full max-w-4xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

      <div className="grid grid-cols-2 gap-4">
        <CreateForm label="First Name" type="text" placeholder="Enter first name" value={employeeData.firstName} onChange={handleChange} name="firstName" />
        <CreateForm label="Last Name" type="text" placeholder="Enter last name" value={employeeData.lastName} onChange={handleChange} name="lastName" />
        <CreateForm label="PESEL" type="text" placeholder="Enter PESEL" value={employeeData.pesel} onChange={handleChange} name="pesel" />
        <CreateForm label="Date of Birth" type="date" placeholder="YYYY-MM-DD" value={employeeData.dateOfBirth} onChange={handleChange} name="dateOfBirth" />
        <CreateForm label="Street" type="text" placeholder="Enter street" value={employeeData.street} onChange={handleChange} name="street" />
        <CreateForm label="House Number" type="text" placeholder="Enter house number" value={employeeData.houseNumber} onChange={handleChange} name="houseNumber" />
        <CreateForm label="Postal Code" type="text" placeholder="Enter postal code" value={employeeData.postalCode} onChange={handleChange} name="postalCode" />
        <CreateForm label="City" type="text" placeholder="Enter city" value={employeeData.city} onChange={handleChange} name="city" />
        <CreateForm label="ID Series" type="text" placeholder="Enter ID series" value={employeeData.idSeries} onChange={handleChange} name="idSeries" />
        <CreateForm label="ID Number" type="text" placeholder="Enter ID number" value={employeeData.idNumber} onChange={handleChange} name="idNumber" />
        <CreateForm label="Phone Number" type="tel" placeholder="Enter phone number" value={employeeData.phoneNumber} onChange={handleChange} name="phoneNumber" />
        <CreateForm label="Email" type="email" placeholder="Enter email" value={employeeData.email} onChange={handleChange} name="email" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <CreateForm label="Login" type="text" placeholder="Enter login" value={employeeData.login} onChange={handleChange} name="login" />
        <CreateForm label="Password" type="password" placeholder="Enter new password" value={employeeData.password} onChange={handleChange} name="password" />
        <CreateForm label="Role" type="text" placeholder="Enter role (admin or employee)" value={employeeData.role} onChange={handleChange} name="role" />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Save Changes
      </button>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </form>
  );
}
