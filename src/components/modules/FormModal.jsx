import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { generateId } from "../../utils/generateId";

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    job: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, job, phoneNumber } = formData;

    // Validate that all fields contain at least 2 characters
    if (name.length < 2 || job.length < 2) {
      toast.error("Name and Job should contain at least 2 characters");
      return;
    }

    // Validate email format using a simple regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number format (Iranian numbers)
    const phonePattern = /^(\+98|0)?9\d{9}$/;
    if (!phonePattern.test(phoneNumber)) {
      toast.error("Please enter a valid Iranian phone number");
      return;
    }

    let isUserSure = false;
    const handleUserConfirmation = (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        const userId = initialData ? initialData.id : generateId();
        const createdAt = initialData
          ? initialData.createdAt
          : new Date().toISOString();
        const newFormData = { ...formData, id: userId, createdAt };
        onSave(newFormData);
        onClose();
        toast.success(
          initialData ? "Successfully Edited" : "Successfully Added"
        );
        e.preventDefault();
        return updatedData;
      }
    };
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-900">
              {initialData
                ? "Are you sure you want to edit this user?"
                : "Are you sure you want to add this user?"}
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className="rounded-md p-2 flex items-center justify-center text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={() => handleUserConfirmation(t, false)}
                className="rounded-md p-2 flex items-center justify-center text-sm font-medium text-primary hover:bg-blue-300 cursor-pointer focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Toaster />
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-red-200 hover:bg-red-500 hover:text-white text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-200 hover:bg-blue-500 hover:text-white text-gray-700 px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
