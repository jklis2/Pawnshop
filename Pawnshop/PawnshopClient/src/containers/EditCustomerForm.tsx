import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

interface EditCustomerFormProps {
  initialValues: Customer;
  onSubmit: (values: Customer) => Promise<void>;
}

export default function EditCustomerForm({ initialValues, onSubmit }: EditCustomerFormProps) {
  const [customerData, setCustomerData] = useState<Customer>(initialValues);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    setCustomerData(initialValues);
  }, [initialValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await onSubmit(customerData);
      showAlert('Customer updated successfully!', 'success');
      navigate('/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      showAlert('Failed to update customer. Please try again.', 'error');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/customers');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="First Name" type="text" name="firstName" value={customerData.firstName} required={true} onChange={handleInputChange} />
              <CreateForm label="Last Name" type="text" name="lastName" value={customerData.lastName} required={true} onChange={handleInputChange} />
              <CreateForm label="PESEL" type="text" name="pesel" value={customerData.pesel} required={true} onChange={handleInputChange} />
              <CreateForm label="Date of Birth" type="date" name="dateOfBirth" value={customerData.dateOfBirth} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Street" type="text" name="street" value={customerData.street} required={true} onChange={handleInputChange} />
              <CreateForm label="House Number" type="text" name="houseNumber" value={customerData.houseNumber} required={true} onChange={handleInputChange} />
              <CreateForm label="Postal Code" type="text" name="postalCode" value={customerData.postalCode} required={true} onChange={handleInputChange} />
              <CreateForm label="City" type="text" name="city" value={customerData.city} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* ID Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">ID Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="ID Series" type="text" name="idSeries" value={customerData.idSeries} required={true} onChange={handleInputChange} />
              <CreateForm label="ID Number" type="text" name="idNumber" value={customerData.idNumber} required={true} onChange={handleInputChange} />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreateForm label="Phone Number" type="text" name="phoneNumber" value={customerData.phoneNumber} onChange={handleInputChange} />
              <CreateForm label="Email" type="email" name="email" value={customerData.email} onChange={handleInputChange} />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <CreateForm label="Notes" type="text" name="notes" value={customerData.notes} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg
                       hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg
                       hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:ring-offset-2 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
