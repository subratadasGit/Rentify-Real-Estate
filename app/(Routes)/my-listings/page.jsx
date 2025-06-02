"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Listing from "@/app/_components/Listing";

export default function MyListingPage() {
  const { user, isSignedIn } = useUser();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const fetchMyListings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("listing")
        .select("*, listingimages(url, listing_id)")
        .eq("createdBy", user.primaryEmailAddress.emailAddress)
        .order("id", { ascending: false });
      console.log("Fetched listings:", data, "Error:", error, "UserId:", user.primaryEmailAddress.emailAddress);
      setMyListings(data || []);
      setLoading(false);
    };
    fetchMyListings();
  }, [user]);

  if (!isSignedIn) {
    return <div className="text-center py-10 text-lg text-gray-600">Please sign in to view your listings.</div>;
  }
  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-600">Loading your listings...</div>;
  }
  if (!myListings.length) {
    return <div className="text-center py-10 text-lg text-gray-600">You have not listed any properties yet.</div>;
  }
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">My Listings</h2>
      <Listing listing={myListings} />
    </div>
  );
} 