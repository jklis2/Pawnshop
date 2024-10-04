import arrowTop from "../assets/icons/arrowTop.svg";
import arrowBottom from "../assets/icons/arrowBottom.svg";
import editIcon from "../assets/icons/edit.svg";

type CustomerCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  idSeries: string;
  idNumber: string;
  pesel: string;
  phoneNumber: string;
  isExpanded: boolean;
  onExpand: (id: number) => void;
  onEdit?: () => void;
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
  isExpanded,
  onExpand,
  onEdit,
}: CustomerCardProps) {
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
        </div>
        <div className="flex items-center">
          <button
            className="text-blue-500 mr-2"
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit();
            }}
          >
            <img src={editIcon} alt="Edit" className="w-5 h-5" />
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
          <strong>Street:</strong> {street} {houseNumber}
        </p>
        <p>
          <strong>Postal Code:</strong> {postalCode}, <strong>City:</strong>{" "}
          {city}
        </p>
        <p>
          <strong>ID Series:</strong> {idSeries}, <strong>ID Number:</strong>{" "}
          {idNumber}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
      </div>
    </div>
  );
}
