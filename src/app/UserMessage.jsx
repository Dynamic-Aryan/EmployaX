"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/action/user";
import { getAllCompany } from "@/redux/action/company";
import { getAllApplications, getAllJobs } from "@/redux/action/job";
import { clearError, clearMessage } from "@/redux/reducer/userReducer";
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const UserMessage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { error, message, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllCompany());
    dispatch(getAllJobs());
    dispatch(getAllApplications());
  }, [dispatch]);

  const isHome = pathname === "/";

  if (!isHome) {
    return <Toaster />;
  }

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-r from-amber-100 to-amber-200 py-10">
        <p className="text-xs text-gray-400 italic mt-6">
          “Crafted with love and amber energy.”
        </p>
      </div>
      <Toaster />
    </>
  );
};

export default UserMessage;
