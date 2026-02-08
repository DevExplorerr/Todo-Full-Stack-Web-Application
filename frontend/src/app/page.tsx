import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield } from "lucide-react";
import { ThemeToggle } from "../components/layout/ThemeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 lg:px-8">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          TaskFlow
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="hidden sm:inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Organize your work, <br />
              <span className="text-blue-600 dark:text-blue-500">amplify your life.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The evolution of the Todo list. Simple enough for your daily groceries, powerful enough for your career goals. Built with modern tech for modern people.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="group rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center gap-2"
              >
                Start for free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:underline">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Built on FastAPI and Next.js for instant interactions without the lag."
              },
              {
                icon: Shield,
                title: "Secure by Design",
                desc: "Enterprise-grade authentication with Argon2 encryption keeping your data safe."
              },
              {
                icon: CheckCircle2,
                title: "Simple & Clean",
                desc: "A distraction-free interface designed to help you focus on what matters."
              }
            ].map((feature, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-8 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}