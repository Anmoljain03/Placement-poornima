import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/admin/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const toggleFeePaid = async (userId, status) => {
    try {
      setUpdatingUserId(userId);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/toggle-fee-paid`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ feePaid: status }),
        }
      );

      if (!response.ok) throw new Error("Failed to update fee status");

      const updatedUser = await response.json();
      console.log("Fee status updated:", updatedUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, feePaid: updatedUser.feePaid } : user
        )
      );
    } catch (error) {
      console.error("Error updating fee status:", error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    [user.email, user.registrationNumber, user.department]
      .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">Users List</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Email, Reg. No, or Department"
          className="w-full max-w-lg p-3 mb-6 bg-gray-200 text-gray-800 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p className="text-gray-800 text-lg">Loading users...</p>
        ) : filteredUsers.length > 0 ? (
          <div className="w-full max-w-6xl bg-gray-200 shadow-lg p-6 rounded-lg border border-gray-600">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border border-gray-700 px-6 py-3 text-left">Name</th>
                  <th className="border border-gray-700 px-6 py-3 text-left">Email</th>
                  <th className="border border-gray-700 px-6 py-3 text-left">Registration No</th>
                  <th className="border border-gray-700 px-6 py-3 text-left">Department</th>
                  <th className="border border-gray-700 px-6 py-3 text-center">Fee Paid</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-700 text-gray-800 ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-200"
                    } hover:bg-gray-700 hover:text-white transition-all`}
                  >
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.registrationNumber}</td>
                    <td className="px-6 py-3">{user.department}</td>
                    <td className="px-6 py-3 flex justify-center gap-4">
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={user.feePaid === true}
                          onChange={() => toggleFeePaid(user._id, true)}
                          disabled={updatingUserId === user._id}
                          className="w-5 h-5 cursor-pointer disabled:opacity-50"
                        />
                        <span className="text-gray-800">Yes</span>
                      </label>

                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={user.feePaid === false}
                          onChange={() => toggleFeePaid(user._id, false)}
                          disabled={updatingUserId === user._id}
                          className="w-5 h-5 cursor-pointer disabled:opacity-50"
                        />
                        <span className="text-gray-800">No</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
