"use client";

import { useEffect, useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Fetch logs
  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data);
      setLastUpdate(new Date().toLocaleString());
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // Determine threat level
  const getThreatLevel = (log: any) => {
    if (!log) return { level: "Normal", color: "bg-green-600" };
    const payload = (log.payload || "").toLowerCase();
    if (log.service === "sql" || payload.includes("drop") || payload.includes("delete") || payload.includes("root")) {
      return { level: "Critical", color: "bg-red-600 animate-pulse" };
    }
    if (payload.includes("select") || payload.includes("union") || log.service === "ssh") {
      return { level: "Medium", color: "bg-yellow-400 text-black" };
    }
    return { level: "Normal", color: "bg-green-600" };
  };

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesService = serviceFilter === "all" || log.service === serviceFilter;
      const matchesSearch =
        search === "" ||
        log.ip?.includes(search) ||
        log.payload?.toLowerCase().includes(search.toLowerCase());
      return matchesService && matchesSearch;
    });
  }, [logs, search, serviceFilter]);

  const serviceIcons: Record<string, string> = {
    ssh: "🛡️",
    http: "🌐",
    sql: "🗄️",
  };

  // Get country flag from IP (default India)
  const getFlag = (ip: string | undefined) => {
    if (!ip) return "🇮🇳";
    // For now, default to India 🇮🇳
    return "🇮🇳";
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0B111A] text-gray-100 p-4">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-10 flex flex-col md:flex-row justify-between items-center bg-[#0B111A]/90 backdrop-blur-sm p-4 border-b border-gray-700 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search IP or payload..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-[#101828] border border-gray-700 text-sm focus:ring-2 focus:ring-[#06A8F9] outline-none"
          />
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "ssh", "http", "sql"].map((svc) => (
            <button
              key={svc}
              onClick={() => setServiceFilter(svc)}
              className={`px-4 py-2 rounded font-semibold transition ${
                serviceFilter === svc
                  ? "bg-[#06A8F9] text-white"
                  : "bg-[#101828] text-gray-400 hover:bg-[#0C4663]"
              }`}
            >
              {svc.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400 mt-2 md:mt-0">
          Last Update: {lastUpdate || "--:--:--"}
        </div>
      </div>

      {/* Logs Grid */}
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 mt-10 animate-pulse">
            Loading logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 mt-10 italic">
            No logs match your filters.
          </div>
        ) : (
          filteredLogs.map((log, i) => {
            const threat = getThreatLevel(log);
            return (
              <div
                key={i}
                className="flex flex-col gap-2 p-4 rounded-lg border border-gray-700 bg-[#101828] hover:border-[#06A8F9] transition-all shadow-lg hover:shadow-[#06A8F9]/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lg">
                    <span>{serviceIcons[log.service] || "❓"}</span>
                    <span className="font-mono text-sm md:text-base">{log.ip || "-"}</span>
                    <span> (Country: {getFlag(log.ip)})</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${threat.color}`}>
                    {threat.level}
                  </div>
                </div>
                <div className="text-gray-400 text-xs md:text-sm">
                  {formatTimestamp(log.timestamp)}
                </div>
                <div className="font-mono break-words text-sm md:text-base">Payload: {log.command || "-"}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
