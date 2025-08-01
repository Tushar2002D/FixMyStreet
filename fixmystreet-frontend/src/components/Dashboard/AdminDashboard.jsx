import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin!</h2>
      <p>Here you can view and manage all reported issues.</p>

      <div className="actions">
        <a href="/admin/issues">View All Issues</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
