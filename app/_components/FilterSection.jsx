"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath, BedDouble, CarFront, Home } from "lucide-react";

function FilterSection({ setBathCount, setBedCount, setParkingCount, setHomeType }) {
  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-purple-800 mb-4">Filter Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Generic Select Field Generator */}
        {[
          {
            label: "Bedrooms",
            icon: <BedDouble className="h-4 w-4 text-purple-800 shrink-0" />,
            options: [2, 3, 4, 5],
            placeholder: "Select bedrooms",
            onValueChange: setBedCount,
            formatLabel: (count) => `${count}+ bedrooms`,
          },
          {
            label: "Bathrooms",
            icon: <Bath className="h-4 w-4 text-purple-800 shrink-0" />,
            options: [2, 3, 4, 5],
            placeholder: "Select bath",
            onValueChange: setBathCount,
            formatLabel: (count) => `${count}+ bathrooms`,
          },
          {
            label: "Parking",
            icon: <CarFront className="h-4 w-4 text-purple-800 shrink-0" />,
            options: [1, 2, 3],
            placeholder: "Select parking",
            onValueChange: setParkingCount,
            formatLabel: (count) => `${count}+ parking spots`,
          },
        ].map(({ label, icon, options, placeholder, onValueChange, formatLabel }, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-purple-700 mb-1">{label}</label>
            <Select onValueChange={onValueChange}>
              <SelectTrigger className="w-full bg-purple-50 border border-purple-300 text-purple-700 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500">
                <span className="flex items-center gap-4 truncate w-full">
                  {icon}
                  <SelectValue placeholder="Select" />
                </span>
              </SelectTrigger>

              <SelectContent className="bg-purple-50 text-purple-800">
                {options.map((count) => (
                  <SelectItem key={`${label}-${count}`} value={count.toString()}>
                    <div className="flex items-center gap-2">
                      {icon}
                      {formatLabel(count)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {/* Home Type Filter (handled separately due to different structure) */}
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">Property Type</label>
          <Select onValueChange={(value) => value === 'All' ? setHomeType(null) : setHomeType(value)}>
            <SelectTrigger className="w-full bg-purple-50 border border-purple-300 text-purple-700 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500">
              <span className="flex items-center gap-4 truncate w-full">
                <Home className="h-4 w-4 text-purple-800 shrink-0" />
                <SelectValue
                  placeholder="Select"
                />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-purple-50 text-purple-800">
              <SelectItem value="All">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-purple-800" />
                  All Property Types
                </div>
              </SelectItem>
              {['Single Family Home', 'Town House', 'Condo'].map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-purple-800" />
                    {type}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>


  );
}

export default FilterSection;