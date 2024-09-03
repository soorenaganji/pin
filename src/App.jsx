import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPage from "./components/templates/EditPage";
import HomePage from "./components/templates/HomePage";

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
