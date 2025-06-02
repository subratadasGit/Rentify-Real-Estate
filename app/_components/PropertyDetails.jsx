import React, { useState, useRef, useEffect } from 'react';
//import Image from 'next/image';
import { Bath, BedDouble, MapPin, Ruler, X, User, FileCheck, Calendar, Globe, Download, LogIn, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';
import { supabase } from "@/utils/supabase/client";
import { useAuth } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import PropertyCertificate from './PropertyCertificate';
import { ethers } from "ethers";

//Smart Contract ABI and Address
const contractAddress = '0x0b8dae92bf6d2e4048088904d0bce31ca0ed7cd7';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSaleRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct CustomNFT.SaleRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sales",
		"outputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let imageIPFSUrl = '';

//pinata JWT token
const pinataJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmODhiZGU3Ny04MDk0LTQyY2ItOTFjZC1iM2FlNTNhMjkyNGYiLCJlbWFpbCI6ImRhc2hyaWRheTY3M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWNiOTgwNWExYmEwYWNkNzU5ZmMiLCJzY29wZWRLZXlTZWNyZXQiOiJiMzc4NzJmMjc0NzIzODZlOTllYzA3MzAzZDhhNWM4ZWIyNWU1YTg4MTM3ZDFmMmFjMjdhOGQzYTYyMTMyOWE3IiwiZXhwIjoxNzc5NjM0NTc1fQ.dvuAEnn7cTWJBciOq_HJzEWEAKuiMtQaxRad6wlveHs';

const PropertyDetails = ({ property, onClose, onEdit }) => {
    const { isLoaded, userId, isSignedIn } = useAuth();
    const [isMinting, setIsMinting] = useState(false);
    const [mintingComplete, setMintingComplete] = useState(false);
    const [nftImage, setNftImage] = useState(null);
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(null);
    const certificateRef = useRef(null);
    const imageRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageGenerated, setImageGenerated] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);

    // Format date consistently
    const formatDate = (date) => {
        if (!date) return '';
        try {
            return new Date(date).toISOString().split('T')[0];
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const currentFormattedDate = formatDate(new Date());

    useEffect(() => {
        if (property?.id) {
            fetchPropertyDetails();
        } else {
            setPropertyDetails(property);
            setIsLoading(false);
        }
    }, [property]);

    const fetchPropertyDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Basic validation
            if (!property?.id) {
                throw new Error('Property ID is required');
            }

            // Fetch property data with listing images
            const { data: propertyData, error: propertyError } = await supabase
                .from('listing')
                .select(`
                    *,
                    listingimages (
                        url
                    )
                `)
                .eq('id', property.id)
                .single();

            if (propertyError) {
                console.error('Error fetching property:', propertyError);
                setPropertyDetails({
                    ...property,
                    coordinates: { lat: 'N/A', lng: 'N/A' },
                    creator: {
                        name: property.createdBy || 'Unknown Creator'
                    }
                });
                return;
            }

            // Parse coordinates from the JSON field
            let coordinates = { lat: 'N/A', lng: 'N/A' };
            try {
                if (propertyData.coordinates) {
                    // Handle both string and object formats
                    const coordData = typeof propertyData.coordinates === 'string' 
                        ? JSON.parse(propertyData.coordinates)
                        : propertyData.coordinates;
                    
                    // Extract lat/lng from the coordinates object
                    coordinates = {
                        lat: coordData.lat || coordData.latitude || 'N/A',
                        lng: coordData.lng || coordData.longitude || 'N/A'
                    };

                    // Format coordinates to 6 decimal places if they are numbers
                    if (typeof coordinates.lat === 'number') {
                        coordinates.lat = coordinates.lat.toFixed(6);
                    }
                    if (typeof coordinates.lng === 'number') {
                        coordinates.lng = coordinates.lng.toFixed(6);
                    }
                }
            } catch (e) {
                console.error('Error parsing coordinates:', e);
            }

            // Combine all the data
            const combinedData = {
                ...propertyData,
                ...property,
                coordinates,
                creator: {
                    name: propertyData?.createdBy || 'Unknown Creator'
                },
                type: propertyData?.type || 'Residential',
                propertyType: propertyData?.propertyType,
                bedroom: propertyData?.bedroom || 0,
                bathroom: propertyData?.bathroom || 0,
                builtin: propertyData?.builtin || 0,
                parking: propertyData?.parking || 0,
                lotsize: propertyData?.lotsize || 0,
                area: propertyData?.area || 0,
                price: propertyData?.price || 0,
                hoa: propertyData?.hoa || 0,
                description: propertyData?.description || '',
                fullName: propertyData?.fullName,
                profileImage: propertyData?.profileImage,
                listing_date: formatDate(propertyData?.created_at) || currentFormattedDate
            };

            console.log('Property Details:', combinedData); // Debug log
            setPropertyDetails(combinedData);

        } catch (error) {
            console.error('Detailed error:', error);
            setError('Failed to load property details. Please try again.');
            setPropertyDetails({
                ...property,
                coordinates: { lat: 'N/A', lng: 'N/A' },
                creator: {
                    name: property.createdBy || 'Unknown Creator'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const generateNFTImage = async () => {
        try {
            setIsGenerating(true);
            setShowCertificate(true);
            
            // Wait for the certificate to be rendered
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!certificateRef.current) {
                throw new Error('Certificate reference not found');
            }

            // Force any images to be fully loaded
            const images = certificateRef.current.getElementsByTagName('img');
            if (images.length > 0) {
                await Promise.all(
                    Array.from(images).map(
                        img => 
                            img.complete || 
                            new Promise((resolve, reject) => {
                                img.onload = resolve;
                                img.onerror = reject;
                                // Set a timeout to prevent hanging
                                setTimeout(reject, 5000);
                            }).catch(() => {
                                console.warn('Image load timed out or failed:', img.src);
                                return Promise.resolve(); // Continue anyway
                            })
                    )
                );
            }

            const canvas = await html2canvas(certificateRef.current, {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 5000,
                removeContainer: false,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.querySelector('[data-certificate]');
                    if (clonedElement) {
                        // Ensure all styles are computed and applied
                        const styles = window.getComputedStyle(certificateRef.current);
                        Object.values(styles).forEach(key => {
                            clonedElement.style[key] = styles[key];
                        });
                    }
                }
            });

            const image = canvas.toDataURL("image/png", 1.0);
            setNftImage(image);
            setImageGenerated(true);
            return image;
        } catch (error) {
            console.error('Error in generateNFTImage:', error);
            alert('Failed to generate image. Please try again.');
            setShowCertificate(false);
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    const handleMintNFT = async () => {
        try {
            setIsMinting(true);
            if (!nftImage) {
                throw new Error('No image generated');
            }

            //Converting image to blob
            const blob = await (await fetch(nftImage)).blob();
            const file = new File([blob], "nft-certificate.png", { type: "image/png" });

            //Uploading image to Pinata
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${pinataJwtToken}` // Replace with your JWT token
                    },
                    body : formData
                });
                
                const data = await res.json();
                imageIPFSUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
            }
            catch (err) {
                console.error("Error uploading image to Pinata:", err);
                return;
            }

            //NFT minting logic
            if (!imageIPFSUrl) {
                return;
            }
			const metadata = {
				name: propertyDetails.fullName,
				description: propertyDetails.description,
				image: imageIPFSUrl
			};
			const metadataRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
				method: "POST",
				headers: {
				  'Content-Type': 'application/json',
				  'Authorization': `Bearer ${pinataJwtToken}` // Use JWT or API keys
				},
				body: JSON.stringify(metadata)
			  });

			const metadataData = await metadataRes.json();
			const tokenURI = `https://gateway.pinata.cloud/ipfs/${metadataData.IpfsHash}`;
            try {
                if (!window.ethereum) throw new Error("MetaMask not found");

                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
                const address = await signer.getAddress();
                const tx = await nftContract.mintNFT(address, tokenURI);
                await tx.wait();
                var mintedAddress = address;
            } catch (err) {
                console.error(err);
            }

            // Update Supabase record as minted
            try {
                if (propertyDetails?.id) {
                    const { error } = await supabase
                        .from('listing')
                        .update({ minted: true, nft_url: imageIPFSUrl, owner_address: mintedAddress })
                        .eq('id', propertyDetails.id);
                    if (error) {
                        console.error('Error updating minted status in Supabase:', error);
                    } else {
                        setPropertyDetails(prev => ({ ...prev, minted: true, nft_url: imageIPFSUrl, owner_address: mintedAddress }));
                    }
                }
            } catch (err) {
                console.error('Error updating minted status in Supabase:', err);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            setMintingComplete(true);
        } catch (error) {
            console.error('Error in handleMintNFT:', error);
            alert('Failed to mint NFT. Please try again.');
        } finally {
            setIsMinting(false);
        }
    };

    const downloadImage = () => {
        if (nftImage) {
            const link = document.createElement('a');
            link.href = nftImage;
            link.download = `property-contract-${property.id || 'image'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Helper: check if current user is the creator
    const isOwner = userId && propertyDetails && (
        propertyDetails.creator?.id === userId || propertyDetails.createdBy === userId
    );

    // Helper: check if property is minted (both owner_address and minted must be truthy)
    const isMinted = !!propertyDetails && !!propertyDetails.owner_address && propertyDetails.minted === true;

    if (isLoading) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50
            }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.5rem',
                    padding: '2rem'
                }}>
                    <p>Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50
            }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.5rem',
                    padding: '2rem'
                }}>
                    <p style={{ color: '#dc2626' }}>Error: {error}</p>
                    <button
                        onClick={onClose}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '0.5rem'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                padding: '2rem',
                maxWidth: '56rem',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                {/* Edit Button (only for owner) */}
                {isOwner && (
                    <button
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '3.5rem',
                            padding: '0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#f3f4f6',
                            cursor: 'pointer',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                        onClick={() => {
                            if (onEdit) {
                                onEdit(propertyDetails);
                            } else {
                                window.location.href = `/edit-property/${propertyDetails.id}`;
                            }
                        }}
                        title="Edit Property"
                    >
                        <Pencil style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
                    </button>
                )}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.5rem',
                        borderRadius: '9999px',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                >
                    <X style={{ width: '1.5rem', height: '1.5rem' }} />
                </button>

                {/* Display original property details when not generating certificate */}
                {!showCertificate && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#111827'
                            }}>Property Details</h2>
                            <p style={{ color: '#4B5563' }}>Review the details before generating the contract</p>
                        </div>

                        {/* Property Image */}
                        <div style={{
                            position: 'relative',
                            height: '300px',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            marginBottom: '1.5rem'
                        }}>
                            {propertyDetails?.listingimages?.[0]?.url ? (
                                <img
                                    src={propertyDetails.listingimages[0].url}
                                    alt="Property"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ color: '#6B7280' }}>No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Basic Property Information */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem'
                        }}>
                            <div>
                                <h3 style={{
                                    fontWeight: '600',
                                    color: '#111827'
                                }}>Location</h3>
                                <p style={{ color: '#4B5563' }}>{propertyDetails?.address}</p>
                            </div>
                            <div>
                                <h3 style={{
                                    fontWeight: '600',
                                    color: '#111827'
                                }}>Price</h3>
                                <p style={{ color: '#4B5563' }}>${propertyDetails?.price?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Certificate Container */}
                <div style={{ display: showCertificate ? 'block' : 'none' }}>
                    <PropertyCertificate
                        ref={certificateRef}
                        property={propertyDetails}
                        currentDate={currentFormattedDate}
                    />
                </div>

                {/* Controls Section */}
                <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {!imageGenerated ? (
                        isSignedIn ? (
                            <button
                                style={{
                                    width: '66.666667%',
                                    padding: '1.5rem',
                                    fontSize: '1.125rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    color: '#ffffff',
                                    backgroundColor: isGenerating ? '#9CA3AF' : '#2563EB',
                                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                                }}
                                onClick={generateNFTImage}
                                disabled={isGenerating}
                                onMouseEnter={e => !isGenerating && (e.target.style.backgroundColor = '#1D4ED8')}
                                onMouseLeave={e => !isGenerating && (e.target.style.backgroundColor = '#2563EB')}
                            >
                                {isGenerating ? 'Generating Contract...' : 'Generate Property Contract'}
                            </button>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{
                                    color: '#4B5563',
                                    marginBottom: '1rem'
                                }}>Please sign in to generate property contract</p>
                                <SignInButton mode="modal">
                                    <button
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            color: '#ffffff',
                                            backgroundColor: '#2563EB',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={e => e.target.style.backgroundColor = '#1D4ED8'}
                                        onMouseLeave={e => e.target.style.backgroundColor = '#2563EB'}
                                    >
                                        <LogIn style={{ width: '1.25rem', height: '1.25rem' }} />
                                        Sign In to Continue
                                    </button>
                                </SignInButton>
                            </div>
                        )
                    ) : (
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{
                                    color: '#059669',
                                    marginBottom: '0.5rem'
                                }}>✓ Contract Generated Successfully</p>
                                <img 
                                    src={nftImage} 
                                    alt="Generated Contract Preview" 
                                    style={{
                                        maxWidth: '28rem',
                                        margin: '0 auto',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        maxHeight: '200px'
                                    }}
                                />
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                width: '66.666667%'
                            }}>
                                <button
                                    style={{
                                        flex: 1,
                                        padding: '1rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: '600',
                                        color: '#ffffff',
                                        backgroundColor: '#059669',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={downloadImage}
                                    onMouseEnter={e => e.target.style.backgroundColor = '#047857'}
                                    onMouseLeave={e => e.target.style.backgroundColor = '#059669'}
                                >
                                    <Download style={{ width: '1.25rem', height: '1.25rem' }} />
                                    Download Contract
                                </button>
                                
                                {!isMinted && (
                                    <button
                                        style={{
                                            flex: 1,
                                            padding: '1rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            color: '#ffffff',
                                            backgroundColor: isMinting || mintingComplete ? '#9CA3AF' : '#2563EB',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            cursor: isMinting || mintingComplete ? 'not-allowed' : 'pointer'
                                        }}
                                        onClick={handleMintNFT}
                                        disabled={isMinting || mintingComplete}
                                        onMouseEnter={e => !isMinting && !mintingComplete && (e.target.style.backgroundColor = '#1D4ED8')}
                                        onMouseLeave={e => !isMinting && !mintingComplete && (e.target.style.backgroundColor = '#2563EB')}
                                    >
                                        {isMinting
                                            ? 'Minting NFT...'
                                            : isMinted
                                                ? 'NFT Minted!'
                                                : 'Mint as NFT'
                                        }
                                    </button>
                                )}
                            </div>
                            
                            {isMinted && (
                                <div>
                                    <p>NFT minted to: {propertyDetails.owner_address}</p>
                                    <a href={propertyDetails.nft_url} target="_blank">View NFT Metadata</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails; 