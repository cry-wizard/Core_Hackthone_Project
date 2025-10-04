import Link from 'next/link'
import React from 'react'

function header() {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between border-b border-primary/20 dark:border-primary/30 py-4">
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
              <nav className="hidden md:flex items-center gap-8">
                <Link href="#" className="text-sm font-medium hover:text-primary">
                  Features
                </Link>
                <Link href="/logs" className="text-sm font-medium hover:text-primary">
                  Log
                </Link>
                <Link href="/report" className="text-sm font-medium hover:text-primary">
                  Report
                </Link>
                <Link href="/setting" className="text-sm font-medium hover:text-primary">
                  Setting
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Link
                  href="/signUp"
                  className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#06A8F9] text-white text-sm font-bold hover:opacity-90"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#0C4663] text-sm font-bold hover:bg-primary/30 dark:hover:bg-primary/40"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </header>
  )
}

export default header