"use client"

import Hero from "@/components/Hero";
import Loading from "@/components/loading";
import Mid from "@/components/Mid";
import { useSelector } from "react-redux";
import UserMessage from "./UserMessage";

export default function Home() {
  const { loading } = useSelector((state) => state.user);
  return (
   <>
    {(
      <div className="bg-amber-50 min-h-screen">
        
        <Hero/>
        <Mid/>
     </div>
    )}
   </>
  );
}
