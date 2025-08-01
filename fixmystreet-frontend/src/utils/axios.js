// src/utils/axios.js
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api/", // your backend
});
export default API; // ✅ THIS IS A DEFAULT EXPORT
export { API }; // <-- Named export for API
