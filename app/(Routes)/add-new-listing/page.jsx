"use client";
import React, { useState } from "react";
import GooglePlaceAddressSearch from "@/app/_components/GooglePlaceAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import GradientText from "@/react-bits/GradientText/GradientText";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loader, setLoader] = useState(false)
  const router = useRouter();
  const [aadhaar, setAadhaar] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const nextHandler = async () => {
    setLoader(true);
    // Aadhaar and Property ID validation
    if (!aadhaar || !propertyId) {
      toast.error("Please enter both Aadhaar Card no and Property ID");
      setLoader(false);
      return;
    }
    // Check with govt_data table
    const { data: govtData, error: govtError } = await supabase
      .from("govt_data")
      .select("*")
      .eq("aadhaar", aadhaar)
      .eq("property_id", propertyId)
      .single();
    if (govtError || !govtData) {
      toast.error("Property is not registered");
      setLoader(false);
      return;
    }
    console.log("Selected Address:", selectedAddress);
    console.log("Coordinates:", coordinates);

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();

    if (data) {
     setLoader(false)
      console.log("New data added:", data);
      toast.success("New listing added successfully")
      router.replace('/edit-listing/'+data[0].id)
    }

    if (error) { setLoader(false)
      console.error("Error adding data:", error);
      toast.error(" Server Side Error adding data")
    }
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <GradientText className="text-center text-5xl font-bold mb-17">Add New Listing</GradientText>
        <div className="p-10 rounded-lg border-2 shadow-md flex flex-col gap-2">
          <h2 className="text-gray-400 flex items-center">
            Enter your Aadhaar Card no
          </h2>
          <Input
            type="text"
            placeholder="Enter your Aadhaar Card no"
            value={aadhaar}
            onChange={e => setAadhaar(e.target.value)}
            maxLength={12}
          />
          <h2 className="text-gray-400 flex items-center">
            Enter your Property ID
          </h2>
          <Input
            type="text"
            placeholder="Enter your Property ID"
            value={propertyId}
            onChange={e => setPropertyId(e.target.value)}
          />
          <h2 className="text-gray-400 flex items-center">
            Enter your address which you want to list
          </h2>
          <GooglePlaceAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-700 mt-3"
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          > {loader ? <Loader className=""/>:"Next"}
        
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
