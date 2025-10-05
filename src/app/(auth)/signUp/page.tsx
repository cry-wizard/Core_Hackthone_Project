"use client";

import Head from "next/head";
import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>HaaS Signup</title>
      </Head>

      <div className="relative min-h-screen flex items-center justify-center font-display bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-100 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 cyber-grid"></div>
        <div className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md"></div>

        {/* Signup card */}
        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-primary/30 bg-background-light/40 dark:bg-background-dark/40 shadow-2xl shadow-primary/20 backdrop-blur-xl p-10">
          {/* Branding */}
          <div className="flex flex-col items-center gap-4 text-center mb-8">
            <div className="flex items-center gap-3 text-primary">
              <svg
                className="h-12 w-12"
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
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                HaaS
              </h1>
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              Create your account to securely access your honeypots.
            </p>
          </div>

          {/* Clerk SignUp */}
          <SignUp
            appearance={{
              elements: {
                card: "bg-transparent shadow-none w-full",
                headerTitle: "text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2",
                headerSubtitle: "text-sm text-stone-600 dark:text-stone-400 mb-4",
                formFieldInput:
                  "w-full rounded-lg border-2 border-[#06a8f9] bg-background-light dark:bg-background-dark px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-[#0C4663] focus:outline-none transition-colors duration-300",
                formButtonPrimary:
                  "mt-4 w-full rounded-lg bg-[#06a8f9] py-3 text-base font-bold text-white shadow-lg shadow-[#06a8f9]/30 transition-transform hover:scale-105 hover:bg-[#0C4663]",
                footerActionLink: "text-[#06a8f9] hover:underline font-semibold",
              },
            }}
            routing="hash"
            signInUrl="/login"
          />
        </div>
      </div>
    </>
  );
}
