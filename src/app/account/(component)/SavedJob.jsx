import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const SavedJob = ({ savedJobs }) => {
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm md:text-3xl text-amber-600 font-bold">All Jobs You Have Saved</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-amber-200 rounded-lg shadow-md">
          
          <thead className="bg-amber-100">
        <tr>
        <th className="text-left px-6 py-4 font-semibold text-amber-800 border-b border-amber-300">
                Title
              </th>
              <th className="text-left px-6 py-4 font-semibold text-amber-800 border-b border-amber-300">
                Salary
              </th>
              <th className="text-left px-6 py-4 font-semibold text-amber-800 border-b border-amber-300">
                Status
              </th>
        </tr>
          </thead>
          <tbody>
            {savedJobs && savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <tr key={job._id} className="border-t border-amber-200 hover:bg-amber-50">
                  <td className="py-4 px-6 font-medium text-amber-900">
                    <div className="flex items-center gap-2 text-amber-900 font-medium">
                      {job.title}
                      <Link href={`/jobs/${job._id}`} className="text-amber-600 hover:text-amber-800">
                        <Eye size={18} />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-amber-200 text-amber-700">₹{job.salary}</td>
                  <td className="py-4 px-6 text-amber-800">{job.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-6 px-6 text-center text-amber-600">
                  No saved jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedJob;
