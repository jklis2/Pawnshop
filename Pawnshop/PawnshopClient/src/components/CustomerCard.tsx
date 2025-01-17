import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

type CustomerCardProps = {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  pesel: string;
  phoneNumber?: string;
  dateOfBirth: string;
  email: string;
  notes?: string;
  items: string[];
  isExpanded: boolean;
  onExpand: (id: string) => void;
  onDelete: () => void;
  role: string;
};

type Item = {
  _id: string;
  productName: string;
  transactionType: string;
};

export default function CustomerCard({
  id,
  firstName,
  lastName,
  street,
  houseNumber,
  postalCode,
  city,
  idSeries,
  idNumber,
  pesel,
  phoneNumber,
  dateOfBirth,
  email,
  notes,
  items,
  isExpanded,
  onExpand,
  onDelete,
  role,
}: CustomerCardProps) {
  const [customerItems, setCustomerItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/edit-customer/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    showAlert(
      `Are you sure you want to delete ${firstName} ${lastName}?`,
      "error",
      onDelete
    );
  };

  useEffect(() => {
    if (isExpanded) {
      const fetchItems = async () => {
        try {
          const fetchedItems = await Promise.all(
            items.map(async (itemId) => {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products/${itemId}`
              );
              return response.data;
            })
          );
          setCustomerItems(fetchedItems);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      fetchItems();
    }
  }, [isExpanded, items]);

  const getStatusLabel = (transactionType: string) => {
    switch (transactionType) {
      case "pawn":
        return "pawn";
      case "sale":
        return "sale";
      case "redeemed":
        return "redeemed";
      case "sold":
        return "sold";
      default:
        return "unknown";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden mb-4 w-full">
      <div
        className="px-6 py-4 cursor-pointer border-b border-gray-100"
        onClick={() => onExpand(id)}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {firstName} {lastName}
              </h3>
              <span className="text-sm text-gray-500 ml-4">
                PESEL: {pesel}
              </span>
            </div>
            {notes && (
              <p className="text-sm text-gray-500 mt-1">
                Notes: {notes}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEdit}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
            >
              <img src={editIcon} alt="Edit" className="w-5 h-5" />
            </button>
            {role === "admin" && (
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
              </button>
            )}
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
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <div className="px-6 py-4 bg-gray-50 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Date of Birth:</span>{" "}
                <span className="text-gray-600">{new Date(dateOfBirth).toLocaleDateString()}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">ID:</span>{" "}
                <span className="text-gray-600">{idSeries} {idNumber}</span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                <span className="text-gray-600">{email}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                <span className="text-gray-600">{phoneNumber}</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
            <p className="text-sm text-gray-600">
              {street} {houseNumber}, {postalCode} {city}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Items</h4>
            <p className="text-sm text-gray-600">
              {customerItems.length > 0
                ? customerItems
                    .map(
                      (item) =>
                        `${item.productName} (${getStatusLabel(
                          item.transactionType
                        )})`
                    )
                    .join(", ")
                : "No items available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
