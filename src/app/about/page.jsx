import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 flex flex-col items-center">
        <img
          src="/about.jpg"
          alt="About EmployaX"
          className="w-full max-w-md rounded-lg shadow-lg mb-8"
        />
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-6">
            Shaping Careers, Empowering Dreams at Employa<span className="text-amber-700">X</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-800 mb-6 max-w-2xl mx-auto">
            At EmployaX, we believe that careers are more than jobs — they are journeys. 
            Our platform bridges ambition with opportunity, helping you discover roles that fuel your growth and passion.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-amber-100 py-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">
            Unlock Your Next Big Opportunity
          </h2>
          <p className="text-lg md:text-xl text-amber-800 mb-8">
            Thousands have already taken the first step towards meaningful work — it's your turn to shine.
          </p>
          <Link href="/jobs" className="inline-block">
            <span className="px-8 py-3 rounded-full bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-300">
              Explore Opportunities
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
