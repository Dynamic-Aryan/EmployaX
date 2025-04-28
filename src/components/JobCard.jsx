"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ApplyForJob } from "@/redux/action/job";

const JobCard = ({ job }) => {
  const { user } = useSelector((state) => state.user);
  const { btnLoading, applications } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const applyHandler = () => {
    dispatch(ApplyForJob(job._id));
  };

  const [applied, setapplied] = useState(false);

  useEffect(() => {
    if (applications && job._id) {
      applications.forEach((item) => item.job === job._id && setapplied(true));
    }
  }, [applications, job._id]);

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out mb-6">
      {/* Job Header */}
      <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-xl">
        <div className="flex items-center gap-4">
          <Link href={`/company/${job.company}`}>
            <img
              src={job.comapnyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
           
          </Link>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <h3 className="underline font-semibold"> {job.status}</h3>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin />
          <p>{job.location}</p>
        </div>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <BriefcaseBusiness />
          <p>{job.experience === 0 ? "Fresher" : `${job.experience} Years`}</p>
        </div>
        <p className="text-gray-700 mt-3">{job.description.slice(0, 80)}...</p>
        <p className="mt-4 text-lg font-bold text-gray-800">₹ {job.salary} P.A</p>
      </div>

      {/* Job Footer */}
      <div className="p-5 bg-gray-100 rounded-b-xl flex justify-between items-center">
        <Link href={`/jobs/${job._id}`}>
          <button className="text-amber-600 border border-amber-600 hover:bg-amber-500 hover:text-white px-4 py-2 rounded-md transition-colors duration-200">
            View Details
          </button>
        </Link>

        {user && user.role === "jobseeker" && (
          <>
            {applied ? (
              <p className="text-green-500 font-medium">Already Applied</p>
            ) : (
              <>
                {job.status === "closed" ? (
                  <p className="text-red-500 font-medium">Job Closed</p>
                ) : (
                  <button
                    onClick={applyHandler}
                    disabled={btnLoading}
                    className="bg-amber-500 text-white hover:bg-amber-600 px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Easy Apply
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
