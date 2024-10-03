import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import Welcome from "./Welcome";
import Customers from "./Customers";
import Products from "./Products";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`ml-64 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
