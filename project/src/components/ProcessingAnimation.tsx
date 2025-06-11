import React from 'react';
import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';

interface ProcessingAnimationProps {
  stage: 'uploading' | 'analyzing' | 'finalizing';
  progress: number;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ stage, progress }) => {
  const stages = [
    { key: 'uploading', label: 'Uploading Image' },
    { key: 'analyzing', label: 'Analyzing Patterns' },
    { key: 'finalizing', label: 'Finalizing Results' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  const stageMessages = {
    uploading: [
      'Preparing image data...',
      'Optimizing for analysis...',
    ],
    analyzing: [
      'Scanning for manipulation artifacts...',
      'Examining facial inconsistencies...',
      'Checking metadata and noise patterns...',
      'Running neural network analysis...',
    ],
    finalizing: [
      'Compiling detection results...',
      'Generating confidence scores...',
      'Preparing visual indicators...',
    ],
  };

  const currentMessage = stageMessages[stage][Math.floor(progress * stageMessages[stage].length) % stageMessages[stage].length];

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <motion.div 
        className="relative w-48 h-48 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Rotating outer ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pulsing inner circle */}
        <motion.div 
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Scan icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scan className="h-16 w-16 text-primary" />
          </motion.div>
        </div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div 
            className="absolute w-full h-1 bg-primary/30 left-0"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      
      {/* Stage progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between mb-2">
          {stages.map((s, index) => (
            <div 
              key={s.key} 
              className={`text-xs font-medium ${index <= currentStageIndex ? 'text-primary' : 'text-gray-500'}`}
            >
              {s.label}
            </div>
          ))}
        </div>
        
        <div className="h-2 bg-background-accent rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((currentStageIndex / (stages.length - 1)) + (progress / (stages.length - 1))) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {/* Current action message */}
      <motion.p 
        className="text-gray-300 text-center"
        key={currentMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {currentMessage}
      </motion.p>
      
      <motion.p 
        className="text-primary font-mono mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {Math.floor(progress * 100)}% complete
      </motion.p>
    </div>
  );
};

export default ProcessingAnimation;