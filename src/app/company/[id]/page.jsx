"use client";

import Loading from "@/components/loading";
import { getSingleCompany } from "@/redux/action/company";
import { AddJob, deleteJob } from "@/redux/action/job";
import { DeleteIcon, Earth, Eye, Plus, X } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompanyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { company, loading } = useSelector((state) => state.company);
  const { user, isAuth } = useSelector((state) => state.user);
  const { jobs, btnLoading } = useSelector((state) => state.job);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  let companyJobs = jobs ? jobs.filter((job) => job.company === id) : [];

  if (!isAuth) return redirect("/login");

  useEffect(() => {
    dispatch(getSingleCompany(id));
  }, [id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");

  const clearInput = () => {
    setTitle("");
    setDescription("");
    setRole("");
    setSalary("");
    setExperience("");
    setLocation("");
    setOpenings("");
  };

  const addJobHandler = () => {
    dispatch(
      AddJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        clearInput
      )
    );
    setShowModal(false); // Close modal after adding
  };

  const deleteHandler = (jobId) => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = () => {
    if (jobToDelete) {
      dispatch(deleteJob(jobToDelete));
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  return (
    <div className="min-h-screen py-14 px-4 ">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {company && (
            <>
              <div className="container mx-auto flex flex-col items-center text-center">
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="w-32 md:w-48 lg:w-64 object-cover object-center rounded-lg border-4 border-amber-500 shadow-lg"
                />
                <h1 className="text-3xl font-bold text-gray-800 mt-6">
                  {company.name}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  {company.description}
                </p>
                <Link
                  href={company.website}
                  target="_blank"
                  className="mt-4 inline-block"
                >
                  <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full flex items-center gap-2 transition">
                    Visit Website <Earth />
                  </button>
                </Link>
              </div>

              <div className="mt-12 px-4 md:px-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Available Jobs
                  </h2>
                  {user && user._id === company.recruiter && (
                    <button
                      className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-5 rounded-full flex items-center gap-2 transition"
                      onClick={() => setShowModal(true)}
                    >
                      Add Job <Plus size={18} />
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto shadow rounded-lg bg-white">
                  <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-amber-600 text-white">
                      <tr>
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Salary</th>
                        <th className="py-3 px-6 text-left">Openings</th>
                        <th className="py-3 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyJobs.map((job) => (
                        <tr key={job._id} className="border-t hover:bg-gray-50">
                          <td className="py-4 px-6 flex items-center gap-2">
                            {job.title}
                            <Link href={`/jobs/${job._id}`}>
                              <Eye className="text-amber-500 hover:text-amber-600 cursor-pointer" />
                            </Link>
                          </td>
                          <td className="py-4 px-6">₹ {job.salary}</td>
                          <td className="py-4 px-6">{job.openings} openings</td>
                          <td className="py-4 px-6 text-center flex items-center justify-center gap-4">
                            <span
                              className={`font-medium ${
                                job.status === "active"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {job.status}
                            </span>
                            {user && user._id === company.recruiter && (
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                                onClick={() => deleteHandler(job._id)}
                                disabled={btnLoading}
                              >
                                <DeleteIcon size={18} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* deletehandler */}
              {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-sm p-6 relative">
                    <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      <X size={24} />
                    </button>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      Confirm Deletion
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      Are you sure you want to delete this job? This action
                      cannot be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={confirmDeleteHandler}
                        disabled={btnLoading}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Job Modal */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-md p-6 relative">
                    <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowModal(false)}
                    >
                      <X size={24} />
                    </button>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Post a New Job
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Experience (years)"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Openings"
                        value={openings}
                        onChange={(e) => setOpenings(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex justify-end mt-6 gap-3">
                      <button
                        disabled={btnLoading}
                        onClick={addJobHandler}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full flex items-center gap-2 transition"
                      >
                        Submit <Plus size={18} />
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
