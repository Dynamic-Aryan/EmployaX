"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, EyeClosedIcon, EyeIcon, User, Briefcase } from "lucide-react";
import { registerUser } from "@/redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  const {isAuth}=useSelector((state)=>state.user);

  if(isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formdata = new FormData();
    formdata.append("role", role);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("profilePic", profilePic);

    if (role === "jobseeker") {
      formdata.append("bio", bio);
      formdata.append("resume", resume);
    }

    try {
      await dispatch(registerUser(formdata));
      setSuccessMsg("Registration successful!");
      setRole("");
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setProfilePic("");
      setBio("");
      setResume("");
    } catch (err) {
      console.error(err);
    } finally {
      setBtnLoading(false);
    }
  };

  const roleOptions = [
    {
      key: "jobseeker",
      label: "Job Seeker",
      icon: <User className="w-6 h-6" />,
    },
    {
      key: "recruiter",
      label: "Recruiter",
      icon: <Briefcase className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-yellow-100">
        <h2 className="text-center text-4xl font-extrabold text-yellow-700">
          Join <span className="text-yellow-500">Employa</span>
          <span className="text-yellow-600">X</span>
        </h2>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-yellow-800 mb-2">
            Choose Your Role
          </label>
          <div className="grid grid-cols-2 gap-4">
            {roleOptions.map((option) => (
              <div
                key={option.key}
                onClick={() => setRole(option.key)}
                className={`cursor-pointer flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  role === option.key
                    ? "bg-yellow-500 text-white border-yellow-600 shadow-md"
                    : "border-yellow-200 hover:border-yellow-400 bg-yellow-50 text-yellow-700"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        {role && (
          <form onSubmit={submitHandler} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-yellow-800 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-yellow-800 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-800 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
                required
              />
            </div>

            {role === "jobseeker" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-yellow-800 mb-1">
                    Resume (PDF)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-yellow-800 mb-1">
                    Bio
                  </label>
                  <input
                    type="text"
                    placeholder="Short bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full flex justify-center items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50"
            >
              {btnLoading ? "Submitting..." : "Register"} 
            </button>

            {successMsg && (
              <p className="text-center text-green-600 font-medium mt-2">
                ✅ {successMsg}
              </p>
            )}
          </form>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="text-yellow-600 text-sm underline hover:text-yellow-700"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
