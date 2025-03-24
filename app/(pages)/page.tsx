"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-200 text-center p-4">
      <main className="flex flex-col-reverse md:flex-row items-center gap-10 lg:gap-20 max-w-6xl w-full">
        
        {/* Text Content */}
        <div className="flex flex-col gap-7 justify-center text-center md:text-left items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Welcome to <span className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-orange-500">Biz-Metrics</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-md">
            Biz-Metrics is your go-to platform for business analytics, providing real-time insights into user engagement, sales performance, and operational efficiency. Empower your business with data-driven decisions and seamless reporting tools.
          </p>

          {/* CTA Button */}
          <Link href="/login">
            <button className="py-3 px-8 sm:py-4 sm:px-12 font-extrabold rounded-md bg-black hover:scale-110 active:scale-105 shadow-md text-white hover:bg-orange-500 transition-all">
              Get Started
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex justify-center w-full">
          <Image 
            src="/bg.png" 
            alt="Biz-Metrics Logo" 
            width={900} 
            height={800} 
            className="w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto mx-auto"
            priority
          />
        </div>

      </main>
    </section>
  );
}
