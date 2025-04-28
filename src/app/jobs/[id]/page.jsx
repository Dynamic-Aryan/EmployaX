"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  ApplyForJob,
  applicationofjob,
  getsingleJobs,
  saveJob,
  updateJob,
  updateStatus,
} from "@/redux/action/job";
import { BriefcaseBusiness, Eye, MapPin, Save, SaveOff } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const JobPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getsingleJobs(id));
  }, [id]);

  const { job, loading, btnLoading, applications, applicationOfJob } =
    useSelector((state) => state.job);
  const { user, isAuth } = useSelector((state) => state.user);

  if (!isAuth) return redirect("/login");

  const [saved, setsaved] = useState(false);
  let savedJobs;
  if (user) savedJobs = user.savedJobs;

  useEffect(() => {
    if (savedJobs && savedJobs.includes(id)) {
      setsaved(true);
    }
  }, [user]);

  const saveJobHander = () => {
    setsaved(!saved);
    dispatch(saveJob(id));
  };

  const applyHandler = () => {
    dispatch(ApplyForJob(id));
  };

  const [applied, setapplied] = useState(false);
  useEffect(() => {
    if (applications && id) {
      applications.forEach((item) => item.job === id && setapplied(true));
    }
  }, [applications, id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");
  const [status, setStatus] = useState("");

  const openUpdateModal = () => {
    setShowModal(true);
    setTitle(job.title);
    setDescription(job.description);
    setRole(job.role);
    setSalary(job.salary);
    setExperience(job.experience);
    setLocation(job.location);
    setOpenings(job.openings);
    setStatus(job.status);
  };

  const updateJobHandler = () => {
    dispatch(
      updateJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        status,
        () => setShowModal(false)
      )
    );
  };

  useEffect(() => {
    if (user && user.role === "recruiter") dispatch(applicationofjob(id));
  }, [id, job]);

  const [value, setvalue] = useState("");

  const updateApplicationHandler = (Appid) => {
    if (value === "") return alert("Please provide a status");
    dispatch(updateStatus(Appid, id, value, setvalue));
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
          {job && (
            <>
              {/* Job Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-amber-600">
                    {job.title}
                  </h1>
                  <div className="flex items-center  mt-5 space-x-4">
                    <p className="flex items-center gap-1 text-amber-800 ">
                      <MapPin size={18} /> {job.location}
                    </p>
                    <p className="flex items-center gap-1 text-amber-800">
                      <BriefcaseBusiness size={18} />
                      {job.experience === 0 ? "Fresher" : `${job.experience} Years`}
                    </p>
                  </div>
                  <p className="text-amber-700 mt-2 font-bold">
                    Salary: <span className="text-amber-400 font-medium">₹{job.salary}</span> L.P.A
                  </p>
                  <p className="text-amber-700 mt-1 font-bold">Openings:<span className="text-amber-400 font-medium"> {job.openings}</span></p>
                  <p className="text-amber-700 mt-1 font-bold">Status: <span className="text-amber-400 font-medium">{job.status}</span></p>
                </div>

                {/* Update Button */}
                {user && user._id === job.recruiter && (
                  <button
                    className="mt-4 md:mt-0 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md"
                    onClick={openUpdateModal}
                  >
                    Update Job
                  </button>
                )}
              </div>

              {/* Job Description */}
              <p className="text-amber-700 leading-relaxed font-extrabold mb-8">{job.description}</p>

              {/* Save & Apply Buttons */}
              {user && user.role === "jobseeker" && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="px-6 py-2 rounded-md bg-amber-400 hover:bg-amber-500 text-white"
                    disabled={btnLoading}
                    onClick={saveJobHander}
                  >
                    {saved ? "Unsave Job" : "Save Job"}
                  </button>

                  {!applied && job.status === "open" && (
                    <button
                      className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
                      disabled={btnLoading}
                      onClick={applyHandler}
                    >
                      Easy Apply
                    </button>
                  )}
                  {applied && (
                    <p className="text-green-600 font-semibold text-lg mt-2">Already Applied</p>
                  )}
                </div>
              )}

              {/* Applications (Recruiter Only) */}
              {user && user._id === job.recruiter && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-amber-600 mb-6">Applications</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left">
                      <thead>
                        <tr className="bg-amber-100">
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Resume</th>
                          <th className="px-4 py-2">Profile</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicationOfJob &&
                          applicationOfJob.map((app) => (
                            <tr key={app._id} className="border-t">
                              <td className="px-4 py-2">
                                <div className="flex items-center space-x-3">
                                  {app.applicant.name}
                                  <select
                                    value={value}
                                    onChange={(e) => setvalue(e.target.value)}
                                    className="border p-0.5 rounded text-sm ml-6"
                                  >
                                    <option value="">Update status</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                  <button
                                    onClick={() => updateApplicationHandler(app._id)}
                                    disabled={btnLoading}
                                    className="px-2 py-1 text-white bg-amber-500 hover:bg-amber-600 rounded text-sm"
                                  >
                                    Update
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <Link href={app.applicant.resume} target="_blank" className="text-blue-600 hover:underline">
                                  View Resume
                                </Link>
                              </td>
                              <td className="px-4 py-2">
                                <Link href={`/account/${app.applicant._id}`} className="text-blue-600 hover:underline">
                                  View Profile
                                </Link>
                              </td>
                              <td className="px-4 py-2">
                                {app.status === "pending" && <span className="text-yellow-600">Pending</span>}
                                {app.status === "accepted" && <span className="text-green-600">Accepted</span>}
                                {app.status === "rejected" && <span className="text-red-600">Rejected</span>}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Modal for Update */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-amber-600">Update Job</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                placeholder="Openings"
                className="w-full border p-2 rounded"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateJobHandler}
                disabled={btnLoading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
