import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-primary/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Deep<span className="text-primary">Guard</span></h1>
              <p className="text-xs text-gray-400">AI Deepfake Detection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" label="Home" />
            <NavLink href="#detection" label="Detector" />
            <NavLink href="#about" label="About" />
            <NavLink href="#how-it-works" label="How It Works" />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 bg-background-secondary/90 backdrop-blur-md">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="#home" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="#detection" label="Detector" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="#about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="#how-it-works" label="How It Works" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

// Desktop Nav Link
const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a 
    href={href} 
    className="text-gray-300 hover:text-primary transition-colors relative group"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </a>
);

// Mobile Nav Link
const MobileNavLink: React.FC<{ href: string; label: string; onClick: () => void }> = ({ 
  href, 
  label, 
  onClick 
}) => (
  <a 
    href={href} 
    className="text-gray-300 hover:text-primary transition-colors p-2 border-b border-gray-700 hover:bg-background-accent/20"
    onClick={onClick}
  >
    {label}
  </a>
);

export default Header;