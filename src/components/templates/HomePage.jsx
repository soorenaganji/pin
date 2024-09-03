import UsersTable from "../modules/UsersTable";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { getData, updateData } from "../../api/api";
import Modal from "../modules/FormModal";
import { useReload } from "../../context/ReloadContext";
import toast from "react-hot-toast";
const HomePage = () => {
  const { searchQuery } = useSearch();
  const { shouldBeReloaded, setShouldBeReloaded } = useReload();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (shouldBeReloaded) {
      const users = getData();
      setData(users);
      setShouldBeReloaded(false);
      return;
    }
  }, [shouldBeReloaded]);

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = (index) => {
    let isUserSure = false;
    const handleUserConfirmation = (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        localStorage.setItem("tableData", JSON.stringify(updatedData));
        setDropdownOpen(null);
        toast.success(
          "Successfully Deleted"
        );
        e.preventDefault();
        return 
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
              {"Are you sure you want to delete this user?"}
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => handleUserConfirmation(t, true)}
                className="rounded-md p-2 flex items-center justify-center text-sm font-medium text-red-600 hover:bg-red-100 focus:outline-none"
              >
                Delete
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

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleEdit = (email) => {
    const user = data.find((user) => user.email === email);
    if (user) {
      setFormData(user);
      navigate(`/edit/${email}`);
    }
  };
  const handleSave = (newUser) => {
    const updatedData = updateData(newUser);
    setData([...data, newUser]);
    return updatedData;
  };

  const filteredData = data.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className=" p-4">
      <div className="flex justify-between w-full max-w-6xl mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 text-white px-6 py-4 text-lg rounded-lg"
        >
          Add New Entry
        </button>
      </div>
      <UsersTable
        toggleDropdown={toggleDropdown}
        filteredData={filteredData}
        handleDelete={handleDelete}
        dropdownOpen={dropdownOpen}
        onSave={handleSave}
        handleEdit={handleEdit}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
export default HomePage;
