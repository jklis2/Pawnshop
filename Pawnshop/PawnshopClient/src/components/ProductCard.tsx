import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import placeholder from "../assets/Placeholder.png";

interface ProductCardProps {
  _id: string;
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  model?: string;
  serialNumber?: string;
  yearOfProduction?: number;
  technicalCondition: string;
  purchasePrice: number;
  salePrice?: number;
  productImages?: string[];
  additionalNotes?: string;
  transactionType: string;
  dateOfReceipt: string;
  redemptionDeadline?: string;
  loanValue?: number;
  interestRate?: number;
  transactionNotes?: string;
  clientName?: string;
  canEdit?: boolean;
  onDelete: () => void;
  role: string;
}

export default function ProductCard({
  _id,
  productName,
  productDescription,
  category,
  brand,
  model,
  serialNumber,
  yearOfProduction,
  technicalCondition,
  purchasePrice,
  salePrice,
  productImages,
  additionalNotes,
  transactionType,
  dateOfReceipt,
  redemptionDeadline,
  loanValue,
  interestRate,
  transactionNotes,
  clientName,
  canEdit = true,
  onDelete,
  role,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTransactionType, setCurrentTransactionType] = useState(transactionType);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${_id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("There was an error deleting the product.", "error");
    }
  };

  const confirmDelete = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    showAlert(
      `Are you sure you want to delete ${productName}?`,
      "error",
      handleDelete
    );
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = currentTransactionType === "pawn" ? "redeemed" : "sold";

      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${_id}`, {
        transactionType: newStatus,
      });

      setCurrentTransactionType(newStatus);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const formattedDateOfReceipt = new Date(dateOfReceipt).toLocaleDateString(
    "pl-PL",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedRedemptionDeadline = redemptionDeadline
    ? new Date(redemptionDeadline).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`w-full mb-8 cursor-pointer transition-transform duration-300 ${
        isExpanded ? "shadow-lg" : ""
      }`}
      onClick={toggleExpand}
    >
      <div className="flex items-center justify-between px-6 py-4 border border-gray-200 rounded-md bg-white">
        <div className="flex items-center">
          <img
            className="h-24 w-24 object-cover rounded-md mr-4"
            src={
              productImages && productImages.length > 0
                ? `data:image/jpeg;base64,${productImages[0]}`
                : placeholder
            }
            alt={productName}
          />
          <div>
            <h2 className="text-xl font-bold text-black">{productName}</h2>
            <p className="text-sm text-gray-600">
              {category} - {brand}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-black mr-4">${salePrice}</p>

          {(currentTransactionType === "pawn" || currentTransactionType === "sale") && (
            <button
              className="font-bold mr-4 bg-teal-600 text-white px-4 py-2 w-44 rounded hover:bg-teal-700 transition duration-300 ease-in-out"
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange();
              }}
            >
              {currentTransactionType === "pawn" ? "Mark as Redeem" : "Mark as Sold"}
            </button>
          )}
          {role === "admin" && (
            <img
              src={deleteIcon}
              alt="Delete"
              className="w-5 h-5 cursor-pointer mr-4"
              onClick={confirmDelete}
            />
          )}
          {canEdit && (
            <img
              src={editIcon}
              alt="Edit"
              className="w-5 h-5 cursor-pointer mr-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dashboard/edit-product/${_id}`);
              }}
            />
          )}
          {isExpanded ? (
            <img src={arrowTop} alt="Collapse" className="w-6 h-6" />
          ) : (
            <img src={arrowBottom} alt="Expand" className="w-6 h-6" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {productDescription}
          </p>
          {model && (
            <p className="text-gray-700">
              <strong>Model:</strong> {model}
            </p>
          )}

          {serialNumber && (
            <p className="text-gray-700">
              <strong>Serial Number:</strong> {serialNumber}
            </p>
          )}
          {yearOfProduction && (
            <p className="text-gray-700">
              <strong>Year of Production:</strong> {yearOfProduction}
            </p>
          )}
          <p className="text-gray-700">
            <strong>Technical Condition:</strong> {technicalCondition}
          </p>
          {salePrice && (
            <p className="text-gray-700">
              <strong>Purchase Price:</strong> ${purchasePrice}
            </p>
          )}
          {additionalNotes && (
            <div className="mt-2">
              <p className="text-gray-700">
                <strong>Additional Notes:</strong> {additionalNotes}
              </p>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Transaction Details
            </h3>
            <p className="text-gray-700">
              <strong>Type:</strong> {currentTransactionType}
            </p>
            <p className="text-gray-700">
              <strong>Date of Receipt:</strong> {formattedDateOfReceipt}
            </p>
            {formattedRedemptionDeadline && (
              <p className="text-gray-700">
                <strong>Redemption Deadline:</strong>{" "}
                {formattedRedemptionDeadline}
              </p>
            )}
            {loanValue && (
              <p className="text-gray-700">
                <strong>Loan Value:</strong> ${loanValue}
              </p>
            )}
            {interestRate && (
              <p className="text-gray-700">
                <strong>Interest Rate:</strong> {interestRate}%
              </p>
            )}
            {transactionNotes && (
              <p className="text-gray-700">
                <strong>Notes:</strong> {transactionNotes}
              </p>
            )}
          </div>
          <div className="mt-6">
            <p className="text-gray-700">
              <strong>Client Name:</strong> {clientName || "Unknown Client"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
