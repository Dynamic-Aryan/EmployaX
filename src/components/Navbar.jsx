"use client";

import { logoutSuccess } from "@/redux/reducer/userReducer";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // optional, or use emoji/icon

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = () => {
    Cookies.remove("token");
    dispatch(logoutSuccess());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="z-50 bg-transparent sticky top-0 backdrop-blur-md shadow-sm transition duration-300">
      <div className="w-full px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <h2 className="text-center text-4xl font-extrabold text-amber-700">
              <span className="text-amber-500">Employa</span>
              <span className="text-amber-600">X</span>
            </h2>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center text-gray-800 font-medium text-lg">
            <NavLinks isAuth={isAuth} user={user} logoutHandler={logoutHandler} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-amber-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col mt-4 space-y-4 text-gray-800 font-medium text-lg">
            <NavLinks isAuth={isAuth} user={user} logoutHandler={logoutHandler} mobile />
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ isAuth, user, logoutHandler, mobile = false }) => {
  const linkClass = `relative px-3 py-1 transition-all duration-300 text-amber-500 hover:text-amber-600 hover:font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full font-sans tracking-wide`;

  return (
    <>
      <Link href="/" className={linkClass}>Home</Link>
      <Link href="/jobs" className={linkClass}>Jobs</Link>
      <Link href="/about" className={linkClass}>About</Link>

      {isAuth ? (
        <>
          <div className="flex items-center space-x-2">
            <Link href="/account" className={linkClass}>Account</Link>
            {user?.profilePic && (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-amber-500"
              />
            )}
          </div>
          <button onClick={logoutHandler} className={linkClass}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className={linkClass}>Login</Link>
      )}
    </>
  );
};

export default Navbar;
