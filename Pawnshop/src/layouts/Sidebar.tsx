import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
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
  );
}
