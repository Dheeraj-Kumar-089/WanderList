import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
gsap.registerPlugin(ScrollTrigger);
import API from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currUser, setCurrUser } = useContext(AuthContext);
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useGSAP(() => {
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top -10",
        end: "top -100",
        scrub: true,
      },
      backgroundColor: "rgba(31, 41, 55, 0.6)",
      backdropFilter: "blur(15px)",
      height: "70px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
    });
  }, { scope: navRef });

  
  useGSAP(() => {
    if (isMenuOpen) {
     
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.6,
        ease: "expo.out",
      });

      
      gsap.fromTo(".sidebar-link",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 }
      );
    } else {
     
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);


  
  const handleLogout = async () => {
    try {
      await API.get("/auth/logout", { withCredentials: true });
      setCurrUser(null);
      setIsMenuOpen(false);
      toast.success("Logged out. See you soon!", { icon: '🚶' });
      navigate("/");
    } catch (e) {
      toast.error("Logout failed.");
    }
  };

  return (
    <>

      <nav ref={navRef} className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-sm py-3 h-20 transition-all duration-300 border-b-1 border-gray-300">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <Link to="/" className="text-brand text-3xl hover:scale-110 transition-all">
            <i className="fa-regular fa-compass"></i>
          </Link>

          
          <div className="hidden md:flex gap-6 font-semibold text-sm items-center">
            {currUser && currUser.role === "admin" && (
            <Link to="/admin" className="text-sm font-bold text-brand hover:underline">
              Admin Panel
            </Link>
          )}
            <Link to="/listings/new" className="text-gray-800 border transition-all duration-300 hover:translate-x-2 p-3 rounded-full hover:border hover:rounded-3xl hover:bg-orange-600 hover:text-white hover:shadow-black">Add New Destination</Link>
            {!currUser ? (
              <div className="flex gap-4">
                <Link to="/signup" state={{ from: location.pathname }}

                  className="text-white font-bold py-6 transition rounded-full shadow-lg shadow-gray-500 hover:scale-110 hover:shadow-blue-200 group relative inline-flex h-10 items-center text-sm justify-center overflow-hidden rounded bg-blue-600 hover:bg-blue-700 px-6"><span>Signup</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></Link>
                <Link to="/login"
                  state={{ from: location.pathname }}
                  className=" text-white font-bold py-6 transition rounded-full shadow-lg shadow-gray-500 hover:scale-110 hover:shadow-blue-200 group relative inline-flex h-10 items-center text-sm justify-center overflow-hidden rounded bg-blue-600 hover:bg-blue-700 px-6 "><span>Login</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></Link>

              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-gray-800 font-large uppercase mr-5">{currUser.username}</span>
                <button onClick={handleLogout} className="border border-gray-400 px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all cursor-pointer">Logout</button>
              </div>
            )}
          </div>

         
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-2xl text-gray-800 p-2 hover:bg-white/20 rounded-lg transition-all">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      
      <div
        ref={sidebarRef}
        className="fixed top-0 rounded-l-xl right-0 h-full w-[300px] bg-gray-900/50 backdrop-blur-2xl z-[100] translate-x-full md:hidden flex flex-col p-8 border-l border-white/10 shadow-[-20px_0_30px_rgba(0,0,0,0.3)]"
      >
      
        <button onClick={() => setIsMenuOpen(false)} className="self-end text-3xl text-white/70 hover:text-orange-500 mb-10 transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>

        
        <div className="flex flex-col gap-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}
            className="sidebar-link text-white text-xl font-bold p-3 hover:bg-white/10 hover:translate-x-5 transition-all duration-300 rounded hover:border hover:text-white hover:shadow-black">
            Home
          </Link>
          <Link to="/listings/new" onClick={() => setIsMenuOpen(false)}
            className="sidebar-link text-white text-xl font-bold p-3 hover:bg-white/10 hover:translate-x-5 transition-all duration-300 rounded hover:border hover:text-white hover:shadow-black">
            Add New Destination
          </Link>


          <div className="h-[1px] bg-white/10 my-4 sidebar-link"></div>

          {!currUser ? (
            <>
              <Link to="/signup" state={{ from: location.pathname }} onClick={() => setIsMenuOpen(false)}
                className="sidebar-link text-white/80 text-lg font-medium p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all">
                Signup
              </Link>
              <Link to="/login" state={{ from: location.pathname }} onClick={() => setIsMenuOpen(false)}
                className="sidebar-link text-white bg-orange-600 text-center py-4 rounded shadow-lg font-bold mt-4 hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all">
                Login
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-6 sidebar-link">
              <div>
              <i className="fa-solid fa-user text-orange-400"></i>
              <span className="text-orange-400 font-medium text-lg px-3 uppercase"><b>{currUser.username}</b></span>
              </div>
              {currUser && currUser.role === "admin" && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="bg-green-600/80 hover:bg-green-600 text-white py-4 rounded font-bold shadow-lg transition-all active:scale-95 text-center">
              Admin Panel
            </Link>
          )}
              <button onClick={handleLogout}
                className="bg-red-600/80 hover:bg-red-600 text-white py-4 rounded font-bold shadow-lg transition-all active:scale-95">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm md:hidden"></div>
      )}
    </>
  );
}