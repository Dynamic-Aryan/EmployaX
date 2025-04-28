import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppliedJobs = ({ jobs }) => {
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm md:text-3xl text-amber-600 font-bold">Your Applied Jobs</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-amber-300 rounded-lg shadow-md">
        
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
            {jobs && jobs.length > 0 ? (
              jobs.map((e) => (
                <tr
                  key={e._id}
                  className="hover:bg-amber-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 border-b border-amber-200">
                    <div className="flex items-center gap-2 text-amber-900 font-medium">
                      {e.jobName}
                      <Link
                        href={`/jobs/${e.job}`}
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-amber-200 text-amber-700">
                    ₹{e.jobSalary}
                  </td>
                  <td className="px-6 py-4 border-b border-amber-200">
                    {e.status === "pending" && (
                      <span className="text-yellow-500 font-semibold capitalize">
                        {e.status}
                      </span>
                    )}
                    {e.status === "accepted" && (
                      <span className="text-green-600 font-semibold capitalize">
                        {e.status}
                      </span>
                    )}
                    {e.status === "rejected" && (
                      <span className="text-red-600 font-semibold capitalize">
                        {e.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-amber-600 font-semibold"
                >
                  No jobs applied yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
