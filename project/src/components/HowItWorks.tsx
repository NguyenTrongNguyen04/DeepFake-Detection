import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Image, Zap, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Image,
      title: 'Upload Image',
      description: 'Upload any image you want to analyze for signs of AI manipulation or deepfake technology.',
      color: 'primary',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced neural networks scan for inconsistencies, artifacts, and patterns that indicate manipulation.',
      color: 'secondary',
    },
    {
      icon: Zap,
      title: 'Quick Processing',
      description: 'Receive results in seconds with highlighted areas of concern and confidence scores.',
      color: 'warning',
    },
    {
      icon: CheckCircle,
      title: 'Get Results',
      description: 'View detailed analysis with confidence scores and technical information about the authenticity.',
      color: 'accent',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our advanced AI-powered detection system analyzes images to identify manipulations and deepfakes with high accuracy.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="card relative overflow-hidden"
              variants={item}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-${step.color}`} />
              <div className={`h-16 w-16 rounded-full bg-${step.color}/10 flex items-center justify-center mb-6`}>
                <step.icon className={`h-8 w-8 text-${step.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              
              {/* Step number in background */}
              <div className="absolute -bottom-8 -right-4 text-8xl font-bold opacity-5">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;