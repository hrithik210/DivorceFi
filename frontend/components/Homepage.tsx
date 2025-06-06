import React from 'react';
import { ChevronDown, Heart, Shield, Sparkles, Users, TrendingUp, Lock } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Title with Glow Effect */}
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
                Splitproof
              </h1>
              <div className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent blur-lg opacity-50 tracking-tight">
                Splitproof
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-yellow-400"></div>
              <Heart className="w-6 h-6 text-red-400 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-r from-yellow-400 to-orange-400"></div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl text-white font-light leading-relaxed">
              Transform Love into Legacy
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Create meaningful commitments backed by blockchain technology. Build trust, demonstrate dedication, and grow together.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 py-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>Secure Commitment</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span>Grow Together</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Digital Legacy</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <button className="group relative bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange-500 hover:from-emerald-600 hover:via-yellow-600 hover:to-orange-600 text-white px-12 py-6 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50 shadow-2xl">
              <span className="relative z-10 flex items-center space-x-3">
                <Lock className="w-6 h-6" />
                <span>Create Your Commitment</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-yellow-600 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </main>

      {/* Value Proposition Section */}
      <section className="relative z-10 bg-gradient-to-r from-white via-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Commitment Made Tangible
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Move beyond words. Create lasting bonds through meaningful financial commitment and shared digital ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Deeper Commitment */}
            <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border-2 border-transparent hover:border-emerald-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Deeper Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                Demonstrate your dedication through meaningful financial stakes. Transform promises into proof of commitment.
              </p>
            </div>

            {/* Shared Growth */}
            <div className="group bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border-2 border-transparent hover:border-orange-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Shared Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Build wealth together as your relationship NFT appreciates. Your love grows, your investment grows.
              </p>
            </div>

            {/* Trust & Transparency */}
            <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-3xl border-2 border-transparent hover:border-yellow-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
      <section className="relative z-10 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Simple. Powerful. Meaningful.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-semibold text-white">Commit Together</h3>
              <p className="text-gray-300 leading-relaxed">
                Both partners stake ETH to mint your unique relationship NFT. Equal investment, equal commitment.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-semibold text-white">Grow Your Bond</h3>
              <p className="text-gray-300 leading-relaxed">
                Watch your commitment appreciate over time. Add milestones, celebrate anniversaries, build your digital legacy.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-semibold text-white">Fair Resolution</h3>
              <p className="text-gray-300 leading-relaxed">
                If paths diverge, smart contracts ensure fair, transparent distribution. No lawyers, no drama, just fairness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-sm py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 mb-4">
            © 2025 CommitLock. Building lasting bonds through blockchain technology.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}