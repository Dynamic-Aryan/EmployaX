"use client";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Filter } from "lucide-react";
import { getAllJobs } from "@/redux/action/job";
import Loading from "@/components/loading";
import JobCard from "@/components/JobCard";

const JobsPage = () => {
  const { loading, jobs, locations } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // New state for managing modal visibility

  const clickEvent = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle filter modal visibility
  };

  const filterJobs = () => {
    dispatch(getAllJobs(title, location, experience));
    setIsFilterOpen(false); // Close the modal after applying the filter
  };

  const clearFilter = () => {
    setTitle("");
    setLocation("");
    setExperience(15);
    dispatch(getAllJobs());
    setIsFilterOpen(false); // Close the modal after clearing the filter
  };

  let totalPages;
  if (jobs) {
    totalPages = Math.ceil(jobs.length / 6);
  }

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="bg-amber-200 min-h-screen py-6">
      <div className="w-11/12 mx-auto mt-3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">
            All <span className="text-red-500">Jobs</span>
          </h1>
          <div className="icon">
            <button
              className="bg-amber-300 p-2 rounded-full border border-amber-900"
              onClick={clickEvent}
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice((page - 1) * 6, page * 6).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No Jobs Yet</p>
        )}

        {jobs && jobs.length > 6 && (
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-4">
              {page !== 1 && (
                <button
                  className="bg-amber-200 p-2 rounded-md cursor-pointer"
                  onClick={prevPage}
                >
                  Previous
                </button>
              )}
              {page !== totalPages && (
                <button
                  className="bg-amber-300 p-2 rounded-md cursor-pointer"
                  onClick={nextPage}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button onClick={clickEvent} className="text-xl">
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Search with title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value={""}>Select Location</option>
                {locations &&
                  locations.map((loc) => <option key={loc}>{loc}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value={15}>Select Experience</option>
                {[...Array(8)].map((_, index) => (
                  <option key={index} value={index}>
                    {index === 0 ? "Fresher" : index}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={filterJobs}
                className="bg-amber-500 text-white px-4 py-2 rounded-md"
              >
                Apply
              </button>
              <button
                onClick={clearFilter}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
