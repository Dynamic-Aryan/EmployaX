"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getUser } from "@/redux/action/user";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Hero = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.user);

  // Fetch user data on page load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const isHome = pathname === "/";

  // Render Toaster only on homepage
  if (!isHome) {
    return <Toaster />;
  }

  return (
    <section className="bg-gradient-to-r from-amber-100 to-amber-200 py-16 px-4 md:py-20 md:px-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6">
        {/* Left Column: Content */}
        <div className="flex flex-col items-center md:items-start md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700 mb-6 text-center md:text-left">
            EmployaX
            <br />
            <span className="text-amber-500">Your Career, Our Mission</span>
          </h1>
          <p className="text-gray-700 text-lg mb-8 text-center md:text-left">
            Find your dream job effortlessly with EmployaX. Your future starts now.
          </p>

          {/* Conditional buttons for logged-in or not logged-in users */}
          {user ? (
            <>
              {/* For logged-in users */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <Link href="/jobs">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition">
                    Browse Jobs
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border border-amber-600 hover:bg-amber-100 text-amber-600 px-6 py-3 rounded-lg transition">
                    About Us
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* For non-logged-in users */}
              <div className="flex justify-center gap-4 mt-6">
                <Link href="/register">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition">
                    Register
                  </button>
                </Link>
                <Link href="/login">
                  <button className="border border-amber-500 hover:bg-amber-100 text-amber-600 font-semibold py-2 px-6 rounded-lg transition">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Hero Image */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="/portalhero.jpg"
            alt="Hero Image"
            className="rounded-2xl shadow-xl hover:scale-105 transition duration-300 w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
