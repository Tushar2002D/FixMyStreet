// src/components/Dashboard/UserDashboard.jsx
import React from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>Welcome, User!</h2>
      <p>Here you can view issues and report new ones.</p>

      <div className="actions">
        <a href="/issues">View My Issues</a>
        <a href="/report">Report New Issue</a>
      </div>
    </div>
  );
};

export default UserDashboard;
