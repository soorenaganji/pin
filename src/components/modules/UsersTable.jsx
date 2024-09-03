import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useMultiSelect } from "../../context/MultiSelectContext";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";
function UsersTable({
  toggleDropdown,
  handleDelete,
  filteredData,
  dropdownOpen,
}) {
  const { isMultiSelect, selectItem, selectedItems } = useMultiSelect();
  const [sortCriteria, setSortCriteria] = useState("name"); // Default to 'name'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Function to handle sorting
  const handleSort = (criteria) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    if (sortCriteria === criteria) {
      setSortOrder(newSortOrder);
      return;
    }
    setSortCriteria(criteria);
  };
  // Sort the filtered data based on criteria and order
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortCriteria === "name") {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortCriteria === "date") {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }
    return 0; // No sorting applied
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto w-full max-w-6xl h-[32rem] mt-12 mx-auto">
      <table className="min-w-full relative">
        <thead className="text-center border-t bg-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 text-lg font-normal border-r">Name</th>
            <th className="px-4 py-2 text-lg font-normal border-r">Email</th>
            <th
              className="flex items-center justify-center py-2  font-normal"
              colSpan={1}
            >
              <button
                onClick={() => handleSort("name")}
                className={`px-4 py-2  ${
                  sortCriteria === "name" &&
                  "bg-blue-600 text-white border-blue-600"
                }  rounded-l-xl flex items-center justify-center gap-1 border `}
              >
                Name{" "}
                {sortOrder === "asc" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUpAlt />
                )}
              </button>
              <button
                onClick={() => handleSort("date")}
                className={`px-4 py-2 ${
                  sortCriteria === "date" &&
                  "bg-blue-600 text-white border-blue-600"
                } rounded-r-xl flex items-center justify-center gap-1 border `}
              >
                Date{" "}
                {sortOrder === "asc" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUpAlt />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr
                onClick={() => toggleDropdown(index)}
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                } border-t text-center`}
              >
                <td className="p-4 whitespace-nowrap border-r">{item.name}</td>
                <td className="p-4 whitespace-nowrap border-r">{item.email}</td>
                <td className="p-4 relative whitespace-nowrap">
                  {isMultiSelect ? (
                    <input
                      className="w-6 h-6 text-red-300 bg-gray-100 border-gray-300 rounded-xl"
                      type="checkbox"
                      checked={selectedItems?.includes(item)}
                      onChange={() => selectItem(item)}
                    />
                  ) : (
                    <>
                      {dropdownOpen === index ? (
                        <div className="absolute  top-0  w-56 ml-20   rounded-md flex items-center justify-around gap-x-2 px-3  z-20">
                          <Link
                            className="w-full py-2 flex items-center justify-center text-2xl mt-2  mx-auto bg-blue-100 text-gray-700 hover:bg-blue-600 rounded-md text-center hover:text-white transition-all duration-200"
                            to={`/edit/${item.id}`}
                          >
                            <CiEdit />
                          </Link>
                          <button
                            className="w-full py-2 flex items-center justify-center text-2xl mt-2  mx-auto bg-red-100 text-red-700 hover:bg-red-600 rounded-md text-center hover:text-white transition-all duration-200"
                            onClick={() => handleDelete(index)}
                          >
                            <GoTrash />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="focus:outline-none text-3xl"
                        >
                          <CiViewList />
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
