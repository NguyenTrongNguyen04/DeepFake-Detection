import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const AboutDeepfakes: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Understanding Deepfakes
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Learn about the technology behind deepfakes, their potential risks, and how to identify them.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* What are Deepfakes */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Info className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">What are Deepfakes?</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence. This technology can create convincing images, videos, and audio that appear to show people saying and doing things they never did.
            </p>
            <p className="text-gray-400">
              The term "deepfake" combines "deep learning" (a subset of AI) and "fake," highlighting the AI technology used to create these deceptive media.
            </p>
          </motion.div>
          
          {/* Risks and Concerns */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-warning mr-3" />
              <h3 className="text-xl font-semibold">Risks and Concerns</h3>
            </div>
            <ul className="text-gray-400 space-y-3 list-disc pl-5">
              <li>Misinformation and fake news</li>
              <li>Political manipulation and election interference</li>
              <li>Fraud and identity theft</li>
              <li>Reputation damage</li>
              <li>Erosion of trust in media</li>
              <li>Privacy violations</li>
            </ul>
            <p className="text-gray-400 mt-4">
              As deepfake technology improves, distinguishing between real and fake media becomes increasingly challenging for the human eye.
            </p>
          </motion.div>
          
          {/* Detection Methods */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <ShieldAlert className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-xl font-semibold">Detection Methods</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Deepfake detection technology analyzes various aspects of media to identify manipulations:
            </p>
            <ul className="text-gray-400 space-y-2 list-disc pl-5">
              <li>Inconsistent blinking patterns</li>
              <li>Unnatural facial movements</li>
              <li>Lighting inconsistencies</li>
              <li>Irregular shadows</li>
              <li>Blurring or distortion around modified areas</li>
              <li>Abnormal skin texture or color</li>
              <li>Metadata and digital fingerprinting analysis</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutDeepfakes;