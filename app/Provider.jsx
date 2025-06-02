"use client"
import React from "react";
import { Header } from "./_components/Header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LoadScript } from "@react-google-maps/api";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }) => {
  return (
   
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        libraries={['places']}>
        <Header />
        <div className="mt-26">{children}</div>
      </LoadScript>
    
  );
};

export default Provider;
