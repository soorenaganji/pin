// context/MultiSelectContext.js
import React, { createContext, useState, useContext } from "react";
import { deleteOne } from "../api/api";
import { useReload } from "./ReloadContext";
import toast from "react-hot-toast";
const MultiSelectContext = createContext();

export const useMultiSelect = () => useContext(MultiSelectContext);

export const MultiSelectProvider = ({ children }) => {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { setShouldBeReloaded } = useReload();
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
    let isUserSure = false;
    const handleUserConfirmation = (t, confirmation) => {
      toast.dismiss(t.id);
      isUserSure = confirmation;
      if (isUserSure) {
        setSelectedUsers([]);
        selectedUsers.map((user) => deleteOne(user.id));
        setIsMultiSelect(false);
        setShouldBeReloaded(true);
        toast.success(
          "Successfully Deleted"
        );
        e.preventDefault();
        return ;
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
              {"Are you sure you want to delete these users?"}
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

  const selectItem = (item) => {
    console.log("Item selected:", item);
    setSelectedUsers([...selectedUsers, item]);
    console.log("Items selected:", selectedUsers);
  };

  return (
    <MultiSelectContext.Provider
      value={{
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
