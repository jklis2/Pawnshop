import { NavLink } from "react-router-dom";
import PawnshopLogo from "../assets/PawnshopLogo.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import addCustomerIcon from "../assets/icons/addCustomer.svg";
import allCustomersIcon from "../assets/icons/allCustomers.svg";
import addProductIcon from "../assets/icons/addProduct.svg";
import allProductIcon from "../assets/icons/allProduct.svg";
import settingsIcon from "../assets/icons/settings.svg";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div>
        <div className="p-4 flex justify-center">
          <img src={PawnshopLogo} alt="Pawnshop Logo" className="w-32 h-auto" />
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700 flex items-center"
                    : "block p-2 hover:bg-gray-600 flex items-center"
                }
              >
                <img src={dashboardIcon} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-customer"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700 flex items-center"
                    : "block p-2 hover:bg-gray-600 flex items-center"
                }
              >
                <img src={addCustomerIcon} alt="Add Customer Icon" className="w-6 h-6 mr-2" />
                Add new customer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/customers"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700 flex items-center"
                    : "block p-2 hover:bg-gray-600 flex items-center"
                }
              >
                <img src={allCustomersIcon} alt="All Customers Icon" className="w-6 h-6 mr-2" />
                All Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-product"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700 flex items-center"
                    : "block p-2 hover:bg-gray-600 flex items-center"
                }
              >
                <img src={addProductIcon} alt="Add Product Icon" className="w-6 h-6 mr-2" />
                Add new product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700 flex items-center"
                    : "block p-2 hover:bg-gray-600 flex items-center"
                }
              >
                <img src={allProductIcon} alt="All Products Icon" className="w-6 h-6 mr-2" />
                All Products
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive
              ? "block py-2 bg-gray-700 rounded text-center flex items-center justify-center"
              : "block py-2 bg-gray-600 hover:bg-gray-500 rounded text-center flex items-center justify-center"
          }
        >
          <img src={settingsIcon} alt="Settings Icon" className="w-6 h-6 mr-2" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
