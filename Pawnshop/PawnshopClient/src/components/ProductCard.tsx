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

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden mb-4 w-full"
      onClick={toggleExpand}
    >
      <div className="px-6 py-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 object-cover rounded-lg shadow-sm"
              src={
                productImages && productImages.length > 0
                  ? `data:image/jpeg;base64,${productImages[0]}`
                  : placeholder
              }
              alt={productName}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
              <p className="text-sm text-gray-600">
                {category} - {brand}
              </p>
              <p className="text-sm font-medium text-emerald-600 mt-1">
                ${salePrice}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {(currentTransactionType === "pawn" || currentTransactionType === "sale") && (
              <button
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg
                         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                         focus:ring-offset-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange();
                }}
              >
                {currentTransactionType === "pawn" ? "Mark as Redeem" : "Mark as Sold"}
              </button>
            )}
            <div className="flex items-center space-x-2">
              {canEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/edit-product/${_id}`);
                  }}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
                >
                  <img src={editIcon} alt="Edit" className="w-5 h-5" />
                </button>
              )}
              {role === "admin" && (
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    confirmDelete(e);
                  }}
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
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 space-y-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Product Details</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Description:</span>{" "}
                  <span className="text-gray-600">{productDescription}</span>
                </p>
                {model && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>{" "}
                    <span className="text-gray-600">{model}</span>
                  </p>
                )}
                {serialNumber && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Serial Number:</span>{" "}
                    <span className="text-gray-600">{serialNumber}</span>
                  </p>
                )}
                {yearOfProduction && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Year of Production:</span>{" "}
                    <span className="text-gray-600">{yearOfProduction}</span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Technical Condition:</span>{" "}
                  <span className="text-gray-600">{technicalCondition}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Purchase Price:</span>{" "}
                  <span className="text-gray-600">${purchasePrice}</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Transaction Details</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Transaction Type:</span>{" "}
                  <span className="text-gray-600">{currentTransactionType}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Date of Receipt:</span>{" "}
                  <span className="text-gray-600">{formattedDateOfReceipt}</span>
                </p>
                {formattedRedemptionDeadline && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Redemption Deadline:</span>{" "}
                    <span className="text-gray-600">{formattedRedemptionDeadline}</span>
                  </p>
                )}
                {loanValue && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Loan Value:</span>{" "}
                    <span className="text-gray-600">${loanValue}</span>
                  </p>
                )}
                {interestRate && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Interest Rate:</span>{" "}
                    <span className="text-gray-600">{interestRate}%</span>
                  </p>
                )}
                {clientName && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Client:</span>{" "}
                    <span className="text-gray-600">{clientName}</span>
                  </p>
                )}
                {transactionNotes && (
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Transaction Notes:</span>{" "}
                    <span className="text-gray-600">{transactionNotes}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          {additionalNotes && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Notes</h4>
              <p className="text-sm text-gray-600">{additionalNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
