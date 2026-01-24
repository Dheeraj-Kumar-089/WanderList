import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../index.css";
import { AuthContext } from "../context/AuthContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import toast from "react-hot-toast";
import API from "../api";

gsap.registerPlugin(ScrollTrigger); 

import Map from "../components/Map";


export default function ShowListing() {


  const { currUser } = useContext(AuthContext);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const navigate = useNavigate();

  const containerRef = useRef(null);

  const fetchListing = async () => {
    try {
      const res = await API.get(`/listings/${id}`);
      setListing(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = () => {
  
    if (!currUser) {
      toast.error("You must be logged in to edit!");
      return;
    }

    
    if (!listing.owner || listing.owner._id !== currUser._id) {
       toast.error("You are not the owner of this. You don't have permission to edit this!", {
         icon: '🚫',
         style: {
           borderRadius: '10px',
           background: '#333',
           color: '#fff',
         },
       });
       return; 
    }

    navigate(`/listings/${id}/edit`);
  };


  const handleDelete = async () => {
  
    if (!currUser || (listing.owner._id !== currUser._id)) {
        toast.error("You are not the owner of this. You don't have permission to delete this!", { icon: '🚫' });
        return;
    }

    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/listings/${id}`, {
        withCredentials: true
      });
      toast.success("Listing deleted successfully");
      navigate("/listings");
    } catch (err) {
      toast.error("Error deleting listing");
    }
  };

  useEffect(() => {
    API.get(`listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => console.error(err));
  }, [id]);


  useGSAP(() => {
  if (!listing || !containerRef.current) return;

  let ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.5 }
    });

    
    tl.to(".animate-on-load", {
      y: 0,               
      opacity: 1,
      stagger: 0.2,
      force3D: true,
      overwrite: "auto",  
    });

   
    if (listing.reviews && listing.reviews.length > 0) {
      
      gsap.set(".review-card", { opacity: 0, y: 30, scale: 0.98 });

      gsap.to(".review-card", {
        scrollTrigger: {
          trigger: ".review-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.2)",
        overwrite: "auto"
      });
    }
  }, containerRef);

  return () => ctx.revert(); 
}, [listing]);



  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting your review...");

    try {
      const res = await API.post(`/listings/${id}/reviews`, { review: reviewForm }, {
        withCredentials: true
      });

      toast.dismiss(loadingToast);

      if (res.data.message) {
            toast.success(res.data.message, {
        icon: '🚀',
        duration: 4000}); 
        }
        setReviewForm({ rating: 0, comment: "" }); // 
      fetchListing();
      
    } catch (err) {
      alert("Error adding review. Please login.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await API.delete(`/listings/${id}/reviews/${reviewId}`, {
        withCredentials: true
      });
      window.location.reload();
    } catch (err) {
      alert("Cannot delete review");
    }
  };

  if (!listing) {
    return(<div className="flex justify-center items-center h-screen text-3xl font-mono">Loading...   &nbsp;
      
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>);
  }


  return (
    <div className="max-w-3xl mx-auto px-5 my-5" ref={containerRef}>
      <h1 className="text-3xl font-bold mb-6 text-gray-900  animate-on-load">{listing.title}</h1>
      <div className="animate-on-load"> 
      <img
        src={listing.image?.url || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"}
        className="w-full rounded-2xl mb-2 shadow-2xl h-[350px] object-cover"
        alt="listing"
      />
      </div>

      <div className="p-2 mb-10 animate-on-load">
        <p className="text-gray-500 italic mb-4 font-medium">Owner: {listing.owner?.username || "Admin"}</p>
        <p className="text-xsm mb-5 leading-relaxed text-gray-800">{listing.description}</p>
        <div className="">
          <p className="text-2xl font-bold text-gray-900 mb-2">₹{listing.price?.toLocaleString("en-IN")}</p>
          <p className="text-gray-600 text-lg"><i className="fa-solid fa-location-dot mr-2"></i>{listing.location}, {listing.country}</p>
        </div>

        
        {currUser && (
          <div className="flex gap-4 mt-6">

            <button 
                onClick={handleEdit} 
                className="bg-gray-900 text-white px-6 py-2 flex items-center justify-center rounded font-bold hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer"
            >
                Edit
            </button>

            <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white px-6 py-2 rounded font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer"
            >
                Delete
            </button>
            
          </div>
        )}
      </div>
        
      <div className="pt-10 border-t-1 border-gray-400">

        {currUser && (


          <form onSubmit={handleReviewSubmit} className="mb-10 bg-gray-50">
            <h4 className="font-bold text-2xl mb-4">Leave a Review</h4>
            <div>
              <label className="block text-sm font-bold mb-2">Rating: </label>
           
              <fieldset className="starability-slot">
                <input
                  type="radio" id="no-rate" className="input-no-rate" name="rating" value="1"
                  checked={reviewForm.rating === 0} onChange={() => { }} aria-label="No rating."
                />
                <input type="radio" id="rate1" name="rating" value="1" checked={reviewForm.rating === 1} onChange={() => setReviewForm({ ...reviewForm, rating: 1 })} />
                <label htmlFor="rate1" title="Terrible">1 star</label>
                <input type="radio" id="rate2" name="rating" value="2" checked={reviewForm.rating === 2} onChange={() => setReviewForm({ ...reviewForm, rating: 2 })} />
                <label htmlFor="rate2" title="Not good">2 stars</label>
                <input type="radio" id="rate3" name="rating" value="3" checked={reviewForm.rating === 3} onChange={() => setReviewForm({ ...reviewForm, rating: 3 })} />
                <label htmlFor="rate3" title="Average">3 stars</label>
                <input type="radio" id="rate4" name="rating" value="4" checked={reviewForm.rating === 4} onChange={() => setReviewForm({ ...reviewForm, rating: 4 })} />
                <label htmlFor="rate4" title="Very good">4 stars</label>
                <input type="radio" id="rate5" name="rating" value="5" checked={reviewForm.rating === 5} onChange={() => setReviewForm({ ...reviewForm, rating: 5 })} />
                <label htmlFor="rate5" title="Amazing">5 stars</label>
              </fieldset>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Comment:</label>
              <textarea
                required
                className="w-full border p-3 rounded"
                rows="3"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              ></textarea>
            </div>
            <button className="group relative inline-flex h-10 items-center text-sm justify-center overflow-hidden rounded bg-gray-900 hover:bg-green-800 px-6 font-bold text-white hover:scale-110"><span>Submit Review</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
            
          </form>
        )}

        {listing.reviews && listing.reviews.length > 0 ? (
          <div className="review-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <h3 className="text-2xl font-bold col-span-full animate-on-load">All Reviews
                <br />
              </h3>
              {listing.reviews.map((r) => (
                <div key={r._id} className="review-card p-4 rounded shadow-sm border-1 border-gray-400 relative">
                  <div className="flex flex-col justify-between items-start mb-3">
                    <p className="font-bold text-gray-900">@{r.author?.username || "Guest"}</p>
                    <p className="starability-result scale-30 origin-left" data-rating={r.rating}>
                      Rated: {r.rating} stars
                    </p>
                    <p className="text-gray-700 italic">{r.comment}</p>
                  </div>

                  {currUser && r.author && currUser._id === r.author._id && (
                    <div className="flex mt-4">

                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className="relative border-1 rounded  bg-gray-800 py-1.5 px-2 font-md text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-red-700 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:before:scale-x-100 hover:scale-110 overflow-hidden"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>

      <div className="pt-2">
        <Map listing={listing} />
      </div>


    </div>
  );
}