import Head from "next/head";
// import './style.css'
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Head>
        <title>HaaS Signup</title>
      </Head>

      <div className="font-display bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-100 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid"></div>
        <div className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm"></div>

        <div className="relative z-10 flex w-full max-w-md flex-col gap-8 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3 text-primary">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                <path d="M15 19L24 24L33 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                <path d="M15 29L24 34L33 29" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                <path d="M24 4V44" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
              </svg>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">HaaS</h1>
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              Create your account to securely access your honeypots.
            </p>
          </div>

          <div className="flex w-full rounded-lg bg-background-light/50 dark:bg-background-dark/50 shadow-2xl shadow-primary/10 backdrop-blur-md">
            <div className="w-full rounded-lg border border-primary/20 p-8">
              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="w-full rounded-lg border-2 border-[#06a8f9] bg-background-light dark:bg-background-dark px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300"
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full rounded-lg border-2 border-[#06a8f9] bg-background-light dark:bg-background-dark px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300"
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full rounded-lg border-2 border-[#06a8f9] bg-background-light dark:bg-background-dark px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300"
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg border-2 border-[#06a8f9] bg-background-light dark:bg-background-dark px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#06a8f9] py-3 text-base font-bold text-white transition-transform duration-300 hover:scale-105"
                >
                  Sign Up
                </button>
                <p className="text-center text-sm text-stone-600 dark:text-stone-400">
                  Already have an account?{" "}
                  <Link className="font-semibold text-[#06a8f9] hover:underline" href="/">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
