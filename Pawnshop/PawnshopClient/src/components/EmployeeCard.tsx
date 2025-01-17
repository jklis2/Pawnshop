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

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/employees/${employee._id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting employee:", error);
      showAlert("There was an error deleting the employee.", "error");
    }
  };

  const confirmDelete = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    showAlert(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      "error",
      handleDelete
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleCard}
      >
        <div>
          <p className="font-bold text-lg">{`${employee.firstName} ${employee.lastName}`}</p>
          <p className="text-sm text-gray-600">PESEL: {employee.pesel}</p>
        </div>
        <div className="flex items-center">
          <img
            src={deleteIcon}
            alt="Delete"
            className="w-5 h-5 cursor-pointer mr-4"
            onClick={confirmDelete}
          />
          <img
            src={editIcon}
            alt="Edit"
            className="w-5 h-5 cursor-pointer mr-4"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/edit-employee/${employee._id}`);
            }}
          />
          {isExpanded ? (
            <img src={arrowTop} alt="Collapse" className="w-6 h-6" />
          ) : (
            <img src={arrowBottom} alt="Expand" className="w-6 h-6" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(employee.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {`${employee.street} ${employee.houseNumber}, ${employee.postalCode} ${employee.city}`}
          </p>
          <p>
            <span className="font-semibold">ID Series/Number:</span>{" "}
            {`${employee.idSeries} ${employee.idNumber}`}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {employee.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {employee.email}
          </p>
          <p>
            <span className="font-semibold">Login:</span> {employee.login}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {employee.role}
          </p>
        </div>
      )}
    </div>
  );
}
