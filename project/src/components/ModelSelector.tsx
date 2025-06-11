import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight, Shield, Zap } from 'lucide-react';
import { ModelType, ModelInfo } from '../types';
import { getModelInfo } from '../utils/mock-detector';

interface ModelSelectorProps {
  onModelSelect: (model: ModelType) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onModelSelect }) => {
  const models: ModelInfo[] = [
    getModelInfo('xception'),
    getModelInfo('vision-transformer')
  ];

  const getModelIcon = (modelType: ModelType) => {
    switch (modelType) {
      case 'xception':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'vision-transformer':
        return <Zap className="h-6 w-6 text-primary" />;
      default:
        return <Brain className="h-6 w-6 text-primary" />;
    }
  };

  const renderModelCard = (model: ModelInfo) => (
    <motion.div
      key={model.type}
      className="relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => onModelSelect(model.type)}
        className="w-full h-full bg-background-secondary hover:bg-background-accent/30 border border-gray-700 rounded-xl p-6 text-left transition-all duration-300 group"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            {getModelIcon(model.type)}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold flex items-center">
                {model.name}
                <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </h4>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {model.type}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{model.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-accent/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                <div className="font-mono text-sm text-primary">
                  {(model.metrics.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-background-accent/20 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">F1 Score</div>
                <div className="font-mono text-sm text-primary">
                  {(model.metrics.f1Score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </motion.div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold mb-2">
          Select a Model for Detection
        </h3>
        <p className="text-gray-400 text-sm">
          Choose the most suitable model for your deepfake detection needs
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6">
        {models.map(renderModelCard)}
      </div>
    </div>
  );
};

export default ModelSelector;