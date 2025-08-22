import { useEffect, useState } from "react";
import axios from "axios";
import { getLogs } from "../../controller/AdminDashboardController";
import toast from "react-hot-toast";

const ApiLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogs();
        if (response?.success !== false) {
          setLogs(response.data || []);
        }
      } catch (err) {
        toast.error("Error fetching API logs:", err);
      }
    };
    fetchLogs();
  }, []);

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 400 && status < 500) return "text-yellow-500";
    if (status >= 500) return "text-red-500";
    return "text-gray-300";
  };

  return (
    <div className="min-h-screen px-2 sm:px-4 md:px-8 lg:px-16">
      <div className="text-[#F1F2F4] pl-2 text-2xl sm:text-3xl font-semibold border-l-4 rounded border-[#008000] mb-6">
        API Logs
      </div>

      <div className="overflow-x-auto border-gray-600 border rounded text-[#F1F2F4] bg-[rgb(30,34,41)]">
        <table className="w-full rounded overflow-hidden text-xs sm:text-sm md:text-base">
          <thead>
            <tr>
              <th className="border-t-2 border-gray-700 p-2">Method</th>
              <th className="border-t-2 border-gray-700 p-2">Endpoint</th>
              <th className="border-t-2 border-gray-700 p-2">Status</th>
              <th className="border-t-2 border-gray-700 p-2">IP</th>
              <th className="border-t-2 border-gray-700 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="text-center">
                  <td className="border-t-2 border-gray-700 p-2">{log.method}</td>
                  <td className="border-t-2 border-gray-700 p-2 break-words">{log.endpoint}</td>
                  <td className={`border-t-2 border-gray-700 p-2 ${getStatusColor(log.status_code)}`}>
                    {log.status_code}
                  </td>
                  <td className="border-t-2 border-gray-700 p-2">{log.ip_address}</td>
                  <td className="border-t-2 border-gray-700 p-2">{log.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 p-4">
                  No logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiLogs;
