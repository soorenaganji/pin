import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Modal from "./components/modules/FormModal";
import { useSearch } from "./context/SearchContext";
import EditPage from "./components/templates/EditPage";
import HomePage from "./components/templates/HomePage";
import { getData, updateData } from "./api/api";

const App = () => {
  return (
    <div className=" p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:userEmail" element={<EditPage />} />
      </Routes>
    </div>
  );
};

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
