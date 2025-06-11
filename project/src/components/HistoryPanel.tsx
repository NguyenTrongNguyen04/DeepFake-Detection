import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Clock, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onViewResult: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onClearHistory,
  onViewResult
}) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p>No analysis history yet</p>
        <p className="text-sm mt-1">Upload an image to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Analyses</h3>
        <button 
          className="text-gray-400 hover:text-danger flex items-center text-sm transition-colors"
          onClick={onClearHistory}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear History
        </button>
      </div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {history.map((item) => {
          const confidencePercent = Math.round(item.result.confidenceScore * 100);
          
          // Decide status based on deepfake confidence
          const statusColor = item.result.isDeepfake 
            ? 'danger' 
            : confidencePercent > 85 
              ? 'accent' 
              : 'warning';
          
          const statusText = item.result.isDeepfake 
            ? 'Deepfake' 
            : confidencePercent > 85 
              ? 'Authentic' 
              : 'Uncertain';
          
          const StatusIcon = item.result.isDeepfake 
            ? XCircle 
            : confidencePercent > 85 
              ? CheckCircle 
              : AlertTriangle;
            
          return (
            <motion.div 
              key={item.id}
              className="bg-background-accent p-3 rounded-lg flex items-center cursor-pointer hover:bg-background-accent/70 transition-colors"
              onClick={() => onViewResult(item)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Thumbnail */}
              <div className="h-12 w-12 mr-3 rounded overflow-hidden flex-shrink-0 border border-gray-700">
                <img 
                  src={item.thumbnailUrl} 
                  alt="Thumbnail" 
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center">
                  <StatusIcon className={`h-4 w-4 text-${statusColor} mr-1.5`} />
                  <span className={`text-${statusColor} text-sm font-medium`}>
                    {statusText}
                  </span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1 truncate">
                  {item.result.metadata.dimensions.width} × {item.result.metadata.dimensions.height} • {item.result.metadata.format} • {confidencePercent}% confidence
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HistoryPanel;