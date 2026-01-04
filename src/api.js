import axios from "axios";

const API = axios.create({

  baseURL: "https://wanderlist-77wx.onrender.com/api/listings", 
  withCredentials: true, 
});

export default API;