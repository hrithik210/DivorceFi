import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function DivorcifyHomepage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 tracking-tight">
              Divorcify
            </h1>
            <div className="w-16 h-px bg-rose-400 mx-auto"></div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            Stake Love. Split Fair.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href={"/mint"}>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                Mint Your Relationship
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </main>

      {/* Explanation Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
              Breaking Up Just Got Smarter
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Divorcify lets you mint a relationship NFT by staking ETH. When it's over, 
              break up and split the stake. Simple. Smart. Secure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2025 Divorcify. Love responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}