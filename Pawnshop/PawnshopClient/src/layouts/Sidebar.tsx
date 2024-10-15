import { useAuth } from "../context/AuthContext";
import PawnshopLogo from "../assets/PawnshopLogo.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import addCustomerIcon from "../assets/icons/addCustomer.svg";
import allCustomersIcon from "../assets/icons/allCustomers.svg";
import addProductIcon from "../assets/icons/addProduct.svg";
import allProductIcon from "../assets/icons/allProduct.svg";
import addEmployeeIcon from "../assets/icons/addEmployee.svg";
import allEmployeesIcon from "../assets/icons/allEmployees.svg";
import archivesIcon from "../assets/icons/archives.svg";
import settingsIcon from "../assets/icons/settings.svg";
import SidebarLink from "../components/SidebarLink";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const { employee } = useAuth();

  return (
    <div
      className={`w-64 bg-emerald-800 text-white h-screen fixed top-0 left-0 flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div>
        <div className="p-4 flex justify-center">
          <img src={PawnshopLogo} alt="Pawnshop Logo" className="w-32 h-auto" />
        </div>
        <nav className="p-4">
          <ul>
            <SidebarLink to="/dashboard" iconSrc={dashboardIcon} label="Dashboard" />
            <SidebarLink to="/dashboard/add-customer" iconSrc={addCustomerIcon} label="Add new customer" />
            <SidebarLink to="/dashboard/customers" iconSrc={allCustomersIcon} label="All Customers" />
            <SidebarLink to="/dashboard/add-product" iconSrc={addProductIcon} label="Add new product" />
            <SidebarLink to="/dashboard/products" iconSrc={allProductIcon} label="All Products" />
            {employee?.role === "admin" && (
              <>
                <SidebarLink to="/dashboard/add-employee" iconSrc={addEmployeeIcon} label="Add new Employee" />
                <SidebarLink to="/dashboard/employees" iconSrc={allEmployeesIcon} label="All Employees" />
              </>
            )}
            <SidebarLink to="/dashboard/archives" iconSrc={archivesIcon} label="Archives" />
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <SidebarLink to="/dashboard/settings" iconSrc={settingsIcon} label="Settings" />
      </div>
    </div>
  );
}
