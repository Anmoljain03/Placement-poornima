import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/applications");
        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) =>
    [app.userId?.email, app.userId?.registrationNumber, app.userId?.department]
      .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Applications</h1>

        <div className="bg-[#374151] shadow-lg p-6 rounded-lg w-full max-w-5xl border border-gray-600">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-700 px-6 py-3 text-left">User</th>
                <th className="border border-gray-700 px-6 py-3 text-left">Job</th>
                <th className="border border-gray-700 px-6 py-3 text-left">Application Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-700 transition-all">
                    <td className="border border-gray-700 px-6 py-3 text-gray-300">
                      {app.userId?.name} ({app.userId?.email})
                    </td>
                    <td className="border border-gray-700 px-6 py-3 text-gray-300">
                      {app.jobTitle} ({app.companyName})
                    </td>
                    <td className="border border-gray-700 px-6 py-3">
                      {app.answers && Object.keys(app.answers).length > 0 ? (
                        <ul className="text-gray-300 space-y-2">
                          {Object.entries(app.answers).map(([key, value]) => (
                            <li key={key} className="mb-2">
                              <strong>{key}:</strong>{" "}
                              {key.toLowerCase() === "resume" ? (
                                <a
                                  href={`http://localhost:5000${value}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline"
                                >
                                  Download Resume
                                </a>
                              ) : Array.isArray(value) ? (
                                value.map((item, index) =>
                                  typeof item === "object" && item !== null ? (
                                    <div key={index} className="ml-4">
                                      {Object.entries(item).map(([k, v]) => (
                                        <div key={k}>
                                          <strong>{k}:</strong> {v}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <span key={index}>{item}</span>
                                  )
                                )
                              ) : typeof value === "object" && value !== null ? (
                                <div className="ml-4">
                                  {Object.entries(value).map(([k, v]) => (
                                    <div key={k}>
                                      <strong>{k}:</strong> {v}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                value
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-300">No data available</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-300">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
