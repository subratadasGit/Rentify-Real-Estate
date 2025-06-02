"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <header className="sticky top-0 w-full z-40 bg-white border-b-2 border-b-cyan-200/60 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:px-16">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.svg" alt="Rentify logo" width={130} height={130} className="drop-shadow" />
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-10 text-cyan-900 font-semibold text-xl items-center">
          <Link href="/">
            <li
              className={`px-2 py-1 rounded-lg hover:bg-cyan-100 hover:text-blue-700 transition cursor-pointer ${
                path === "/" ? "text-blue-700 bg-cyan-100" : ""
              }`}
            >
              Home
            </li>
          </Link>
          <Link href="/add-new-listing">
            <li
              className={`px-2 py-1 rounded-lg hover:bg-cyan-100 hover:text-blue-700 transition cursor-pointer ${
                path === "/add-new-listing" ? "text-blue-700 bg-cyan-100" : ""
              }`}
            >
              List Property
            </li>
          </Link>
          <Link href="/my-listings">
            <li
              className={`px-2 py-1 rounded-lg hover:bg-cyan-100 hover:text-blue-700 transition cursor-pointer ${
                path === "/my-listings" ? "text-blue-700 bg-cyan-100" : ""
              }`}
            >
              My Listing
            </li>
          </Link>
          <Link href="#">
            <li className="px-2 py-1 rounded-lg hover:bg-cyan-100 hover:text-blue-700 transition cursor-pointer">
              Agent Finder
            </li>
          </Link>
        </ul>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <Link href={'/add-new-listing'}>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-cyan-600 transition-all">
              <Plus size={16} /> Post Your Ad
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href={'/sign-in'}>
              <Button
                variant="outline"
                className="px-4 py-2 border-cyan-300 hover:border-blue-400 text-cyan-900 hover:text-blue-700 transition"
              >
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
