import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      {/* Content */}
      <Suspense
        fallback={
          <div className="mt-6">
            <BarLoader width="100%" color="#22c55e" />
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
