import CreateForm from '../components/CreateForm';

export default function AddCustomerForm() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="First Name" placeholder="Enter first name" type="text" />
        <CreateForm label="Last Name" placeholder="Enter last name" type="text" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="PESEL" placeholder="Enter PESEL" type="text" />
        <CreateForm label="Date of Birth" placeholder="Enter date of birth" type="date" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Street" placeholder="Enter street" type="text" />
        <CreateForm label="House Number" placeholder="Enter house number" type="text" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Postal Code" placeholder="Enter postal code" type="text" />
        <CreateForm label="City" placeholder="Enter city" type="text" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="ID Series" placeholder="Enter ID series" type="text" />
        <CreateForm label="ID Number" placeholder="Enter ID number" type="text" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CreateForm label="Phone Number" placeholder="Enter phone number" type="text" />
        <CreateForm label="Email" placeholder="Enter email address" type="email" />
      </div>
    </div>
  );
}
