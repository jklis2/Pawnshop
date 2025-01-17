import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";

type Employee = {
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
  role: string;
};

interface EmployeeCardProps {
  employee: Employee;
  onDelete: () => void;
}

export default function EmployeeCard({ employee, onDelete }: EmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const toggleCard = () => setIsExpanded((prev) => !prev);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    showAlert(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      "error",
      async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/employees/${employee._id}`);
          onDelete();
        } catch (error) {
          console.error("Error deleting employee:", error);
          showAlert("There was an error deleting the employee.", "error");
        }
      }
    );
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/edit-employee/${employee._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden w-full">
      <div
        className="px-6 py-4 cursor-pointer border-b border-gray-100"
        onClick={toggleCard}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{`${employee.firstName} ${employee.lastName}`}</h3>
            <p className="text-sm text-gray-500 mt-1">Role: {employee.role}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEdit}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
            >
              <img src={editIcon} alt="Edit" className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <img
                src={isExpanded ? arrowTop : arrowBottom}
                alt={isExpanded ? "Collapse" : "Expand"}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">PESEL:</span>{" "}
                <span className="text-gray-600">{employee.pesel}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Date of Birth:</span>{" "}
                <span className="text-gray-600">{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <span className="text-gray-600">{employee.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                <span className="text-gray-600">{employee.phoneNumber}</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
            <p className="text-sm text-gray-600">
              {employee.street} {employee.houseNumber}, {employee.postalCode} {employee.city}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">ID Information</h4>
            <p className="text-sm">
              <span className="font-medium text-gray-700">ID:</span>{" "}
              <span className="text-gray-600">{employee.idSeries} {employee.idNumber}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
