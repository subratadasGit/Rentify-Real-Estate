import { Button } from "@/components/ui/button";
import Image from "next/image";
import ListingMapView from "./_components/ListingMapView";
import { Home, ShieldCheck, Sparkles, Globe, ArrowRight, Users, Facebook, Twitter, Instagram } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Explore Properties Map Section (Top) */}
      <section className="pt-10 pb-6 px-2 md:px-0">
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4 text-center drop-shadow">Explore Properties</h2>
          <div className="rounded-3xl shadow-xl border-4 border-purple-400 overflow-hidden bg-white">
            <ListingMapView type="Sell" />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 px-4 md:px-0">
        <Image
          src="/hero-realestate.jpg"
          alt="Rentify Hero"
          fill
          className="object-cover object-center absolute inset-0 w-full h-full opacity-30 -z-10"
          priority
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-900 mb-4 drop-shadow-lg tracking-tight">
          Welcome to <span className="text-blue-600">Rentify</span>
        </h1>
        <p className="text-xl md:text-2xl text-cyan-800 mb-8 max-w-2xl mx-auto drop-shadow">
          The next generation Property marketplace. List, verify, and mint your property as a blockchain NFT.
        </p>
        <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Home className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Easy Listing</h3>
            <p className="text-gray-600">List your property in minutes with our intuitive interface.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Verified Ownership</h3>
            <p className="text-gray-600">All listings are verified and secured on the blockchain.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">NFT Minting</h3>
            <p className="text-gray-600">Mint your property as a unique NFT and transfer ownership seamlessly.</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-cyan-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Agent Finder</h3>
            <p className="text-gray-600">Connect with trusted agents to help you rent or manage your property.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-900 mb-4">How Rentify Works</h2>
          <p className="text-lg text-cyan-800">A simple, secure process for property owners and renters.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Globe className="h-10 w-10 text-blue-500 mb-2" />
            <span className="font-semibold">1. List Property</span>
            <p className="text-gray-500 text-sm">Create your listing and add property details.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-10 w-10 text-green-500 mb-2" />
            <span className="font-semibold">2. Verify</span>
            <p className="text-gray-500 text-sm">We verify your ownership and property details.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-yellow-400 mb-2" />
            <span className="font-semibold">3. Mint NFT</span>
            <p className="text-gray-500 text-sm">Mint your property as a blockchain NFT.</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="h-10 w-10 text-blue-700 mb-2" />
            <span className="font-semibold">4. Rent or Transfer</span>
            <p className="text-gray-500 text-sm">Easily rent or transfer ownership to anyone, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-extrabold tracking-tight">Rentify</span>
            </div>
            <p className="text-cyan-100 mb-4 max-w-xs">Empowering the next generation of property owners and renters with blockchain technology.</p>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-blue-300"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300"><Twitter className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-300"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-semibold mb-2">Navigation</span>
            <a href="/" className="hover:underline hover:text-cyan-200">Home</a>
            <a href="/add-new-listing" className="hover:underline hover:text-cyan-200">List Property</a>
            <a href="/my-listings" className="hover:underline hover:text-cyan-200">My Listings</a>
            <a href="#" className="hover:underline hover:text-cyan-200">Agent Finder</a>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-semibold mb-2">Contact</span>
            <span className="text-cyan-100">support@rentify.com</span>
            <span className="text-cyan-100">123 Rentify Ave, Blockchain City</span>
          </div>
        </div>
        <div className="text-center text-cyan-100 py-4 border-t border-cyan-400/30 text-sm">
          &copy; {new Date().getFullYear()} Rentify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
