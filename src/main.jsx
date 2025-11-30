import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';

import Admin from "./pages/admin.jsx";
import Login from "./pages/login.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/data_context.jsx";

// Wrap everything in DataProvider and Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Router> 
        <AuthProvider>
        <DataProvider>
        <Routes>
          {/* <Route path="/" element={<App />} />          Default route */}
          <Route path="/" element={<Admin />} />     Admin route
          <Route path="/login" element={<Login/>} />        {/* Main app route */}
        </Routes>
         </DataProvider>
        </AuthProvider>   
      </Router>
    
  </React.StrictMode>
);
