import axios from "axios";

const API = axios.create({ 
  
  baseURL: import.meta.env.MODE === "production" 
  ? "https://wanderlist-77wx.onrender.com/api" 
  : "http://localhost:8080/api",
  withCredentials: true, 

});

export default API;