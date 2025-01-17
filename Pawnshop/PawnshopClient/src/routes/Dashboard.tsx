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
import Archives from "./Archives";
import Settings from "./Settings";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-employee"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AddEmployee />
                  </ProtectedRoute>
                }
              />
              <Route path="/edit-customer/:id" element={<EditCustomer />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route
                path="/edit-employee/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <EditEmployee />
                  </ProtectedRoute>
                }
              />
              <Route path="/archives" element={<Archives />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
