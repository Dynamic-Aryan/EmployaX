"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, Mail, NotepadText, Phone } from "lucide-react";
import Link from "next/link";
import { updatePhoto, updateProfile, updateResume } from "@/redux/action/user";


const Info = ({ user, btnLoading }) => {
  const inputRef = useRef();
  const resumeRef = useRef();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [bio, setBio] = useState(user.bio);

  const handlePhotoClick = () => inputRef.current.click();
  const handleResumeClick = () => resumeRef.current.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      dispatch(updatePhoto(formData));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    dispatch(updateResume(formData));
  };

  const handleSaveChanges = () => {
    dispatch(updateProfile(name, phoneNumber, bio));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setName(user.name);
    setPhoneNumber(user.phoneNumber);
    setBio(user.bio);
    setIsEditing(true);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 md:flex gap-10 items-start border border-amber-100">
      <div className="flex flex-col items-center gap-2">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-amber-300 shadow-md"
        />
        <button
          onClick={handlePhotoClick}
          className="text-amber-600 hover:text-amber-800 text-lg cursor-pointer"
        >
          <Edit size={20} className="inline mr-1 " /> Change Photo
        </button>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={handlePhotoChange}
        />
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start ">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-500">{user.name}</h2>
            {user.role === "jobseeker" && (
              <p className="text-gray-600 mt-1">Bio: {user.bio}</p>
            )}
          </div>
          <button onClick={handleEditClick} className="text-amber-600 hover:text-amber-800">
            <Edit size={18} />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-medium text-amber-700">Contact Info</h3>
         <div className="flex flex-col md:flex-row space-x-10">
         <div className="flex items-center gap-2 text-gray-700">
            <Mail size={18} /> {user.email}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={18} /> {user.phoneNumber}
          </div>
         </div>
        </div>

        {user.role === "jobseeker" && (
          <div className="flex items-center gap-2 text-gray-700 mt-8">
            <NotepadText size={20} />
            <Link
              href={user.resume}
              target="_blank"
              className="text-amber-600 underline hover:text-amber-800 text-lg"
            >
              Resume
            </Link>
            <button
              onClick={handleResumeClick}
              className="text-sm px-3 py-1  rounded-md text-amber-600 hover:bg-amber-100 transition"
            >
              <Edit size={18} className="inline" />
            </button>
            <input
              type="file"
              ref={resumeRef}
              className="hidden"
              accept="application/pdf"
              onChange={handleResumeChange}
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-lg border border-amber-100 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={btnLoading}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
