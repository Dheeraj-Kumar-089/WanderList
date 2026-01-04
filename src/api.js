import axios from "axios";

const API = axios.create({
  // Render par deploy karne ke baad jo URL mila, use yahan dalein
  baseURL: "https://wanderlist-77wx.onrender.com/", 
  withCredentials: true, // Cookies (Passport sessions) ke liye ye sabse zaroori hai
});

export default API;