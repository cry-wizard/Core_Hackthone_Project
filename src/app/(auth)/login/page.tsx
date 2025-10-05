"use client";

import Head from "next/head";
import { SignIn } from "@clerk/nextjs";
import "./style.css";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>HaaS Login</title>
      </Head>

      <div className="font-display bg-gradient-to-b from-[#0f1c23] to-[#061d2d] text-stone-100 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Glowing grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(6,168,249,0.2) 1px, transparent 1px), radial-gradient(circle, rgba(6,168,249,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 dark:bg-black/30 shadow-2xl shadow-[#06a8f9]/20 backdrop-blur-xl border border-[#06a8f9]/30 flex flex-col gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3 text-[#06a8f9]">
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4L6 14V34L24 44L42 34V14L24 4Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <path
                  d="M15 19L24 24L33 19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <path
                  d="M15 29L24 34L33 29"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <path
                  d="M24 4V44"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
              </svg>
              <h1 className="text-3xl font-bold text-white">HaaS</h1>
            </div>
            <p className="text-stone-300">
              Welcome back. Securely access your honeypots.
            </p>
          </div>

          {/* Clerk SignIn Component */}
          <div className="w-full">
            <SignIn
              appearance={{
                baseTheme: "dark",
                elements: {
                  card: "bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-[#06a8f9]/30",
                  formButtonPrimary:
                    "bg-[#06a8f9] hover:bg-[#0C4663] text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105",
                  socialButtons: "rounded-lg border border-[#06a8f9]/50",
                  formFieldInput: "bg-white/10 text-white placeholder:text-stone-400 border border-[#06a8f9]/30 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#06a8f9]",
                },
              }}
              routing="hash"
              signUpUrl="/signup"
            />
          </div>

          {/* Footer link */}
          <p className="text-center text-stone-300 mt-2">
            Don’t have an account?{" "}
            <a
              className="text-[#06a8f9] font-semibold hover:underline"
              href="/signUp"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
