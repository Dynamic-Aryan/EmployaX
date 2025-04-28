"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import Loading from "./loading";
import JobCard from "./JobCard";

const Mid = () => {
  const { loading, topSix } = useSelector((state) => state.job);

  return (
    <div className="bg-gradient-to-r from-amber-100 to-amber-200 py-16 px-4 md:py-20 md:px-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl md:text-3xl font-bold text-amber-700">
          Latest Jobs on <span className="text-amber-500">EmployaX</span>
        </h2>
        <Link href="/jobs">
          <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 md:px-5 md:py-2 rounded-lg shadow-md transition">
            View All
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
          {topSix && topSix.length > 0 ? (
            topSix.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-gray-500 text-center">No Jobs Available Yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Mid;
