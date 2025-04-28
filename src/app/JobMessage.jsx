"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "@/redux/reducer/jobReducer";

const JobMessage = () => {
  const { error, message } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  return <div></div>;
};

export default JobMessage;
