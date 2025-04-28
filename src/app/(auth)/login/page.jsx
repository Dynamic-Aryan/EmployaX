"use client";

import { loginUser } from "@/redux/action/user";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { isAuth, btnLoading } = useSelector((state) => state.user);
  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-yellow-100">
        <h2 className="text-center text-4xl font-extrabold text-yellow-700">
          Login At <span className="text-yellow-500">Employa</span>
          <span className="text-yellow-600">X</span>
        </h2>

        <form onSubmit={submitHandler} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-yellow-600"
              >
                {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full flex justify-center items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50"
          >
            {btnLoading ? "Submitting..." : "Login"}
          </button>

          {successMsg && (
            <p className="text-center text-green-600 font-medium mt-2">
              ✅ {successMsg}
            </p>
          )}
        </form>

        <div className="text-center flex flex-col">
          <Link
            href="/register"
            className="text-yellow-600 text-sm underline hover:text-yellow-700"
          >
            No account
          </Link>
          <Link
            className="text-yellow-600 text-sm underline hover:text-yellow-700"
            href={"/forgot"}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
