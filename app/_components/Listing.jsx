import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler, Search, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import GooglePlaceAddressSearch from "./GooglePlaceAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import PropertyDetails from "./PropertyDetails";
import { toast } from 'sonner';

function Listing({ listing, handleSearchClick, setBathCount, setBedCount, setHomeType, setParkingCount, searchAddress, setCoordinates }) {
  const [address, setAddress] = useState();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <div className="p-3 flex gap-3">
        <GooglePlaceAddressSearch  
          selectedAddress={(v)=>{searchAddress(v)
            setAddress(v)    
          }}
          setCoordinates={setCoordinates}/>
        <div>
          <Button className="flex gap-2 bg-purple-300 text-purple-900"
            onClick={handleSearchClick}
          ><Search className="h-4 w-4" /> Search</Button>
        </div>
      </div>
      <FilterSection
        setBathCount={setBathCount}
        setBedroomCount={setBedCount}
        setHomeType={setHomeType}
        setParkingCount={setParkingCount}
      />
      {address && <div className="px-3 my-5">
        Found <span className="font-bold"> {listing?.length} </span> Result in <span className=" font-bold text-primary">{address?.label}</span>
      </div>}
      
      <div className="grid grid-cols-5 grid-rows-5 gap-2">
        {listing.map((Item, index) => {
          const imageUrl = Item.listingimages?.[0]?.url;
          return (
            <div
              key={index}
              className="col-span-2 p-3 hover:border hover:border-primary cursor-pointer rounded-lg relative"
            >
              {/* Minted badge */}
              {Item.minted && (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    background: '#059669',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    zIndex: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  Minted Property
                </div>
              )}
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="listing image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="flex mt-2 flex-col justify-between gap-2">
                <h2 className="font-bold text-xl ">${Item?.price}</h2>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 flex-shrink-0" /> {Item.address}
                </h2>
                <div className="flex gap-2 mt-2">
                  <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 w-full items-center justify-center">
                    <Bath className="h-4 w-4" /> {Item.bathroom}
                  </h2>
                  <h2 className="flex gap-2 text-sm bg-slate-200 w-full rounded-md p-2 text-gray-500 items-center justify-center">
                    <BedDouble className="h-4 w-4" /> {Item.bedroom}
                  </h2>
                  <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500  w-full items-center justify-center">
                    <Ruler className="h-4 w-4" /> {Item.area}
                  </h2>
                </div>
                <Button 
                  className="w-full mt-2 flex gap-2"
                  variant="outline"
                  onClick={async () => {
                    // Fetch the latest minted status from Supabase
                    const { data, error } = await supabase
                      .from('listing')
                      .select('minted')
                      .eq('id', Item.id)
                      .single();
                    if (error) {
                      toast.error('Error checking minted status. Please try again.');
                      return;
                    }
                    if (data?.minted) {
                      toast('This property is already minted.', {
                        description: 'You cannot view or edit details of a minted property.',
                        style: { background: '#059669', color: 'white', fontWeight: 600 },
                        duration: 3500,
                      });
                      return;
                    }
                    setSelectedProperty(Item);
                    setShowDetails(true);
                  }}
                >
                  <Eye className="h-4 w-4" /> View Details
                </Button>
                {/* Show owner address if minted */}
                {Item.minted && Item.owner_address && (
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.95rem',
                    color: '#059669',
                    fontWeight: 600,
                    wordBreak: 'break-all',
                    background: '#e6f9f0',
                    borderRadius: '0.4rem',
                    padding: '0.25rem 0.5rem',
                    textAlign: 'center',
                  }}>
                    Minted by: {Item.owner_address}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showDetails && selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => {
            setShowDetails(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
}

export default Listing;