/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllIssues.css";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchIssues = async (status = "") => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/issues${status ? `?status=${status}` : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIssues(res.data);
    } catch (err) {
      console.error("Error fetching issues:", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/issues/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status updated successfully");
      fetchIssues(filter); // Refresh list
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Reported Issues</h3>

      <div className="mb-4">
        <label htmlFor="filter" className="form-label me-2">
          Filter by Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => {
            const selected = e.target.value;
            setFilter(selected);
            fetchIssues(selected);
          }}
          className="form-select w-auto d-inline-block"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="row">
        {issues.length === 0 ? (
          <p>No issues found.</p>
        ) : (
          issues.map((issue) => (
            <div key={issue._id} className="col-md-6 mb-3">
              <div className="card">
                {issue.imageURL && (
                  <img
                    src={issue.imageURL}
                    alt="Issue"
                    className="card-img-top"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5>{issue.title}</h5>
                  <p>{issue.description}</p>
                  <p>
                    <strong>Category:</strong> {issue.category}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {issue.location?.address || "N/A"}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(issue.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3">
                    <label
                      htmlFor={`status-${issue._id}`}
                      className="form-label me-2"
                    >
                      Status:
                    </label>
                    <select
                      id={`status-${issue._id}`}
                      className="form-select w-auto d-inline-block"
                      value={issue.status}
                      onChange={(e) =>
                        handleStatusChange(issue._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllIssues;
