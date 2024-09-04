import React from "react";
import { useSearch } from "../../context/SearchContext";
import { useMultiSelect } from "../../context/MultiSelectContext";
import { Toaster } from "react-hot-toast";
import logo from "../../../public/logo.png";
import { CiSearch } from "react-icons/ci";
import { BiSelectMultiple } from "react-icons/bi";
import { GoTrash } from "react-icons/go"; 
import { IoIosUndo } from "react-icons/io";
function Layout({ children }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { isMultiSelect, toggleMultiSelect, clearSelectedUsers } =
    useMultiSelect();

  return (
    <div className="h-screen">
      <header className="w-full px-8 py-6 border-b-2 flex items-center justify-between flex-row-reverse">
        <div className="flex items-center justify-start gap-12 text-2xl">
          {isMultiSelect ? (
            <>
              <button
                onClick={clearSelectedUsers}
                className="p-2 rounded-lg bg-red-100 transition-all duration-200 text-black focus:text-black hover:bg-red-100"
              >
                <GoTrash />
              </button>
              <button
                onClick={toggleMultiSelect}
                className="p-2 rounded-lg bg-yellow-100 transition-all duration-200 hover:text-black focus:text-black "
              >
                <IoIosUndo />
              </button>
            </>
          ) : (
            <button
              onClick={toggleMultiSelect}
              className="p-2 rounded-lg  transition-all duration-200 hover:text-black focus:text-black hover:bg-blue-100"
            >
              <BiSelectMultiple />
            </button>
          )}
        </div>
        <div className="flex items-center justify-start">
          <input
            type="text"
            className="w-96 h-12 border px-3 bg-gradient-to-bl from-blue-50 via-white to-white rounded-lg"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className="text-3xl -ml-10 text-slate-500" />
        </div>
        <div className="flex items-center justify-start gap-x-4">
          <img src={logo} alt="" className="w-12 h-12" />
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="w-full text-center text-sm pb-2">
        <p>Created With ❤️ By Sourena Ganji</p>
      </footer>
      <Toaster />
    </div>
  );
}

export default Layout;
