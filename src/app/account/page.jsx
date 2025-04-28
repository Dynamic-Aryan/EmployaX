"use client";

import { redirect } from "next/navigation";

import { useSelector } from "react-redux";
import Info from "./(component)/Info";
import Loading from "@/components/loading";
import Skill from "./(component)/Skill";
import Company from "./(component)/Company";
import { useEffect, useState } from "react";
import SavedJob from "./(component)/SavedJob";
import AppliedJobs from "./(component)/AppliedJobs";

const Account = () => {
  const { isAuth, user, btnLoading, loading } = useSelector(
    (state) => state.user
  );

  const { jobs, applications } = useSelector((state) => state.job);

  if (!isAuth) return redirect("/login");

  const [savedJobs, setsavedJobs] = useState({});

  useEffect(() => {
    if (jobs && user && Array.isArray(jobs) && Array.isArray(user.savedJobs)) {
      const savedJobArray = jobs.filter((job) =>
        user.savedJobs.includes(job._id)
      );
      setsavedJobs(savedJobArray);
    }
  }, [jobs, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {user && (
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-10">
              <Info user={user} btnLoading={btnLoading} />

              {user.role === "jobseeker" && (
                <Skill user={user} btnLoading={btnLoading} />
              )}

              {user.role === "recruiter" && <Company />}
              {user.role === "jobseeker" && <SavedJob savedJobs={savedJobs} />}
              {
                user.role === "jobseeker" && <AppliedJobs jobs={applications}/>
              }
              
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Account;
