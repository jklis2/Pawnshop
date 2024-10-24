import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";

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

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = () => {
    fetchEmployees();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">All Employees</h1>
      <div className="p-4">
        <SearchBar
          placeholder="Search by first name, last name, or PESEL"
          data={employees}
          onSearch={(results) => setFilteredEmployees(results)}
          searchKeys={["firstName", "lastName", "pesel"]}
        />

        {isLoading ? (
          <p>Loading employees...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee._id}
                  employee={employee}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No employees found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
