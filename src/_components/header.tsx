"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between border-b border-primary/20 dark:border-primary/30 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-[#06a8f9]">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L4 16V32L24 44L44 32V16L24 4Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M4 16L24 28L44 16"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M24 44V28"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-white">HaaS</h2>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium hover:text-[#06a8f9] transition">
              DashBoard
            </Link>
            <Link href="/documents" className="text-sm font-medium hover:text-[#06a8f9] transition">
              Docs
            </Link>
            <Link href="/logs" className="text-sm font-medium hover:text-[#06a8f9] transition">
              Log
            </Link>
            <Link href="/report" className="text-sm font-medium hover:text-[#06a8f9] transition">
              Report
            </Link>
            <Link href="/setting" className="text-sm font-medium hover:text-[#06a8f9] transition">
              Setting
            </Link>
          </nav>

          {/* User / Auth Buttons */}
          <div className="flex items-center gap-3">
            {isSignedIn && user ? (
              <div className="flex items-center gap-4 bg-background-light/30 dark:bg-background-dark/30 rounded-lg px-4 py-2 shadow-lg border border-primary/20">
                {/* Profile Picture */}
                {user.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-[#06a8f9] shadow-md"
                  />
                )}

                {/* User Info */}
                <div className="flex flex-col text-white">
                  <span className="font-semibold text-lg">{user.firstName || user.username}</span>
                  <span className="text-sm text-stone-300">{user.emailAddresses[0]?.emailAddress}</span>
                </div>

                {/* Log Out Button */}
                <SignOutButton>
                  <button className="ml-4 px-4 py-2 bg-[#0C4663] hover:bg-[#06a8f9] transition-all text-white rounded-lg shadow-md font-semibold hover:scale-105">
                    Log Out
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <>
                <Link
                  href="/signUp"
                  className="flex items-center justify-center rounded-lg h-10 px-5 bg-gradient-to-r from-[#06a8f9] to-[#0C4663] text-white text-sm font-bold shadow-lg hover:from-[#0C4663] hover:to-[#06a8f9] transition-transform hover:scale-105"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center rounded-lg h-10 px-5 bg-gradient-to-r from-[#0C4663] to-[#06a8f9] text-white text-sm font-bold shadow-lg hover:from-[#06a8f9] hover:to-[#0C4663] transition-transform hover:scale-105"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
