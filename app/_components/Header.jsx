"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggler";
import PostAdButton from "@/components/ui/PostAdButton";

export const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <header className="top-0 w-full z-40 dark:text-purple-400 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:px-16">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.svg" alt="Rentify logo" width={130} height={130} className="drop-shadow" />
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-10 text-purple-400 font-semibold text-xl items-center">
          <Link href="/">
            <li
              className={`relative px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 group ${path === "/" ? "text-purple-700 font-bold" : ""}`}
            >
              Home
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>

          </Link>
          <Link href="/add-new-listing">
            <li
              className={`relative px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 group ${path === "/add-new-listing" ? "text-purple-700 font-bold" : ""
                }`}
            >
              List Property
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>
          </Link>
          <Link href="/my-listings">
            <li
              className={`relative px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 group ${path === "/my-listings" ? "text-purple-700 font-bold" : ""
                }`}
            >
              My Listing
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>
          </Link>
          <Link href="#">
            <li className="relative px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 group">
              Agent Finder
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>
          </Link>
        </ul>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <Link href={'/add-new-listing'}>
            {/* <Button className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 via-purple-700 to-violet-900 text-white px-5 py-2.5 rounded-xl shadow-lg hover:from-fuchsia-700 hover:via-purple-800 hover:to-violet-950 transition-all duration-300">
              <Plus size={16} /> Post Your Ad
            </Button> */}
            <PostAdButton />
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href={'/sign-in'}>
              <Button
                variant="outline"
                className="px-4 py-2 border-purple-400 hover:border-purple-500 text-purple-400 hover:text-purple-600 transition"
              >
                Log In
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
