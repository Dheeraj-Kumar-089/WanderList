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

  // Entrance Animation (Jab card screen par aata hai)
  useGSAP(() => {
    gsap.fromTo(imgRef.current, 
      {
        scale: 0.8,
        opacity: 0,
        rotation: -5,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2, // Thoda fast kiya taaki user ko wait na karna pade
        ease: "back.out(1.7)", // Bounce effect ke liye
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: cardRef });


  const handleMouseEnter = () => {
   
    gsap.to(wholeCardRef.current, {
      scale: 1.1,
      duration: 0.08,
      overwrite: "auto"
    });

   
    gsap.to(imgRef.current, {
      scale: 1.15, 
      duration: 0.8,
      rotation: 1,
      ease: "power3.out",
      overwrite: "auto"
    });
  };


  const handleMouseLeave = () => {
   
    gsap.to(wholeCardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.1,
      ease: "circ.out",
      overwrite: "auto"
    });

  
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.8,
      rotation: 0,
      ease: "power3.out",
      overwrite: "auto"
    });
  };
  return (
    <div ref={cardRef}>
      <Link 
        to={`/listings/${listing._id}`} 
        className="group block mb-6 mt-6 outline-none"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={wholeCardRef} 
          className="flex flex-col bg-white rounded-2xl transition-all border border-gray-100"
        >
          <div className="w-full relative overflow-hidden rounded-xl rounded-b-none h-80 bg-gray-100">
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
              <span className="font-semibold text-rose-600">
                ₹{listing.price?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}