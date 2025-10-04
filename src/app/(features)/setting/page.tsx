"use client";

import { Space_Grotesk } from "next/font/google";
import lock from "../../../../public/lock.png";
import Mobile from "../../../../public/password.png";

import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const inputClasses =
  "mt-1 block w-full h-10 p-3 rounded-md border border-white bg-[#0E1A22] text-gray-200 focus:border-blue-600 focus:ring-neon-blue";

const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark";

export default function SettingsPage() {
  const profileFields = [
    { id: "name", label: "Name", type: "text", defaultValue: "Alex Morgan" },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      defaultValue: "alex.morgan@cybercorp.com",
    },
    {
      id: "organization",
      label: "Organization",
      type: "text",
      defaultValue: "CyberCorp Inc.",
    },
  ];

  const honeypots = [
    { name: "SSH-01 (Ubuntu 20.04)", date: "2024-07-10", ip: "192.168.1.15" },
    { name: "HTTP-WebServ (Apache)", date: "2024-06-25", ip: "192.168.1.18" },
    { name: "SQL-DataStore", date: "2024-05-12", ip: "192.168.1.22" },
  ];

  const notifications = [
    {
      title: "Email Alerts",
      subtitle: "Receive alerts via email",
      checked: true,
    },
    {
      title: "Slack Integration",
      subtitle: "Send notifications to a Slack channel",
      checked: false,
    },
    {
      title: "Webhook Integration",
      subtitle: "Push alerts to a custom webhook",
      checked: true,
    },
  ];

  return (
    <div
      className={`flex flex-col bg-background-dark font-display text-gray-200 ${spaceGrotesk.className}`}
    >
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Settings</h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Settings */}
              <div className="rounded-xl border border-white/10 bg-background-dark/50 p-6 shadow-lg shadow-black/20">
                <h3 className="text-xl font-bold text-[#39FF14]">
                  Profile Settings
                </h3>
                <div className="mt-6 space-y-4">
                  {profileFields.map((field) => (
                    <div key={field.id}>
                      <label
                        className="block text-sm font-medium text-gray-300"
                        htmlFor={field.id}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        defaultValue={field.defaultValue}
                        className={inputClasses}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    className={`${buttonBaseClasses} bg-[#00DFFC] text-black hover:bg-neon-blue/80 focus:ring-neon-blue`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Honeypot Management */}
              <div className="rounded-xl border border-white/10 bg-background-dark/50 p-6 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#39FF14]">
                    Honeypot Management
                  </h3>
                  <button
                    className={`${buttonBaseClasses} bg-[#39FF14] text-black hover:bg-[#37ff1495] focus:ring-neon-green`}
                  >
                    <span className="material-symbols-outlined -ml-1 mr-2 text-base">
                      +
                    </span>
                    Deploy New Honeypot
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <ul className="divide-y divide-white/10" role="list">
                    {honeypots.map((hp, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 rounded-full bg-neon-green shadow-[0_0_10px_theme(colors.neon-green)]"></div>
                          <div>
                            <p className="font-medium text-white">{hp.name}</p>
                            <p className="text-sm text-gray-400">
                              Deployed: {hp.date} | IP: {hp.ip}
                            </p>
                          </div>
                        </div>
                        <button className="rounded-lg bg-[#3F1626] px-3 py-1.5 text-sm font-semibold text-[#F80132] hover:bg-[#3f1626b3]">
                          Decommission
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Notification Settings */}
              <div className="rounded-xl border border-white/10 bg-background-dark/50 p-6 shadow-lg shadow-black/20">
                <h3 className="text-xl font-bold text-[#8622C7]">
                  Notification Settings
                </h3>
                <div className="mt-6 space-y-4">
                  {notifications.map((notif, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="flex flex-grow flex-col">
                        <span className="text-sm font-medium text-gray-200">
                          {notif.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {notif.subtitle}
                        </span>
                      </span>
                      <button
                        aria-checked={notif.checked}
                        className="form-switch bg-gray-600"
                        role="switch"
                        type="button"
                      >
                        <span
                          className={`form-switch-translate ${
                            notif.checked
                              ? "translate-x-5 bg-neon-purple"
                              : "translate-x-0 bg-white"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="rounded-xl border border-white/10 bg-background-dark/50 p-6 shadow-lg shadow-black/20">
                <h3 className="text-xl font-bold text-[#8622C7]">
                  Security Settings
                </h3>
                <div className="mt-6 space-y-4">
                  {/* Reset Password */}
                  <button
                    className={`${buttonBaseClasses} w-full border border-neon-blue/50 bg-[#0D2F39] text-[#02C5DF] 
    hover:bg-[#02C5DF]/10 focus:ring-[#02C5DF] flex items-center gap-2 transition-colors duration-200`}
                  >
                    <Image src={lock} alt="Lock icon" width={18} height={18} />
                    Reset Password
                  </button>

                  {/* 2FA */}
                  <button
                    className={`${buttonBaseClasses} w-full border hover:bg-[#02C5DF]/10 border-neon-blue/50 bg-[#0D2F39] text-[#02C5DF] hover:bg-neon-blue/20 focus:ring-neon-blue flex items-center gap-2`}
                  >
                    <Image src={Mobile} alt="Lock icon" width={18} height={18} />
                    Enable Two-Factor Authentication (2FA)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
