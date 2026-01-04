import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
export default function Signup() {
  const location = useLocation();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding credentials...");
    try {
      await axios.post("http://localhost:8080/api/auth/signup", formData);
      const redirectUrl = location.state?.from || "/listings";
      navigate(redirectUrl);
      toast.dismiss(loadingToast);
      toast.success(`${res.data.user.username}! Added `, { icon: '👋' });
    } catch (err) {
      toast.dismiss(loadingToast);

      toast.error(err.response?.data?.error || "Server Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-8">Join Wanderlist</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label for="username">Username: </label>
        <input type="text" required className="border p-4 rounded outline-brand" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <label for="username">Email: </label>
        <input type="email" required className="border p-4 rounded outline-brand" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <label for="username">Pasword: </label>
        <input type="password" required className="border p-4 rounded outline-brand" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button className=" text-white font-bold py-6 transition shadow-lg shadow-gray-500 hover:scale-110 hover:shadow-green-200 group relative inline-flex h-10 items-center text-sm justify-center overflow-hidden rounded bg-gray-900 hover:bg-green-800 px-6 "><span>Create
          Account</span><div class="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>

      </form>
    </div>
  );
}