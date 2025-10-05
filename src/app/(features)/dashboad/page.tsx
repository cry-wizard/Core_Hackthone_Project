"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardPageClient() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    uniqueIPs: 0,
    topAttackType: "-",
    alerts: 0,
  });

  // Fetch logs from API every 5s
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/logs", { cache: "no-store" });
        const data = await res.json();
        setLogs(data);

        // Stats
        const totalAttacks = data.length;
        const uniqueIPs = new Set(data.map((l: any) => l.ip)).size;

        const typeCount: Record<string, number> = {};
        data.forEach((l: any) => {
          typeCount[l.service] = (typeCount[l.service] || 0) + 1;
        });
        const topAttackType =
          Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

        const alerts = data.filter(
          (l: any) =>
            (l.payload || "").toLowerCase().match(/drop|delete|root|union/i) ||
            l.service === "sql"
        ).length;

        setStats({ totalAttacks, uniqueIPs, topAttackType, alerts });
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Line chart: Attacks Over Time (last 7 days)
  const attacksOverTime = (() => {
    const map: Record<string, number> = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const key = day.toISOString().split("T")[0];
      map[key] = 0;
    }
    logs.forEach((log) => {
      const key = log.timestamp?.split("T")[0];
      if (key && key in map) map[key] += 1;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  })();

  // Pie chart: Attack Type Distribution
  const attackTypeData = (() => {
    const typeCount: Record<string, number> = {};
    logs.forEach((l) => {
      typeCount[l.service] = (typeCount[l.service] || 0) + 1;
    });
    return Object.entries(typeCount).map(([name, value]) => ({ name, value }));
  })();

  const COLORS = ["#06a8f9", "#9333ea", "#f59e0b", "#f43f5e", "#10b981"];

  return (
    <>
      <Head>
        <title>Honeypot Dashboard</title>
      </Head>

      <main className="font-display bg-background-light dark:bg-background-dark min-h-screen p-6 text-stone-900 dark:text-stone-100">
        <h2 className="text-3xl font-bold mb-6 text-neon-blue">
          Honeypot Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: "Total Attacks", value: stats.totalAttacks },
            { label: "Unique IPs", value: stats.uniqueIPs },
            { label: "Top Attack Type", value: stats.topAttackType },
            { label: "Alerts Triggered", value: stats.alerts, highlight: true },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white/5 dark:bg-black/20 p-4 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <p
                className={`text-2xl font-bold ${
                  card.highlight ? "text-red-500" : ""
                }`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Attacks Over Time */}
          <div className="lg:col-span-2 bg-white/5 dark:bg-black/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Attacks Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attacksOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06a8f9"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attack Types Pie */}
          <div className="bg-white/5 dark:bg-black/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Attack Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={attackTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={40}
                  label
                >
                  {attackTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="overflow-x-auto bg-white/5 dark:bg-black/20 rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">IP</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Payload</th>
                  <th className="px-6 py-3">Threat Level</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(-5).reverse().map((log, idx) => {
                  const payload = (log.payload || log.command || "").toLowerCase();
                  let level = "Normal";
                  let color = "text-green-400";
                  if (log.service === "sql" || payload.match(/drop|delete|root/i)) {
                    level = "Critical";
                    color = "text-red-500 font-bold";
                  } else if (payload.match(/select|union/i) || log.service === "ssh") {
                    level = "Medium";
                    color = "text-yellow-400 font-semibold";
                  }
                  return (
                    <tr
                      key={idx}
                      className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-[#16222D]"
                    >
                      <td className="px-6 py-4">{log.timestamp || "-"}</td>
                      <td className="px-6 py-4">{log.ip || "-"}</td>
                      <td className="px-6 py-4">{log.service || "-"}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{log.payload || log.command || "-"}</td>
                      <td className={`px-6 py-4 ${color}`}>{level}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
