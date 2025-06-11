import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import HowItWorks from './components/HowItWorks';
import AboutDeepfakes from './components/AboutDeepfakes';
import ThemeToggle from './components/ThemeToggle';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';

// Sections
import Hero from './sections/Hero';
import Detection from './sections/Detection';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update page title
  useEffect(() => {
    document.title = 'DeepGuard - AI Deepfake Detection';
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background-primary-light dark:bg-background-primary-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
        {/* Background particles */}
        <BackgroundParticles />
        
        {/* Scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main>
          <Hero />
          <Detection />
          <AboutDeepfakes />
          <HowItWorks />
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;