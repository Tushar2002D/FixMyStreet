// src/components/Issues/IssueList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IssueList.css";

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/issues/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="issue-list-container">
      <h3>My Reported Issues</h3>
      {issues.length === 0 ? (
        <p className="no-issues">No issues found.</p>
      ) : (
        <div className="issue-grid">
          {issues.map((issue) => (
            <div key={issue._id} className="issue-card">
              {issue.imageURL && (
                <img src={issue.imageURL} alt="Issue" className="issue-image" />
              )}
              <div className="issue-content">
                <h5>{issue.title}</h5>
                <p>{issue.description}</p>
                <p>
                  <strong>Status:</strong> {issue.status}
                </p>
                <p>
                  <strong>Location:</strong> {issue.location?.address || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;
