import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={toggleTheme}
        className="relative flex items-center w-16 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-background-secondary-light dark:bg-background-secondary-dark shadow-lg transition-colors duration-300 focus:outline-none group"
        aria-label="Toggle dark mode"
      >
        {/* Sun icon */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2">
          <Sun className={`h-5 w-5 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-yellow-400'}`} />
        </span>
        {/* Moon icon */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          <Moon className={`h-5 w-5 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
        </span>
        {/* Switch knob */}
        <motion.span
          className={`absolute top-1 left-1 w-7 h-7 rounded-full shadow-md transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ x: isDark ? 32 : 0 }}
        />
      </button>
    </motion.div>
  );
};

export default ThemeToggle; 