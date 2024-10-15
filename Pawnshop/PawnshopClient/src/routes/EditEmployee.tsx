import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditEmployeeForm from "../containers/EditEmployeeForm";

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  return (
    <div className="container mx-auto">
      {employeeData ? (
        <EditEmployeeForm employee={employeeData} />
      ) : (
        <p>Loading employee data...</p>
      )}
    </div>
  );
}
