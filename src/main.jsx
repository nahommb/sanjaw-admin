import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';

import Admin from "./pages/admin.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Wrap everything in DataProvider and Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />          {/* Default route */}
          <Route path="/admin" element={<Admin />} />     Admin route
          <Route path="/login" element={<Login/>} />        {/* Main app route */}
        </Routes>
      </Router>
  </React.StrictMode>
);
