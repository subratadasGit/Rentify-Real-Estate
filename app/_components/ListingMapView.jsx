"use client";

import React, { useState, useEffect } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import GoogleMapUse from "./GoogleMapUse";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchdAddress, setSearchdAddress] = useState("");
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState("");
const  [coordinates, setCoordinates] = useState();
  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*, listingimages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
      console.log("All listings:", data);
    }

    if (error) {
      console.error("Error fetching latest listings:", error);
    }
  };

  const handleSearchClick = async () => {
    const searchterm =
      typeof searchdAddress === "string"
        ? searchdAddress
        : searchdAddress?.value?.structured_formatting?.main_text || "";

    let query = supabase
      .from("listing")
      .select(`*, listingimages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)

      .like("address", `%${searchterm}%`)
      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }
    const { data, error } = await query
    if (data) {
      setListing(data);
      console.log("Filtered listings:", data);
    }

    if (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchAddress={(v) => setSearchdAddress(v)}
          setBathCount={setBathCount}
          setBedroomCount={setBedCount}
          setHomeType={setHomeType}
          setParkingCount={setParkingCount}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="">
        {/* Replace this with your actual map implementation */}
       <GoogleMapUse
       coordinates={coordinates}
       />
      </div>
    </div>
  );
}

export default ListingMapView;
