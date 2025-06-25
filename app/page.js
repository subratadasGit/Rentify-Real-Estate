import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Home, ShieldCheck, Sparkles, Globe, ArrowRight, Users, Facebook, Twitter, Instagram } from "lucide-react";
import ExplorePropertyCard from "@/components/ui/ExplorePropertyCard";
import GradientText from "@/react-bits/GradientText/GradientText";
import { Avatar, AvatarGroup } from "@heroui/react";
import TeamSection from "@/components/TeamSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Explore Properties Map Section (Top) */}
      <section className="pt-10 pb-6 px-2 mt-26 md:px-0">
        <div className="max-w-6xl mx-auto mb-6">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-17 text-center drop-shadow">Explore Properties</h2> */}
          <GradientText className="text-center text-5xl font-bold mb-17">Explore Properties</GradientText>
          <ExplorePropertyCard />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 px-4 md:px-0">
        {/* <Image
          src="/hero-realestate.jpg"
          alt="Rentify Hero"
          fill
          className="object-cover object-center absolute inset-0 w-full h-full opacity-30 -z-10"
          priority
        /> */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-300 mb-4 drop-shadow-lg tracking-tight">
          Welcome to <span className="text-purple-600">Rentify</span>
        </h1>
        <p className="text-xl md:text-2xl text-purple-400 mb-8 max-w-2xl mx-auto drop-shadow">
          The next generation Property marketplace. List, verify, and mint your property as a blockchain NFT.
        </p>
        <Button
          size="lg"
          className="text-lg px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-violet-900 text-white rounded-full shadow-lg hover:from-fuchsia-700 hover:via-purple-800 hover:to-violet-950 transition-all duration-300"
        >
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Home className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-purple-500">Easy Listing</h3>
            <p className="text-purple-400">List your property in minutes with our intuitive interface.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-purple-500">Verified Ownership</h3>
            <p className="text-purple-400">All listings are verified and secured on the blockchain.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-purple-500">NFT Minting</h3>
            <p className="text-purple-400">Mint your property as a unique NFT and transfer ownership seamlessly.</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-cyan-600 mb-4" />
            <h3 className="font-bold text-lg mb-2 text-purple-500">Agent Finder</h3>
            <p className="text-purple-400">Connect with trusted agents to help you rent or manage your property.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-4">How Rentify Works</h2>
          <p className="text-lg text-purple-400">A simple, secure process for property owners and renters.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Globe className="h-10 w-10 text-blue-500 mb-2" />
            <span className="font-semibold text-purple-500">1. List Property</span>
            <p className="text-purple-400 text-sm">Create your listing and add property details.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-10 w-10 text-green-500 mb-2" />
            <span className="font-semibold text-purple-500">2. Verify</span>
            <p className="text-purple-400 text-sm">We verify your ownership and property details.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-10 w-10 text-yellow-400 mb-2" />
            <span className="font-semibold text-purple-500">3. Mint NFT</span>
            <p className="text-purple-400 text-sm">Mint your property as a blockchain NFT.</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="h-10 w-10 text-blue-700 mb-2" />
            <span className="font-semibold text-purple-500">4. Rent or Transfer</span>
            <p className="text-purple-400 text-sm">Easily rent or transfer ownership to anyone, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Team Profile Section */}
      <TeamSection />


      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-purple-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-extrabold tracking-tight">Rentify</span>
            </div>
            <p className="text-cyan-100 mb-4 max-w-xs">
              Empowering the next generation of property owners and renters with blockchain technology.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-purple-300"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-purple-300"><Twitter className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-purple-300"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-semibold mb-2">Navigation</span>
            <a href="/" className="hover:underline hover:text-purple-200">Home</a>
            <a href="/add-new-listing" className="hover:underline hover:text-purple-200">List Property</a>
            <a href="/my-listings" className="hover:underline hover:text-purple-200">My Listings</a>
            <a href="#" className="hover:underline hover:text-purple-200">Agent Finder</a>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-semibold mb-2">Contact</span>
            <span className="text-purple-100">support@rentify.com</span>
            <span className="text-purple-100">123 Rentify Ave, Blockchain City</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <span className="font-semibold mb-2">Our Team</span>
            <AvatarGroup isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            </AvatarGroup>
          </div>

        </div>
        <div className="text-center text-purple-100 py-4 border-t border-purple-400/30 text-sm">
          &copy; {new Date().getFullYear()} Rentify. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
