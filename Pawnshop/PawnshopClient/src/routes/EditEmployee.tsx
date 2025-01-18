import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EditEmployeeForm from "../containers/EditEmployeeForm";

export default function EditEmployee() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employees/${id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
        alert(t('routes.errors.fetchEmployee'));
      }
    };

    if (id) fetchEmployee();
  }, [id, t]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center">{t('routes.edit.employee')}</h2>
      {employeeData ? (
        <EditEmployeeForm employee={employeeData} />
      ) : (
        <p>{t('routes.loading.employee')}</p>
      )}
    </div>
  );
}
