import { useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:ml-25 lg:mr-25">
      {listings.map(l => (
        <ListingCard key={l._id} listing={l} />
      ))}
    </div>
  );
}