import { useState } from "react";
import axios, { AxiosError } from "axios";
import CreateForm from "../components/CreateForm";

export default function AddCustomerForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pesel, setPesel] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [idSeries, setIdSeries] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    try {
      const newCustomer = {
        firstName,
        lastName,
        pesel,
        dateOfBirth,
        street,
        houseNumber,
        postalCode,
        city,
        idSeries,
        idNumber,
        phoneNumber,
        email,
        notes,
      };

      await axios.post("http://localhost:5000/api/customers", newCustomer);

      setFirstName("");
      setLastName("");
      setPesel("");
      setDateOfBirth("");
      setStreet("");
      setHouseNumber("");
      setPostalCode("");
      setCity("");
      setIdSeries("");
      setIdNumber("");
      setPhoneNumber("");
      setEmail("");
      setNotes("");

      alert("Customer added successfully!");
    } catch (error: unknown) { 
      if (error instanceof AxiosError) {
        console.error("Error response from server:", error.response?.data);
        alert(`Failed to add customer: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Failed to add customer due to an unexpected error.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="First Name" placeholder="Enter first name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <CreateForm label="Last Name" placeholder="Enter last name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="PESEL" placeholder="Enter PESEL" type="text" value={pesel} onChange={(e) => setPesel(e.target.value)} />
        <CreateForm label="Date of Birth" placeholder="Enter date of birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Street" placeholder="Enter street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
        <CreateForm label="House Number" placeholder="Enter house number" type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Postal Code" placeholder="Enter postal code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        <CreateForm label="City" placeholder="Enter city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="ID Series" placeholder="Enter ID series" type="text" value={idSeries} onChange={(e) => setIdSeries(e.target.value)} />
        <CreateForm label="ID Number" placeholder="Enter ID number" type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Phone Number" placeholder="Enter phone number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <CreateForm label="Email" placeholder="Enter email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 mb-4">
        <CreateForm label="Notes" placeholder="Enter Customer notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Add Customer
      </button>
    </div>
  );
}
