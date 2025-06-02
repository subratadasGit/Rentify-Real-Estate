import React, { forwardRef } from 'react';
import { Calendar, FileCheck } from "lucide-react";

const PropertyCertificate = forwardRef(({ property, currentDate }, ref) => {
    return (
        <div ref={ref} className="bg-white p-8" style={{ backgroundColor: '#ffffff' }}>
            <div className="p-6" style={{ border: '8px double #e5e7eb' }}>
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>Property Purchase Agreement</h2>
                    <p style={{ color: '#4B5563' }}>Digital Real Estate Contract</p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" style={{ color: '#6B7280' }} />
                        <span className="text-sm" style={{ color: '#6B7280' }}>Contract Date: {currentDate}</span>
                    </div>
                </div>

                {/* Property Image */}
                <div className="relative h-[300px] rounded-lg overflow-hidden mb-6" style={{ border: '4px solid #e5e7eb' }}>
                    {property.listingimages?.[0]?.url ? (
                        <img
                            src={property.listingimages[0].url}
                            alt="Property"
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#e5e7eb' }}>
                            <span style={{ color: '#6B7280' }}>No image available</span>
                        </div>
                    )}
                </div>

                {/* Contract Details */}
                <div className="space-y-6">
                    {/* Property Information */}
                    <div className="pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>Property Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Property ID:</p>
                                <p style={{ color: '#111827' }}>{property.id || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Property Type:</p>
                                <p style={{ color: '#111827' }}>{property.type || 'Residential'}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Address:</p>
                                <p style={{ color: '#111827' }}>{property.address}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Area:</p>
                                <p style={{ color: '#111827' }}>{property.area} sqft</p>
                            </div>
                        </div>
                    </div>

                    {/* Financial Details */}
                    <div className="pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>Financial Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Purchase Price:</p>
                                <p style={{ color: '#111827' }}>${property.price?.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>HOA Fees:</p>
                                <p style={{ color: '#111827' }}>${property.hoa || 0}/month</p>
                            </div>
                        </div>
                    </div>

                    {/* Property Features */}
                    <div className="pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>Property Features</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Bedrooms:</p>
                                <p style={{ color: '#111827' }}>{property.bedroom}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Bathrooms:</p>
                                <p style={{ color: '#111827' }}>{property.bathroom}</p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Parking:</p>
                                <p style={{ color: '#111827' }}>{property.parking || 0} spaces</p>
                            </div>
                        </div>
                    </div>

                    {/* Contract Parties */}
                    <div className="pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>Contract Parties</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Created By:</p>
                                <p style={{ color: '#111827' }}>{property.creator?.name}</p>
                                <p className="text-sm truncate" style={{ color: '#6B7280' }}>
                                    {property.creator?.wallet && `Wallet: ${property.creator.wallet.slice(0, 6)}...${property.creator.wallet.slice(-4)}`}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: '#374151' }}>Listed By:</p>
                                <p style={{ color: '#111827' }}>{property.listed_by || 'Real Estate Agency'}</p>
                                <p className="text-sm" style={{ color: '#6B7280' }}>Listing Date: {property.listing_date}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authentication Seal */}
                <div className="mt-8 text-center">
                    <div className="inline-block p-4" style={{ border: '4px solid #e5e7eb', borderRadius: '9999px' }}>
                        <FileCheck className="h-12 w-12 mx-auto" style={{ color: '#059669' }} />
                        <p className="text-sm font-semibold mt-2" style={{ color: '#111827' }}>Verified Property Contract</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

PropertyCertificate.displayName = 'PropertyCertificate';

export default PropertyCertificate; 