"use client";

import { Space_Grotesk } from "next/font/google";
import { FaTerminal, FaDatabase, FaServer } from "react-icons/fa";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function HoneypotDocs() {
  const honeypots = [
    {
      name: "SSH Honeypot",
      description:
        "Simulates an SSH server. Captures authentication attempts and commands entered by attackers.",
      dockerImage: "ssh-honeypot",
      port: 2222,
      env: [{ name: "COLLECTOR_URL", default: "http://localhost:3001" }],
      icon: <FaServer className="text-[#39FF14] inline-block mr-2" />,
    },
    {
      name: "HTTP Honeypot",
      description:
        "Simulates a vulnerable HTTP server. Logs HTTP requests and attacks like XSS or SQLi attempts.",
      dockerImage: "http-honeypot",
      port: 8080,
      env: [{ name: "COLLECTOR_URL", default: "http://localhost:3001" }],
      icon: <FaTerminal className="text-[#FF6F61] inline-block mr-2" />,
    },
    {
      name: "SQL Honeypot",
      description:
        "Simulates a MySQL/MariaDB database. Captures SQL injection attempts and connection logs.",
      dockerImage: "sql-honeypot",
      port: 13306,
      env: [{ name: "COLLECTOR_URL", default: "http://localhost:3001" }],
      icon: <FaDatabase className="text-[#00DFFC] inline-block mr-2" />,
    },
  ];

  const runCommand = (image: string, port: number) =>
    `docker run -d -p ${port}:${port} ${image}`;

  return (
    <div
      className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen p-8 ${spaceGrotesk.className}`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-[#39FF14] mb-2">
          Honeypot Deployment Guide
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Complete documentation for running, monitoring, and managing SSH,
          HTTP, and SQL honeypots in Docker containers.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-3 mb-12">
        {honeypots.map((hp) => (
          <div
            key={hp.name}
            className="rounded-xl border border-white/10 bg-gray-800/70 p-6 shadow-lg shadow-black/50 hover:shadow-[#39FF14]/50 transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-[#39FF14] mb-3 flex items-center">
              {hp.icon} {hp.name}
            </h2>
            <p className="text-gray-300 mb-4">{hp.description}</p>

            <div className="mb-3">
              <span className="font-semibold text-gray-200 mr-2">Docker Image:</span>
              <span className="bg-indigo-700 text-white px-2 py-1 rounded font-mono text-sm">
                {hp.dockerImage}
              </span>
            </div>

            <div className="mb-3">
              <span className="font-semibold text-gray-200 mr-2">Port:</span>
              <span className="bg-purple-700 text-white px-2 py-1 rounded font-mono text-sm">
                {hp.port}
              </span>
            </div>

            <div className="mb-3">
              <span className="font-semibold text-gray-200 mb-1 block">Environment Variables:</span>
              {hp.env.map((e) => (
                <span
                  key={e.name}
                  className="block bg-green-700 text-white px-2 py-1 rounded font-mono text-sm mb-1"
                >
                  {e.name}: {e.default}
                </span>
              ))}
            </div>

            <div className="mb-3">
              <span className="font-semibold text-gray-200 mb-1 block">Run Command:</span>
              <code className="block bg-gray-900 p-2 rounded text-sm font-mono text-[#00DFFC]">
                {runCommand(hp.dockerImage, hp.port)}
              </code>
            </div>

            <p className="text-gray-400 text-sm mt-2">
              Run in detached mode. Bind to port {hp.port}. Logs are available via{" "}
              <span className="font-mono text-[#FF6F61]">docker logs &lt;container-id&gt;</span>.
            </p>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#39FF14] mb-4">General Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300 text-lg">
          <li>Ensure Docker is installed and running on your machine.</li>
          <li>Use the provided Docker run commands to start each honeypot container.</li>
          <li>
            Monitor logs using{" "}
            <span className="font-mono text-[#00DFFC]">docker logs &lt;container-id&gt;</span>.
          </li>
          <li>
            All honeypot data is sent to the collector service defined in{" "}
            <span className="font-mono text-[#00DFFC]">COLLECTOR_URL</span>.
          </li>
          <li>Stop a honeypot using <span className="font-mono text-[#FF6F61]">docker rm -f &lt;container-id&gt;</span>.</li>
          <li>For production, map ports carefully and consider firewalls and network isolation.</li>
          <li>Review logs regularly to detect attacks and ensure your honeypots are functioning.</li>
        </ol>
      </section>
    </div>
  );
}
