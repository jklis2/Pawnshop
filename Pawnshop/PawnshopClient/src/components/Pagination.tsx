interface PaginationProps {
  currentPage: number;
  totalCustomers: number;
  customersPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalCustomers,
  customersPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="bg-teal-600 text-white px-4 py-2 w-24 rounded hover:bg-teal-700 transition duration-300 ease-in-out"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-teal-600 text-white px-4 py-2 w-24 rounded hover:bg-teal-700 transition duration-300 ease-in-out"
      >
        Next
      </button>
    </div>
  );
}
