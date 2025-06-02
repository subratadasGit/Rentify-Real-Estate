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
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bedroom Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <Select onValueChange={setBedCount}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-primary" />
                <SelectValue placeholder="Select bedrooms" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4, 5].map((count) => (
                <SelectItem key={`bed-${count}`} value={count.toString()}>
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-primary" />
                    {count}+ bedrooms
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bathroom Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <Select onValueChange={setBathCount}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-primary" />
                <SelectValue placeholder="Select bath" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4, 5].map((count) => (
                <SelectItem key={`bath-${count}`} value={count.toString()}>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-primary" />
                    {count}+ bathrooms
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Parking Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
          <Select onValueChange={setParkingCount}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <CarFront className="h-4 w-4 text-primary" />
                <SelectValue placeholder="Select parking" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3].map((count) => (
                <SelectItem key={`parking-${count}`} value={count.toString()}>
                  <div className="flex items-center gap-2">
                    <CarFront className="h-4 w-4 text-primary" />
                    {count}+ parking spots
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Home Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <Select onValueChange={(value) => value === 'All' ? setHomeType(null) : setHomeType(value)}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                <SelectValue placeholder="Select type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  All Property Types
                </div>
              </SelectItem>
              {['Single Family Home', 'Town House', 'Condo'].map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
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