"use client";
import { useEffect, useState } from "react";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("❌ Failed to fetch logs:", err);
      }
    }

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // classify threat level
  // classify threat level
function getThreatLevel(log: any) {
  if (!log) return { level: "Normal", color: "text-green-400" };

  const payload = (log.payload || "").toLowerCase();

  // 🚨 Force SQL service logs to be Critical
  if (log.service === "sql") {
    return { level: "Critical", color: "text-red-500 font-bold" };
  }

  // 🚨 Payloads with dangerous keywords
  if (payload.includes("drop") || payload.includes("delete") || payload.includes("root")) {
    return { level: "Critical", color: "text-red-500 font-bold" };
  }

  // ⚠️ Suspicious but not fully critical
  if (payload.includes("select") || payload.includes("union") || log.service === "ssh") {
    return { level: "Medium", color: "text-yellow-400 font-semibold" };
  }

  // ✅ Default safe
  return { level: "Normal", color: "text-green-400" };
}


  // Apply filters
  const filteredLogs = logs.filter((log) => {
    const matchesService =
      serviceFilter === "all" || log.service === serviceFilter;
    const matchesSearch =
      search === "" ||
      log.ip?.includes(search) ||
      log.payload?.toLowerCase().includes(search.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="p-6 bg-background-dark text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-neon-blue">Real-time Logs</h2>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by IP or payload..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-[#0E1A22] border border-white/20 text-sm"
        />

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="p-2 rounded bg-[#0E1A22] border border-white/20 text-sm"
        >
          <option value="all">All Services</option>
          <option value="ssh">SSH</option>
          <option value="http">HTTP</option>
          <option value="sql">SQL</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#0D2F39] text-neon-blue">
            <tr>
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Source IP</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Payload</th>
              <th className="px-4 py-2 text-left">Threat Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, i) => {
                const threat = getThreatLevel(log);
                return (
                  <tr
                    key={i}
                    className="border-t border-white/10 hover:bg-[#16222D]"
                  >
                    <td className="px-4 py-2">{log.timestamp || "-"}</td>
                    <td className="px-4 py-2">{log.ip || "-"}</td>
                    <td className="px-4 py-2">{"India"}</td>
                    <td className="px-4 py-2">{log.service || "-"}</td>
                    <td className="px-4 py-2">{log.command || "-"}</td>
                    <td className={`px-4 py-2 ${threat.color}`}>
                      {threat.level}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-400 italic"
                >
                  No logs match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
