import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Imię i nazwisko"
        className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-600 outline-none"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-600 outline-none"
        required
      />
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Temat"
        className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-600 outline-none"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Wiadomość"
        className="border border-gray-300 p-2 rounded h-32 focus:ring-2 focus:ring-teal-600 outline-none"
        required
      />
      <button
        type="submit"
        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
      >
        Send
      </button>
    </form>
  );
}
