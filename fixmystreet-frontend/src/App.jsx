// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AddIssue from "./components/Issues/AddIssue";
import IssueList from "./components/Issues/IssueList";
import AllIssues from "./components/Issues/AllIssues";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/report" element={<AddIssue />} />
      <Route path="/issues" element={<IssueList />} />
      <Route path="/admin/issues" element={<AllIssues />} />
    </Routes>
  );
};

export default App;
