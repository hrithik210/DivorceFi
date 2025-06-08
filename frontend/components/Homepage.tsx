import React from 'react';
import { ChevronDown, Heart, Shield, Sparkles, Users, TrendingUp, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-rose-300/30 to-fuchsia-300/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Title with Glow Effect */}
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                Luvana
              </h1>
              <div className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent blur-lg opacity-50 tracking-tight">
                Luvana
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-px bg-gradient-to-r from-pink-400 to-rose-400"></div>
              <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-r from-rose-400 to-purple-400"></div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl text-gray-800 font-light leading-relaxed">
              Transform Love into Legacy
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create meaningful commitments backed by blockchain technology. Build trust, demonstrate dedication, and grow together.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 py-6">
            <div className="bg-pink-100/80 backdrop-blur-sm border border-pink-200 rounded-full px-6 py-3 text-gray-700 flex items-center space-x-2 hover:bg-pink-200/80 transition-colors duration-300">
              <Shield className="w-5 h-5 text-pink-600" />
              <span>Secure Commitment</span>
            </div>
            <div className="bg-rose-100/80 backdrop-blur-sm border border-rose-200 rounded-full px-6 py-3 text-gray-700 flex items-center space-x-2 hover:bg-rose-200/80 transition-colors duration-300">
              <TrendingUp className="w-5 h-5 text-rose-600" />
              <span>Grow Together</span>
            </div>
            <div className="bg-purple-100/80 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 text-gray-700 flex items-center space-x-2 hover:bg-purple-200/80 transition-colors duration-300">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Digital Legacy</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <button className="group relative bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:via-rose-500 hover:to-purple-500 text-white px-12 py-6 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300/50 shadow-2xl">
              <Link href='/mint'>
                <span className="relative z-10 flex items-center space-x-3">
                  <Lock className="w-6 h-6" />
                  <span>Create Your Commitment</span>
                </span>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </main>

      {/* Value Proposition Section */}
      <section className="relative z-10 bg-gradient-to-r from-white via-pink-25 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Commitment Made Tangible
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Move beyond words. Create lasting bonds through meaningful financial commitment and shared digital ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Deeper Commitment */}
            <div className="group bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-3xl border-2 border-transparent hover:border-pink-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-pink-400 to-rose-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Deeper Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                Demonstrate your dedication through meaningful financial stakes. Transform promises into proof of commitment.
              </p>
            </div>

            {/* Shared Growth */}
            <div className="group bg-gradient-to-br from-rose-50 to-purple-100 p-8 rounded-3xl border-2 border-transparent hover:border-rose-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-rose-400 to-purple-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Shared Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Build wealth together as your relationship NFT appreciates. Your love grows, your investment grows.
              </p>
            </div>

            {/* Trust & Transparency */}
            <div className="group bg-gradient-to-br from-purple-50 to-fuchsia-100 p-8 rounded-3xl border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Trust & Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Blockchain-secured agreements ensure fair, transparent terms. No hidden clauses, just clear commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 bg-gradient-to-br from-gray-800 via-pink-900/20 to-purple-900/20 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Simple. Powerful. Meaningful.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-400 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-semibold text-white">Commit Together</h3>
              <p className="text-pink-100 leading-relaxed">
                Both partners stake ETH to mint your unique relationship NFT. Equal investment, equal commitment.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-rose-400 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-semibold text-white">Grow Your Bond</h3>
              <p className="text-pink-100 leading-relaxed">
                Watch your commitment appreciate over time. Add milestones, celebrate anniversaries, build your digital legacy.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-400 to-fuchsia-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-semibold text-white">Fair Resolution</h3>
              <p className="text-pink-100 leading-relaxed">
                If paths diverge, smart contracts ensure fair, transparent distribution. No lawyers, no drama, just fairness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-pink-50/80 backdrop-blur-sm py-12 px-6 border-t border-pink-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            © 2025 Splitproof. Building lasting bonds through blockchain technology.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span className="hover:text-pink-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-pink-600 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-pink-600 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}