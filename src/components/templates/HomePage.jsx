import UsersTable from "../modules/UsersTable";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { getData, updateData } from "../../api/api";
import Modal from "../modules/FormModal";
import { useMultiSelect } from "../../context/MultiSelectContext";
const HomePage = () => {
  const { searchQuery } = useSearch();
  const { didUsersListChange, setDidUsersListChange } = useMultiSelect();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (didUsersListChange) {
      const users = getData();
      setData(users);
      setDidUsersListChange(false);
      return;
    }
  }, [didUsersListChange]);

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
    setDropdownOpen(null);
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
