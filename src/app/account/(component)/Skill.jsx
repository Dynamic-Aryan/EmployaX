"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddSkill, removeSkill } from "@/redux/action/user";
import { Delete, Plus } from "lucide-react";

const Skill = ({ user, btnLoading }) => {
  const [skill, setSkill] = useState("");
  const [confirmingSkill, setConfirmingSkill] = useState(null);
  const dispatch = useDispatch();

  const addSkillHandler = () => {
    if (!skill.trim()) {
      alert("Please enter a skill.");
      return;
    }
    dispatch(AddSkill(skill.trim()));
    setSkill("");
  };

  const confirmRemoveSkill = (skill) => {
    setConfirmingSkill(skill);
  };

  const cancelRemove = () => {
    setConfirmingSkill(null);
  };

  const removeSkillConfirmed = (skill) => {
    dispatch(removeSkill(skill));
    setConfirmingSkill(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-amber-100">
      <h2 className="text-2xl font-semibold text-amber-700 mb-4">Skills</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Add skill..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-1/3"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          onClick={addSkillHandler}
          disabled={btnLoading}
          className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          <Plus size={18} /> Add
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {user.skills?.length > 0 ? (
          user.skills.map((e) => (
            <div
              key={e}
              className="relative bg-gradient-to-br from-amber-100 to-white border border-amber-300 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm text-sm text-amber-800 hover:shadow-md transition"
            >
              {e}
              <button
                disabled={btnLoading}
                onClick={() => confirmRemoveSkill(e)}
                className="text-red-600 hover:text-red-800"
              >
                <Delete size={16} />
              </button>

              {confirmingSkill === e && (
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-md p-4 z-10 flex gap-2 text-xs">
                  <button
                    onClick={() => removeSkillConfirmed(e)}
                    className="text-green-600 hover:underline"
                    disabled={btnLoading}
                  >
                    Yes
                  </button>
                  <button
                    onClick={cancelRemove}
                    className="text-red-600 hover:underline"
                    disabled={btnLoading}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Skill;
