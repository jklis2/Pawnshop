import { useState } from "react";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  category: string;
  brand: string;
  model: string;
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
}

export default function ProductCard({
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
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
                : "/placeholder.jpg"
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
        <p className="text-xl font-bold text-black">${purchasePrice}</p>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {productDescription && (
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {productDescription}
            </p>
          )}
          <p className="text-gray-700">
            <strong>Model:</strong> {model}
          </p>
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
              <strong>Sale Price:</strong> ${salePrice}
            </p>
          )}
          {additionalNotes && (
            <div className="mt-2">
              <p className="text-gray-700">
                <strong>Additional Notes:</strong> {additionalNotes}
              </p>
            </div>
          )}
          {productImages && productImages.length > 1 && (
            <div className="mt-4 flex space-x-4">
              {productImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  className="h-16 w-16 object-cover rounded-md"
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`${productName} Image ${index + 1}`}
                />
              ))}
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Transaction Details
            </h3>
            <p className="text-gray-700">
              <strong>Type:</strong> {transactionType}
            </p>
            <p className="text-gray-700">
              <strong>Date of Receipt:</strong> {dateOfReceipt}
            </p>
            {redemptionDeadline && (
              <p className="text-gray-700">
                <strong>Redemption Deadline:</strong> {redemptionDeadline}
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
            <h3 className="text-lg font-semibold text-gray-800">Client</h3>
            <p className="text-gray-700">
              <strong>Client Name:</strong> {clientName || "Unknown Client"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
