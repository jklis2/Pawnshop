import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  onEdit?: () => void;
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
  onEdit,
}: CustomerCardProps) {
  const [customerItems, setCustomerItems] = useState<Item[]>([]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/edit-customer/${id}`);
  };

  useEffect(() => {
    if (isExpanded) {
      const fetchItems = async () => {
        try {
          const fetchedItems = await Promise.all(
            items.map(async (itemId) => {
              const response = await axios.get(
                `http://localhost:5000/api/products/${itemId}`
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
      default:
        return "unknown";
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md w-full">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => onExpand(id)}
      >
        <div className="flex items-center">
          <h2 className="text-lg font-bold">
            {firstName} {lastName}
          </h2>
          <span className="text-gray-500 ml-4">
            <strong>PESEL:</strong> {pesel}
          </span>
          {notes && (
            <span className="text-gray-500 ml-4">
              <strong>Notes:</strong> {notes}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <button
            className="text-blue-500 mr-2"
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit();
            }}
          >
            <img
              src={editIcon}
              alt="Edit"
              className="w-5 h-5 cursor-pointer"
              onClick={handleEdit}
            />
          </button>
          <button className="text-blue-500">
            <img
              src={isExpanded ? arrowTop : arrowBottom}
              alt={isExpanded ? "Collapse" : "Expand"}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
      <div
        className={`mt-4 text-sm text-gray-700 transition-all duration-300 ease-in-out ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(dateOfBirth).toLocaleDateString()}
        </p>
        <p>
          <strong>ID Series:</strong> {idSeries}, <strong>ID Number:</strong>{" "}
          {idNumber}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p>
          <strong>Street:</strong> {street} {houseNumber}
        </p>
        <p>
          <strong>Postal Code:</strong> {postalCode}, <strong>City:</strong>{" "}
          {city}
        </p>
        <div className="mt-4">
          <strong>Items:</strong>{" "}
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
        </div>
      </div>
    </div>
  );
}
