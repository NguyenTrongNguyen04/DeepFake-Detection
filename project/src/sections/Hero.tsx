import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 filter blur-3xl opacity-50 floating" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 filter blur-3xl opacity-50 floating" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-accent/5 filter blur-3xl opacity-50 floating" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-green-400/20 border border-green-400/30"
          >
            <Shield className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI-Powered Deepfake Detection</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Detect <span className="gradient-text">Deepfakes</span> With Advanced AI Technology
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-400 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Upload an image and our cutting-edge AI will analyze it to determine if it's authentic or has been manipulated using deepfake technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="#detection" 
              className="btn-primary px-8 py-3 text-lg flex items-center"
            >
              Try It Now
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#how-it-works" 
              className="btn-outline px-8 py-3 text-lg"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-background-secondary/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-primary text-xl font-bold mb-2">Fast Analysis</div>
            <p className="text-gray-400">Results in seconds with our optimized AI algorithms</p>
          </div>
          
          <div className="bg-background-secondary/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-secondary text-xl font-bold mb-2">High Accuracy</div>
            <p className="text-gray-400">Advanced neural networks provide reliable detection</p>
          </div>
          
          <div className="bg-background-secondary/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-accent text-xl font-bold mb-2">Detailed Reports</div>
            <p className="text-gray-400">Comprehensive analysis with visual indicators</p>
          </div>
          
          <div className="bg-background-secondary/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="text-warning text-xl font-bold mb-2">User Privacy</div>
            <p className="text-gray-400">Your uploads are secure and never stored</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;