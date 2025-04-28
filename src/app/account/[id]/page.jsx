"use client"

import Loading from '@/components/loading';
import { getUserProfile } from '@/redux/action/user';
import { Mail, NotepadText, Phone } from 'lucide-react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
  
    const {
      userProfile: user,
      loading,
      isAuth,
    } = useSelector((state) => state.user);
  
    if (!isAuth) return redirect("/login");
  
    useEffect(() => {
      dispatch(getUserProfile(id));
    }, [id, dispatch]);
  
    return (
      <div className="min-h-screen bg-amber-50 py-8">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto">
            {user && (
              <>
                {/* Profile Card */}
                <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row gap-6">
                  <div className="flex justify-center">
                    <img
                      src={user.profilePic}
                      alt="Profile Picture"
                      className="w-40 h-40 rounded-full object-cover border-4 border-amber-400"
                    />
                  </div>
  
                  <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-xl md:text-3xl font-bold text-amber-600">{user.name}</h1>
  
                    {user.role === "jobseeker" && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-semibold text-amber-500">Bio:</span> {user.bio}
                      </p>
                    )}
  
                    <div className="mt-4">
                      <h2 className=" text-lg md:text-xl font-semibold text-amber-600 mb-2">Contact Info</h2>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-gray-700">
                          <Mail className="text-amber-500" size={20} /> {user.email}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                          <Phone className="text-amber-500" size={20} /> {user.phoneNumber}
                        </p>
                      </div>
                    </div>
  
                    {user.role === "jobseeker" && user.resume && (
                      <div className="mt-4">
                        <p className="flex items-center gap-2 text-gray-700">
                          <NotepadText className="text-amber-500" size={20} />
                          <Link
                            href={user.resume}
                            className="underline text-amber-600 font-semibold"
                            target="_blank"
                          >
                            View Resume
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Skills Card */}
                <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-amber-600 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-3">
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 border border-amber-400 text-amber-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No Skills Yet.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Page;