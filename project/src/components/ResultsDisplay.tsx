import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult;
  imageUrl: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, imageUrl, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const confidencePercent = Math.round(result.confidenceScore * 100);
  
  // Lấy confidence của từng nhãn
  let realConfidence = 0;
  let fakeConfidence = 0;
  if (result && result.metrics && result.metadata && Array.isArray(result.areas)) {
    // Nếu có thông tin chi tiết hơn, lấy từ result.confidences nếu có
    // Nhưng ở đây chỉ có confidenceScore và isDeepfake, nên ta sẽ dựa vào isDeepfake
    if (result.isDeepfake) {
      fakeConfidence = confidencePercent;
    } else {
      realConfidence = confidencePercent;
    }
  }

  // Quyết định status
  let statusText = '';
  let statusColor = '';
  let StatusIcon: any = null;
  if (realConfidence > 50) {
    statusText = 'Likely Real';
    statusColor = 'accent';
    StatusIcon = CheckCircle;
  } else if (fakeConfidence > 50) {
    statusText = 'Likely DeepFake';
    statusColor = 'danger';
    StatusIcon = XCircle;
  } else {
    statusText = 'Uncertain';
    statusColor = 'warning';
    StatusIcon = AlertTriangle;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div 
        className="bg-background-secondary border border-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Result header */}
        <div className={`p-6 bg-${statusColor}/10 border-b border-${statusColor}/30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StatusIcon className={`h-8 w-8 text-${statusColor} mr-3`} />
              <div>
                <h2 className="text-xl font-bold text-white">{statusText}</h2>
                <p className="text-gray-400 text-sm">
                  Analysis completed in {result.detectionTime.toFixed(2)} seconds
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{confidencePercent}%</div>
              <p className="text-gray-400 text-sm">Confidence</p>
            </div>
          </div>
        </div>
        
        {/* Image and details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image preview */}
            <div className="relative rounded-lg overflow-hidden border border-gray-700">
              <img 
                src={imageUrl} 
                alt="Analyzed image" 
                className="w-full h-auto object-contain"
              />
              
              {/* Highlight detected areas if it's a deepfake */}
              {result.isDeepfake && result.areas && result.areas.length > 0 && (
                <>
                  {result.areas.map((area, index) => (
                    <div 
                      key={index}
                      className="absolute border-2 border-danger animate-pulse"
                      style={{
                        left: `${(area.x / result.metadata.dimensions.width) * 100}%`,
                        top: `${(area.y / result.metadata.dimensions.height) * 100}%`,
                        width: `${(area.width / result.metadata.dimensions.width) * 100}%`,
                        height: `${(area.height / result.metadata.dimensions.height) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-6 -right-1 text-xs bg-danger text-white px-1 py-0.5 rounded">
                        {Math.round(area.confidence * 100)}%
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            
            {/* Result details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Status</span>
                  <span className={`text-${statusColor} font-medium`}>{statusText}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Confidence Score</span>
                  <span className="font-medium">{confidencePercent}%</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Detection Time</span>
                  <span className="font-mono">{result.detectionTime.toFixed(2)}s</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Image Format</span>
                  <span className="font-mono">{result.metadata.format}</span>
                </div>
                
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Dimensions</span>
                  <span className="font-mono">
                    {result.metadata.dimensions.width} × {result.metadata.dimensions.height}
                  </span>
                </div>
                
                <div className="flex justify-between pb-2 border-b border-gray-700">
                  <span className="text-gray-400">File Size</span>
                  <span className="font-mono">{result.metadata.fileSize}</span>
                </div>
              </div>
              
              {/* Toggle technical details */}
              <button
                className="mt-6 flex items-center text-primary hover:text-primary-light transition-colors"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide technical details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show technical details
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Technical details collapsible section */}
          {showDetails && (
            <motion.div 
              className="mt-6 p-4 bg-background-accent/30 rounded-lg border border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start mb-4">
                <Info className="text-primary h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  This is a simulated detection result. In a real application, this section would contain 
                  detailed technical information about the specific anomalies detected in the image.
                </p>
              </div>
              
              <h4 className="font-medium mb-2">Detection Algorithm Details</h4>
              <ul className="text-sm text-gray-400 space-y-2 mb-4">
                <li>• Neural network confidence: {(result.confidenceScore * 0.97).toFixed(4)}</li>
                <li>• Metadata analysis: {result.isDeepfake ? 'Inconsistencies detected' : 'No anomalies'}</li>
                <li>• Noise pattern analysis: {result.isDeepfake ? 'Unnatural patterns' : 'Natural pattern distribution'}</li>
                <li>• Facial feature consistency: {result.isDeepfake ? 'Inconsistent' : 'Consistent'}</li>
                <li>• JPEG compression artifacts: {result.isDeepfake ? 'Unusual artifacts present' : 'Normal artifacts'}</li>
              </ul>
              
              {result.isDeepfake && result.areas && result.areas.length > 0 && (
                <>
                  <h4 className="font-medium mb-2">Detected Anomaly Regions</h4>
                  <table className="w-full text-sm text-gray-400">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-2">Region</th>
                        <th className="pb-2">Position</th>
                        <th className="pb-2">Size</th>
                        <th className="pb-2">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.areas.map((area, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-2">Region {index + 1}</td>
                          <td className="py-2 font-mono">({area.x}, {area.y})</td>
                          <td className="py-2 font-mono">{area.width}×{area.height}</td>
                          <td className="py-2 font-mono">{(area.confidence * 100).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </motion.div>
          )}
          
          {/* Action buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              className="btn-outline"
              onClick={() => {
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = `analyzed-image-${Date.now()}.jpg`;
                link.click();
              }}
            >
              Download Image
            </button>
            <button 
              className="btn-primary"
              onClick={onReset}
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsDisplay;