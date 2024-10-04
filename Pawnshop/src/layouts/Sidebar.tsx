import { NavLink } from "react-router-dom"; // Upewnij się, że ten import znajduje się na górze
import PawnshopLogo from "../assets/PawnshopLogo.png";

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
                    ? "block p-2 bg-gray-700"
                    : "block p-2 hover:bg-gray-600"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-customer"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700"
                    : "block p-2 hover:bg-gray-600"
                }
              >
                Add new customer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/customers"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700"
                    : "block p-2 hover:bg-gray-600"
                }
              >
                All Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-product"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700"
                    : "block p-2 hover:bg-gray-600"
                }
              >
                Add new product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-gray-700"
                    : "block p-2 hover:bg-gray-600"
                }
              >
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
            isActive ? "block py-2 bg-gray-700 rounded text-center" : "block py-2 bg-gray-600 hover:bg-gray-500 rounded text-center"
          }
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}
