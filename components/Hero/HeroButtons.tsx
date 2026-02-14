"use client";

import React from 'react';

export const HeroActions = () => {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Primary CTA */}
      <button 
        onClick={() => document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 animate-breathing"
      >
        See if this fits your business
      </button>

      {/* Secondary CTA */}
      <button 
        onClick={() => console.log("Contact Modal Opened")}
        className="px-8 py-4 text-slate-600 font-medium hover:text-slate-900 transition-colors"
      >
        Ask a quick question
      </button>

      <style jsx>{`
        @keyframes breathing {
          0%, 100% { box-shadow: 0 0 0 0px rgba(15, 23, 42, 0.1); transform: scale(1); }
          50% { box-shadow: 0 0 0 15px rgba(15, 23, 42, 0.05); transform: scale(1.01); }
        }
        .animate-breathing {
          animation: breathing 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};