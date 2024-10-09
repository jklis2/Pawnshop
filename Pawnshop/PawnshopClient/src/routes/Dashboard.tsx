import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import Welcome from "./Welcome";
import Customers from "./Customers";
import Products from "./Products";
import Employees from "./Employees";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";
import AddEmployee from "./AddEmployee";
import EditCustomer from "./EditCustomer";
import EditProduct from "./EditProduct";
import EditEmployee from "./EditEmployee";
import Settings from "./Settings";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit-customer/:id" element={<EditCustomer />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/edit-employee" element={<EditEmployee />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
