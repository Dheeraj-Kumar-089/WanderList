import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ShowListing from "./pages/ShowListing";
import NewListing from "./pages/NewListing";
import EditListing from "./pages/EditListing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute"; 
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from 'react-hot-toast';

export default function App() {

  const isNotFound = !["/", "/listings", "/signup", "/login"].includes(location.pathname) && 
                     !location.pathname.startsWith("/listings/");
  

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px'
          }
        }}
      />
      <div className="flex flex-col min-h-screen">
        
        {!isNotFound && <Navbar />}
        <main className="container mx-auto px-4 py-8 flex-grow pt-25">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Home />} />
    
            <Route path="/listings/:id" element={<ShowListing />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/listings/new" element={
              <ProtectedRoute>
                <NewListing />
              </ProtectedRoute>
            } />
            
            <Route path="/listings/:id/edit" element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            } />

        
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isNotFound && <Footer />}
      </div>
    </BrowserRouter>
  );
}