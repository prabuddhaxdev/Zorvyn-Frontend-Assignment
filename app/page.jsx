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

      {/* Stats */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>

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
              className="bg-white text-green-600 hover:bg-green-50 dark:bg-zinc-900 dark:text-green-400 dark:hover:bg-zinc-800"
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
