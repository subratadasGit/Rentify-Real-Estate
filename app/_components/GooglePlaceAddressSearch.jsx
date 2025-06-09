"use client";

import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const GooglePlaceAddressSearch = ({ selectedAddress, setCoordinates }) => {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 p-2 w-10 text-purple-700 bg-purple-200 rounded-l-sm" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full bg-purple-50",
          onChange: (place) => {
            console.log(place);
            selectedAddress(place);

            if (place && place.label) {
              geocodeByAddress(place.label)
                .then((result) => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  setCoordinates({ lat, lng });
                })
                .catch((error) => {
                  console.error("Geocoding error:", error);
                  setCoordinates(null);
                });
            } else {
              // Reset coordinates if no place is selected
              setCoordinates(null);
            }
          },
        }}
      />
    </div>
  );
};

export default GooglePlaceAddressSearch;
