import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ListingCard({ listing }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const wholeCardRef = useRef(null); 

  useGSAP(() => {
    
    gsap.fromTo(imgRef.current, 
      {
        scale: 0.1,
        opacity: 0,
        rotation: -10,
        borderRadius: "0px" 
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        borderRadius: "1rem", 
        duration: 2.0,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: cardRef });

  
  const handleMouseEnter = () => {
    gsap.to(wholeCardRef.current, {
      scale: 1.1,            
     
      boxShadow: "0 20px 25px -5px rgba(208, 0, 0, 0.87), 0 8px 10px -6px rgba(255, 104, 0, 0.8)",
      y: -5,                 
      duration: 0.05,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(wholeCardRef.current, {
      scale: 1,
      rotation: 0,
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", 
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <div ref={cardRef}>
      <Link 
        to={`/listings/${listing._id}`} 
        className="group block mb-6 outline-none"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >

        <div 
          ref={wholeCardRef} 
          className="flex flex-col bg-gray-200 rounded-2xl transition-all p-2"
          style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
        >
          
        
          <div className="w-full relative overflow-hidden rounded-xl h-80 bg-gray-100">
            <img
              ref={imgRef}
              src={listing.image?.url || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"} 
              className="h-full w-full object-cover" 
              loading="lazy"
              alt={listing.title} 
            />
          </div>

        
          <div className="mt-3 px-2 pb-2">
            <div className="text-gray-900 text-lg truncate font-bold">
              {listing.title}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              <span className="font-semibold text-black">
                ₹{listing.price?.toLocaleString("en-IN")}
              </span> 
            </div>
          </div>
          
        </div>
      </Link>
    </div>
  );
}