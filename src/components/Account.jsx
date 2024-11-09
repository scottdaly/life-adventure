import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { fetchWithAuth } from "./AuthContext";
import { ChevronLeft } from "lucide-react";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetchWithAuth("http://localhost:3000/api/user", {
        method: "DELETE",
      });

      if (response.ok) {
        await logout();
        navigate("/");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    setIsDeleting(false);
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className=" p-8 rounded-lg w-full max-w-md my-8 ">
        <div className="flex gap-2 items-center justify-between">
          <Link to="/">
            <ChevronLeft className="w-8 h-8 text-zinc-400" />
          </Link>
          <h1 className="text-4xl font-bold">Account</h1>
          <div></div>
        </div>
        {user && (
          <div className="mb-6 mt-4">
            <p className="text-gray-300 text-center">
              Logged in as: <span className="font-semibold">{user.email}</span>
            </p>
          </div>
        )}
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-zinc-100 hover:bg-white text-zinc-800 border border-zinc-200 hover:border-zinc-300 font-bold py-2 px-4 rounded transition duration-200"
          >
            Log Out
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Confirm Account Deletion
            </h2>
            <p className="mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
