import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import Welcome from "./Welcome";
import Customers from "./Customers";
import Products from "./Products";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";

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
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
