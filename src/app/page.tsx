"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import eye from "../../public/eye.png";
import Sheild from "../../public/sheild.png";
import clock from "../../public/timer.png";
import lock from "../../public/userlock.png";

export default function Home() {
  const features = [
    {
      image: Sheild,
      title: "Advanced Threat Detection",
      desc: "Identify and analyze sophisticated cyber threats with our advanced honeypot technology.",
    },
    {
      image: eye,
      title: "Real-Time Monitoring",
      desc: "Gain immediate insights into attack patterns and events through our dashboard.",
    },
    {
      image: lock,
      title: "Secure & Scalable",
      desc: "Benefit from a secure, scalable, and reliable cloud-based service that adapts to your needs.",
    },
    {
      image: clock,
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock to assist you anytime.",
    },
  ];

  // Optional: Add simple fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#0A1B2A] via-[#0C4663]/20 to-[#0A1B2A] animate-bg-gradient">
      {/* Background Glow Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#06A8F9]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#0CF9B1]/20 rounded-full blur-2xl animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <main className="container mx-auto px-4 flex-1">
          <div className="py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Deceive. Detect. Defend.
              <span className="block text-[#06a8f9] mt-2">Honeypot-as-a-Service</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-on-scroll opacity-0 transition-opacity duration-700">
              HaaS provides a cutting-edge, cloud-based honeypot service designed
              to detect, analyze, and mitigate cyber threats in real-time. Turn
              the tables on attackers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/signUp"
                className="flex items-center justify-center rounded-lg h-12 px-6 bg-[#0C4663] text-white font-bold glow-effect hover:scale-105 transition-transform"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboad"
                className="flex items-center justify-center rounded-lg h-12 px-6 bg-[#06A8F9] hover:bg-primary/30 transition-all"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll opacity-0 transition-opacity duration-700">
                Key Features
              </h2>
              <p className="text-lg text-white/70 mt-2 max-w-2xl mx-auto animate-on-scroll opacity-0 transition-opacity duration-700 delay-100">
                Explore the powerful capabilities of HaaS that make it the ideal
                choice for enhancing your cybersecurity posture.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 p-6 backdrop-blur-sm hover:border-primary/40 hover:scale-105 hover:shadow-glow transition-all animate-on-scroll opacity-0"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="flex"
                  />
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 10px #06a8f9, 0 0 20px #06a8f9;
        }
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 20px #06a8f9, 0 0 40px #06a8f9;
        }
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .animate-bg-gradient {
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow {
          animation: pulse 6s infinite;
        }
        .animate-pulse-slower {
          animation: pulse 10s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
