
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      className="w-full py-4 px-6 md:px-10 border-b theme-transition"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img 
            src="https://i.postimg.cc/N0DBrxpY/logo-1.png" 
            alt="Bignalytics Logo" 
            className="h-12 md:h-14"
          />
        </motion.div>
        
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
