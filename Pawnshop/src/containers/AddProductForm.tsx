import CreateForm from "../components/CreateForm";

export default function AddProductForm() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Details</h1>
      <div>
        <CreateForm label="Product Name" placeholder="Enter product name" type="text" />
        <CreateForm label="Product Description" placeholder="Enter product description" type="text" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Category" placeholder="Enter category" type="text" />
          <CreateForm label="Brand" placeholder="Enter brand" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Model" placeholder="Enter model" type="text" />
          <CreateForm label="Serial Number (if applicable)" placeholder="Enter serial number" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Year of Production (if applicable)" placeholder="Enter year of production" type="number" />
          <CreateForm label="Technical Condition" placeholder="Enter technical condition" type="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Purchase Price" placeholder="Enter purchase price" type="number" />
          <CreateForm label="Sale Price (if for sale)" placeholder="Enter sale price" type="number" />
        </div>
        <CreateForm label="Product Images" placeholder="Upload product images" type="file" />
        <CreateForm label="Additional Notes (if applicable)" placeholder="Enter additional notes" type="text" />
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Transaction Details
      </h2>
       <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Transaction Type" placeholder="Enter transaction type (pawn / sale)" type="text" />
          <CreateForm label="Date of Receipt" placeholder="Enter date of receipt" type="date" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Redemption Deadline (if pawned)" placeholder="Enter redemption deadline" type="date" />
          <CreateForm label="Loan Value (if pawned)" placeholder="Enter loan value" type="number" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CreateForm label="Interest Rate (if pawned)" placeholder="Enter interest rate" type="number" />
          <CreateForm label="Notes" placeholder="Enter product notes" type="text" />
        </div>
      </div>
    </div>
  );
}
