// context/MultiSelectContext.js
import React, { createContext, useState, useContext } from "react";
import { deleteOne } from "../api/api";

const MultiSelectContext = createContext();

export const useMultiSelect = () => useContext(MultiSelectContext);

export const MultiSelectProvider = ({ children }) => {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [didUsersListChange, setDidUsersListChange] = useState(true);
  const toggleMultiSelect = () => {
    setIsMultiSelect((prevIsMultiSelect) => {
      if (prevIsMultiSelect) {
        setSelectedUsers([]);
      }
      return !prevIsMultiSelect;
    });
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.some((u) => u.id === user.id);
      if (isSelected) {
        return prevSelectedUsers.filter((u) => u.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const clearSelectedUsers = () => {
    setSelectedUsers([]);
    selectedUsers.map((user) => deleteOne(user.id));
  
    setIsMultiSelect(false);
    setDidUsersListChange(true)
  };

  const selectItem = (item) => {
    console.log("Item selected:", item);
    setSelectedUsers([...selectedUsers, item]);
    console.log("Items selected:", selectedUsers);
  };

  return (
    <MultiSelectContext.Provider
      value={{
        didUsersListChange,
        setDidUsersListChange,
        isMultiSelect,
        toggleMultiSelect,
        selectedUsers,
        handleSelectUser,
        clearSelectedUsers,
        selectItem, // Make sure this is provided
      }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};
