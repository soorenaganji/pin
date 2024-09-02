import React from "react";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useMultiSelect } from "../../context/MultiSelectContext";

function UsersTable({
  toggleDropdown,
  handleDelete,
  filteredData,
  dropdownOpen,
}) {
  const { isMultiSelect, selectItem, selectedItems } = useMultiSelect();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto w-full max-w-6xl h-[32rem] mt-12 mx-auto">
      <table className="min-w-full relative">
        <thead className="text-center border-t bg-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 text-lg font-normal border-r">Name</th>
            <th className="px-4 py-2 text-lg font-normal border-r">Email</th>
            <th className="px-4 py-2 text-lg font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
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
                      className="w-6 h-6 text-red-300 bg-gray-100 border-gray-300 rounded-xl "
                      type="checkbox"
                      checked={selectedItems?.includes(item)}
                      onChange={() => selectItem(item)}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="focus:outline-none text-3xl"
                      >
                        <CiViewList />
                      </button>
                      {dropdownOpen === index && (
                        <div className="absolute right-0 top-0 py-2 w-48 bg-white rounded-md flex items-center justify-center gap-x-2 px-3 z-20">
                          <Link
                            className="w-full p-2 flex items-center justify-center text-xl bg-blue-100 text-gray-700 hover:bg-blue-600 rounded-md text-center hover:text-white"
                            to={`/edit/${item.id}`}
                          >
                            <CiEdit />
                          </Link>
                          <button
                            className="w-full p-2 flex items-center justify-center text-xl bg-red-100 text-red-700 hover:bg-red-600 rounded-md text-center hover:text-white"
                            onClick={() => handleDelete(index)}
                          >
                            <GoTrash />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-4 text-center">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
