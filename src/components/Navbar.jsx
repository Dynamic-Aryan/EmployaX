"use client";

import { logoutSuccess } from "@/redux/reducer/userReducer";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    Cookies.remove("token");
    dispatch(logoutSuccess());
  }
  return (
    <nav className="z-50 bg-transparent sticky top-0  backdrop-blur-md  shadow-sm transition duration-300">
      <div className="w-full px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo aligned to far left */}
          <Link href="/" className="flex items-center space-x-1 group">
            <h2 className="text-center text-4xl font-extrabold text-amber-700">
              <span className="text-amber-500">Employa</span>
              <span className="text-amber-600">X</span>
            </h2>
          </Link>

          <div className="hidden md:flex space-x-8 items-center text-gray-800 font-medium text-lg">
            <Link
              href="/"
              className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
            >
              Jobs
            </Link>
            <Link
              href="/about"
              className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
            >
              About
            </Link>
            {isAuth ? (
              <>
                <div className="flex items-center ">
                  <Link
                    href="/account"
                    className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
                  >
                    Account
                  </Link>
                  {user && user.profilePic && (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-amber-500"
                    />
                  )}
                </div>
                <button
                 onClick={logoutHandler}
                  className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
