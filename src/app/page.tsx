import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-grid-pattern z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,168,249,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(6,168,249,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 flex h-full grow flex-col">

        {/* Hero Section */}
        <main className="container mx-auto px-4 flex-1">
          <div className="py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Deceive. Detect. Defend.
              <span className="block text-[#06a8f9]">Honeypot-as-a-Service</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
              HaaS provides a cutting-edge, cloud-based honeypot service designed
              to detect, analyze, and mitigate cyber threats in real-time. Turn
              the tables on attackers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg h-12 px-6 bg-[#0C4663] text-white font-bold glow-effect"
              >
                Get Started Free
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg h-12 px-6 bg-[#06A8F9] hover:bg-primary/30"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
              <p className="text-lg text-white/70 mt-2 max-w-2xl mx-auto">
                Explore the powerful capabilities of HaaS that make it the ideal
                choice for enhancing your cybersecurity posture.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Advanced Threat Detection",
                  desc: "Identify and analyze sophisticated cyber threats with our advanced honeypot technology.",
                },
                {
                  title: "Real-Time Monitoring",
                  desc: "Gain immediate insights into attack patterns and events through our dashboard.",
                },
                {
                  title: "Secure & Scalable",
                  desc: "Benefit from a secure, scalable, and reliable cloud-based service that adapts to your needs.",
                },
                {
                  title: "24/7 Support",
                  desc: "Our dedicated support team is available around the clock to assist you anytime.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light/50 dark:bg-background-dark/50 p-6 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all"
                >
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
