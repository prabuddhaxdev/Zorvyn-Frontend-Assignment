"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-40 pb-20 px-4 bg-white dark:bg-zinc-950 transition-colors">
      {/* subtle green glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/40 via-transparent to-transparent dark:from-green-900/20" />

      <div className="container mx-auto text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-[90px] pb-6 font-bold tracking-tight">
          <span className="text-zinc-900 dark:text-white">
            Manage Your Finances
          </span>
          <br />
          <span className="text-green-500 font-semibold">
            with Intelligence
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
            >
              Get Started
            </Button>
          </Link>

          <Link href="https://github.com/prabuddhaxdev/FinSync">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="hero-image-wrapper mt-10">
          <div
            ref={imageRef}
            className="hero-image transition-all duration-500"
          >
            {/* Light mode image */}
            <Image
              src="/hero-light.png"
              width={1280}
              height={720}
              alt="Dashboard Preview Light"
              className="rounded-xl shadow-2xl border border-zinc-200 mx-auto block dark:hidden w-full max-w-[100%] h-auto "
              priority
            />

            {/* Dark mode image */}
            <Image
              src="/hero-dark.png"
              width={1280}
              height={720}
              alt="Dashboard Preview Dark"
              className="rounded-xl shadow-2xl border border-zinc-800 mx-auto hidden dark:block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
