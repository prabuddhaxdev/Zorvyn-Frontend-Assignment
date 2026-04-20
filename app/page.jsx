import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { features } from "@/data/features";
import { howItWorksData } from "@/data/howitworks";
import HeroSection from "@/components/Hero";
import { stats } from "@/data/stats";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight text-zinc-900 dark:text-white">
            Smart Expense Tracking ,{" "}
            <span className="text-green-500">Simplified</span>
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto text-lg">
            Transform how you manage expenses with AI-powered receipt scanning,
            real-time insights, and seamless transaction tracking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500/10 via-transparent to-transparent dark:from-green-400/10" />

        {/* ✨ Center Content */}
        <div className="max-w-3xl mx-auto text-center px-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Intelligent{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Receipt Processing
            </span>
          </h2>

          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Transform any receipt into structured data instantly with our
            advanced AI technology. No more manual typing, no more errors—just
            intelligent automation.
          </p>
        </div>

        {/* 📊 Stats */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="relative group rounded-2xl p-[1px] 
            bg-gradient-to-b from-white/20 to-white/5 
            dark:from-white/10 dark:to-white/5"
                >
                  {/* Glass Card */}
                  <div
                    className="
                flex flex-col items-center text-center p-8 rounded-2xl
  bg-white/5 dark:bg-white/5
  backdrop-blur-xl
  border border-white/30 dark:border-white/10
  shadow-lg
  transition-all duration-300
  group-hover:-translate-y-1
  group-hover:shadow-green-500/20
              "
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 mb-4">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>

                    {/* Number */}
                    <div className="text-4xl md:text-5xl font-bold text-green-400 tracking-tight tabular-nums">
                      {stat.number}
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 dark:bg-green-500 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>

          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with FinSync
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-green-600 px-8 py-6 dark:text-green-400 
  rounded-xl font-semibold text-lg shadow-lg cursor-pointer
  transition-colors duration-300  transform-gpu
  hover:bg-gray-50 hover:scale-105 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
