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

  // Fetch logs from backend
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

  // Generate weekly reports dynamically
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

  // Generate summary string
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

    return `Top IPs: ${topIPs}; Top Types: ${topTypes}`;
  }

  // Download JSON file
  function downloadJSON(logs: Log[], weekStart: string) {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `honeypot_logs_week_${weekStart}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Share JSON file
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
      alert("Sharing is not supported on this browser. Please download the file instead.");
    }
  }

  return (
    <div
      className={`flex h-screen flex-col bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 ${spaceGrotesk.className}`}
    >
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h2>
          </div>

          {/* Reports table */}
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Generated Reports
              </h3>
              <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg border border-gray-200/20 dark:border-white/10">
                      <table className="min-w-full divide-y divide-gray-200/20 dark:divide-white/10">
                        <thead className="bg-gray-500/5 dark:bg-white/5">
                          <tr>
                            <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                              Week Start
                            </th>
                            <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                              Total Attacks
                            </th>
                            <th className="w-2/4 px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                              Summary
                            </th>
                            <th className="relative py-3 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/10 dark:divide-white/10 bg-background-light dark:bg-background-dark">
                          {reports.map((report, i) => (
                            <tr key={i}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                {dayjs(report.weekStart).format("MMMM D, YYYY")}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                {report.totalAttacks}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                {report.summary}
                              </td>
                              <td className="flex items-center justify-end gap-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <button
                                  onClick={() => downloadJSON(report.logs, report.weekStart)}
                                  className="inline-flex items-center gap-2 rounded-lg bg-[#06a8f9] px-7 py-1.5 text-sm font-semibold text-white hover:bg-primary/20"
                                >
                                  <Image alt="download" src={downloadIcon} width={15} height={15} />
                                  JSON
                                </button>
                                <button
                                  onClick={() => shareJSON(report.logs, report.weekStart)}
                                  className="inline-flex items-center gap-2 rounded-lg bg-[#0ccf5f] px-7 py-1.5 text-sm font-semibold text-white hover:bg-green-600"
                                >
                                  <Image alt="share" src={shareIcon} width={15} height={15} />
                                  Share
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Settings */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Report Settings
              </h3>
              <div className="mt-4 rounded-lg border border-gray-200/20 dark:border-white/10 bg-background-light dark:bg-background-dark p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="weekly-reports"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-2 focus:ring-primary dark:focus:ring-offset-background-dark"
                    />
                    <label
                      htmlFor="weekly-reports"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Auto-generate Weekly Reports
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="monthly-reports"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-primary focus:ring-2 focus:ring-primary dark:focus:ring-offset-background-dark"
                    />
                    <label
                      htmlFor="monthly-reports"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Auto-generate Monthly Reports
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
