"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, deleteCompany } from "@/redux/action/company";
import { DeleteIcon, Eye, Plus, X } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/loading";

const Company = () => {
  const { companies, btnLoading, loading } = useSelector(
    (state) => state.company
  );

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setlocation] = useState("");
  const [logo, setlogo] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for delete confirmation popup
  const [companyToDelete, setCompanyToDelete] = useState(null); // Store the company to delete

  const dispatch = useDispatch();

  const clearData = () => {
    setname("");
    setdescription("");
    setwebsite("");
    setlocation("");
    setlogo("");
  };

  const addCompanyHandler = () => {
    if (!name || !description || !website || !location || !logo) {
      setPopupMessage("Please fill all the fields."); // Set the error message
      setShowPopup(true); // Show the popup
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("location", location);
    formData.append("logo", logo);

    dispatch(addCompany(formData, clearData));
    setDialogOpen(false); // Close dialog after adding company
  };

  const deleteHandler = (id) => {
    setCompanyToDelete(id); // Store the company ID for deletion
    setShowDeletePopup(true); // Show the delete confirmation popup
  };

  const confirmDeleteHandler = () => {
    if (companyToDelete) {
      dispatch(deleteCompany(companyToDelete));
    }
    setShowDeletePopup(false); // Close the delete confirmation popup
  };

  const cancelDeleteHandler = () => {
    setShowDeletePopup(false); // Close the delete confirmation popup
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          {/* Header and Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-amber-600">Companies</h1>
            {companies && companies.length < 3 && (
              <button
                onClick={() => setDialogOpen(true)} // Open dialog on button click
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Add Company <Plus size={18} className="ml-2" />
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-sm font-medium text-gray-600 text-left">
                    Name
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600 text-left">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600 text-left">
                    View
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600 text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies && companies.length > 0 ? (
                  companies.map((e) => (
                    <tr key={e._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{e.name}</td>
                      <td className="px-6 py-4">
                        <img
                          src={e.logo}
                          alt="Company Logo"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/company/${e._id}`}>
                          <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg flex items-center">
                            <Eye size={16} />
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteHandler(e._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center"
                        >
                          <DeleteIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No companies yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add Company Modal */}
          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h3 className="text-amber-600 text-2xl font-semibold mb-4">
                  Add Company
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Website
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={website}
                      onChange={(e) => setwebsite(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={location}
                      onChange={(e) => setlocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => setlogo(e.target.files[0])}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={addCompanyHandler}
                      disabled={btnLoading}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add Company
                    </button>
                    <button
                      onClick={() => setDialogOpen(false)} // Close dialog
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Popup for error message */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-amber-900 text-xl font-semibold mb-4">Error</h3>
            <p className="text-gray-700 mb-4">{popupMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)} // Close the popup
                className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for delete confirmation */}
      {showDeletePopup && (
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
              Are you sure you want to delete this Company? This action cannot
              be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDeleteHandler}
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full transition"
              >
                Delete
              </button>
              <button
                onClick={cancelDeleteHandler}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
