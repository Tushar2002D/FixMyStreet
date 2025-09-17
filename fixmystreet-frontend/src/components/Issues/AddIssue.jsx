// src/components/Issues/AddIssue.jsx
import React, { useState } from "react";
import axios from "axios";
import "./AddIssue.css";

const AddIssue = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "other",
    image: null,
    location: {
      lat: "",
      lng: "",
      address: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["lat", "lng", "address"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first.");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);
    formData.append("location", JSON.stringify(form.location));

    try {
      const res = await axios.post(
        "https://fixmystreet-1.onrender.com/api/issues",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Issue reported!");
      console.log(res.data);
    } catch (err) {
      console.error(
        "Error reporting issue:",
        err.response?.data || err.message
      );
      alert("Failed to report issue");
    }
  };

  return (
    <div className="add-issue-container">
      <form className="issue-form" onSubmit={handleSubmit}>
        <h2>Report a New Issue</h2>

        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="garbage">Garbage</option>
          <option value="road">Road</option>
          <option value="water">Water</option>
          <option value="electricity">Electricity</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.location.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={form.location.lat}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={form.location.lng}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
};

export default AddIssue;
