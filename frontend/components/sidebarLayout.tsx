import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Eye, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      current: pathname === '/'
    },
    {
      name: 'Mint NFT',
      href: '/mint',
      icon: Heart,
      current: pathname === '/mint'
    },
    {
      name: 'View NFTs',
      href: '/view-nfts',
      icon: Eye,
      current: pathname === '/view-nfts'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-lg border-r border-pink-200 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-6 border-b border-pink-200">
            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Love Chain ✨
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-pink-100 hover:text-pink-700'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-6 border-t border-pink-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Built with 💖 on Ethereum</p>
              <p className="mt-1">Sepolia Testnet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-xl bg-white/80 backdrop-blur-lg shadow-lg text-gray-700 hover:bg-pink-100 hover:text-pink-700 transition-all duration-200"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex">
          <div className="flex flex-col w-64 bg-white/90 backdrop-blur-lg shadow-xl">
            {/* Logo */}
            <div className="flex items-center justify-center h-20 px-6 border-b border-pink-200">
              <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Love Chain ✨
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      item.current
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-pink-100 hover:text-pink-700'
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        item.current ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-6 border-t border-pink-200">
              <div className="text-xs text-gray-500 text-center">
                <p>Built with 💖 on Ethereum</p>
                <p className="mt-1">Sepolia Testnet</p>
              </div>
            </div>
          </div>
          
          {/* Overlay */}
          <div 
            className="flex-1 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex-1">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;