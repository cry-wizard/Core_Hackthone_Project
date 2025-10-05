"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import downloadIcon from "../../../../public/downloads.png";
import shareIcon from "../../../../public/share.png";
import Image from "next/image";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface Log {
  _id: string;
  type: string;
  service: string;
  ip: string;
  username?: string;
  password?: string;
  command?: string;
  timestamp: string;
  geo: {
    country: string;
    city: string;
    lat: number;
    lon: number;
    isp: string;
    org: string;
  };
}

export default function ReportsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  // Fetch logs
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      }
    }
    fetchLogs();
  }, []);

  // Generate weekly reports
  useEffect(() => {
    if (!logs.length) return;

    const grouped: Record<string, Log[]> = {};
    logs.forEach((log) => {
      const weekStart = dayjs(log.timestamp).startOf("week").format("YYYY-MM-DD");
      if (!grouped[weekStart]) grouped[weekStart] = [];
      grouped[weekStart].push(log);
    });

    const weeklyReports = Object.entries(grouped)
      .map(([weekStart, logs]) => ({
        weekStart,
        totalAttacks: logs.length,
        summary: generateSummary(logs),
        logs,
      }))
      .sort((a, b) => (dayjs(b.weekStart).isAfter(dayjs(a.weekStart)) ? 1 : -1));

    setReports(weeklyReports);
  }, [logs]);

  function generateSummary(logs: Log[]) {
    const ipCount: Record<string, number> = {};
    const types: Record<string, number> = {};

    logs.forEach((log) => {
      ipCount[log.ip] = (ipCount[log.ip] || 0) + 1;
      types[log.type] = (types[log.type] || 0) + 1;
    });

    const topIPs = Object.entries(ipCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ip]) => ip)
      .join(", ");

    const topTypes = Object.entries(types)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type)
      .join(", ");

    return { topIPs, topTypes };
  }

  function downloadJSON(logs: Log[], weekStart: string) {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `honeypot_logs_week_${weekStart}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function shareJSON(logs: Log[], weekStart: string) {
    if (navigator.share) {
      const file = new File([JSON.stringify(logs, null, 2)], `honeypot_logs_week_${weekStart}.json`, {
        type: "application/json",
      });
      navigator
        .share({
          title: `HaaS Honeypot Logs - Week of ${weekStart}`,
          text: "Check out this honeypot report!",
          files: [file],
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing not supported on this browser. Please download instead.");
    }
  }

  return (
    <div
      className={`flex h-screen flex-col bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 ${spaceGrotesk.className}`}
    >
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Weekly Reports</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No reports generated yet.</div>
          )}

          {reports.map((report, i) => (
            <div
              key={i}
              className="bg-[#101828] dark:bg-[#1A1F2B] rounded-lg p-6 shadow-lg hover:shadow-[#06A8F9]/50 transition-all border border-gray-700 dark:border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Week of {dayjs(report.weekStart).format("MMMM D, YYYY")}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm">
                    Total Attacks: <span className="font-bold text-red-400">{report.totalAttacks}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadJSON(report.logs, report.weekStart)}
                    className="p-2 bg-[#06a8f9] rounded-lg hover:bg-[#0591d2] transition"
                  >
                    <Image src={downloadIcon} alt="download" width={18} height={18} />
                  </button>
                  <button
                    onClick={() => shareJSON(report.logs, report.weekStart)}
                    className="p-2 bg-[#0ccf5f] rounded-lg hover:bg-[#09b84d] transition"
                  >
                    <Image src={shareIcon} alt="share" width={18} height={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Top IPs:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.summary.topIPs.split(", ").map((ip: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#06A8F9]/20 rounded-full text-xs text-blue-200 font-mono"
                      >
                        {ip}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Top Attack Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.summary.topTypes.split(", ").map((type: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#0ccf5f]/20 rounded-full text-xs text-green-200 font-mono"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
