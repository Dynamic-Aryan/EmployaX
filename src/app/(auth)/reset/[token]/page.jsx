"use client";

import { resetPassword } from "@/redux/action/user";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const { btnLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token, setPassword));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-yellow-100">
        <h2 className="text-center text-4xl font-extrabold text-yellow-700">
          <span className="text-3xl">Reset Password </span>
        </h2>
        <form onSubmit={submitHandler} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full flex justify-center items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
        <div className="text-center flex flex-col">
          <Link
            className="text-yellow-600 text-sm underline hover:text-yellow-700"
            href={"/login"}
          >
            Step towards Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;
