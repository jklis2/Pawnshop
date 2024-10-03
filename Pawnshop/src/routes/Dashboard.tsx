import { Routes, Route } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import Welcome from "./Welcome";
import Customers from "./Customers";
import Products from "./Products";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <Navbar />
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
