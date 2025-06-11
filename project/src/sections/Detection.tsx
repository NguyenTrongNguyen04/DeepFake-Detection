import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import ImageUploader from '../components/ImageUploader';
import ProcessingAnimation from '../components/ProcessingAnimation';
import ResultsDisplay from '../components/ResultsDisplay';
import HistoryPanel from '../components/HistoryPanel';
import ModelSelector from '../components/ModelSelector';
import MetricsDisplay from '../components/MetricsDisplay';

import { detectDeepfake } from '../utils/mock-detector';
import { getHistory, addToHistory, clearHistory, createThumbnail } from '../utils/storage';
import { AnalysisStatus, AnalysisResult, HistoryItem, ModelType } from '../types';

const Detection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<'uploading' | 'analyzing' | 'finalizing'>('uploading');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  
  // Refs to store interval IDs and processing state
  const uploadIntervalRef = useRef<NodeJS.Timeout>();
  const analysisIntervalRef = useRef<NodeJS.Timeout>();
  const finalizingIntervalRef = useRef<NodeJS.Timeout>();
  const isProcessingRef = useRef<boolean>(false);
  const selectedImageRef = useRef<File | null>(null);
  const selectedModelRef = useRef<ModelType | null>(null);

  // Cleanup function for intervals
  const cleanupIntervals = () => {
    if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);
    if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
    if (finalizingIntervalRef.current) clearInterval(finalizingIntervalRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupIntervals();
    };
  }, []);

  // Load history from localStorage
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Handle model selection
  const handleModelSelect = (model: ModelType) => {
    setSelectedModel(model);
    selectedModelRef.current = model;
  };

  // Handle image selection
  const handleImageSelected = async (file: File) => {
    if (isProcessingRef.current) return;
    
    console.log('Image selected:', file.name);
    isProcessingRef.current = true;
    cleanupIntervals();
    
    setSelectedImage(file);
    selectedImageRef.current = file;
    setImageUrl(URL.createObjectURL(file));
    setStatus('uploading');
    setProgress(0);
    setProcessingStage('uploading');
    
    // Simulate upload progress
    uploadIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.95) {
          console.log('Upload complete, starting analysis...');
          cleanupIntervals();
          startAnalysis();
          return 1;
        }
        return prev + 0.1;
      });
    }, 200);
  };

  // Start the analysis process
  const startAnalysis = () => {
    console.log('Starting analysis with model:', selectedModel);
    if (!selectedModel) {
      console.error('No model selected!');
      isProcessingRef.current = false;
      return;
    }
    
    setStatus('processing');
    setProcessingStage('analyzing');
    setProgress(0);
    
    // Simulate analysis progress
    analysisIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.95) {
          console.log('Analysis complete, finalizing results...');
          cleanupIntervals();
          finalizeResults();
          return 1;
        }
        return prev + 0.05;
      });
    }, 300);
  };

  // Finalize the results
  const finalizeResults = () => {
    console.log('Finalizing results...');
    setProcessingStage('finalizing');
    setProgress(0);
    
    // Simulate finalizing progress
    finalizingIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.95) {
          console.log('Finalization complete, completing analysis...');
          cleanupIntervals();
          completeAnalysis();
          return 1;
        }
        return prev + 0.2;
      });
    }, 200);
  };

  // Complete the analysis and show results
  const completeAnalysis = async () => {
    const image = selectedImageRef.current;
    const model = selectedModelRef.current;
    console.log('Completing analysis...', { image, model });
    if (!image || !model) {
      console.error('Missing required data:', { image, model });
      isProcessingRef.current = false;
      return;
    }
    
    try {
      console.log('Calling detectDeepfake...');
      // Get analysis result
      const analysisResult = await detectDeepfake(image, model);
      console.log('Analysis result:', analysisResult);
      
      setResult(analysisResult);
      
      console.log('Creating thumbnail...');
      // Create thumbnail for history
      const thumbnailUrl = await createThumbnail(image);
      console.log('Thumbnail created:', thumbnailUrl);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: uuidv4(),
        imageUrl,
        thumbnailUrl,
        timestamp: new Date().toISOString(),
        result: analysisResult,
        modelUsed: model
      };
      
      console.log('Adding to history:', historyItem);
      addToHistory(historyItem);
      setHistory([historyItem, ...history]);
      
      console.log('Setting status to complete');
      setStatus('complete');
    } catch (error) {
      console.error('Error during analysis:', error);
      setStatus('error');
    } finally {
      isProcessingRef.current = false;
    }
  };

  // Reset the analysis
  const handleReset = () => {
    cleanupIntervals();
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    
    setSelectedImage(null);
    setImageUrl('');
    setStatus('idle');
    setProgress(0);
    setResult(null);
    setSelectedModel(null);
    isProcessingRef.current = false;
  };

  // Handle clearing history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // View a result from history
  const handleViewResult = (item: HistoryItem) => {
    setImageUrl(item.imageUrl);
    setResult(item.result);
    setStatus('complete');
    setSelectedModel(item.modelUsed as ModelType);
  };

  return (
    <section id="detection" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Deepfake Detection
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose a model and upload an image for analysis.
            Compare the performance of different AI models in detecting deepfakes.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - History */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <motion.div 
              className="bg-background-secondary rounded-xl p-6 border border-gray-700 h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <HistoryPanel 
                history={history}
                onClearHistory={handleClearHistory}
                onViewResult={handleViewResult}
              />
            </motion.div>
          </div>
          
          {/* Main content - Detection */}
          <motion.div 
            className="lg:col-span-2 order-1 lg:order-2 detection-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Model selection */}
            {status === 'idle' && !selectedModel && (
              <ModelSelector onModelSelect={handleModelSelect} />
            )}
            
            {/* Upload interface */}
            {status === 'idle' && selectedModel && (
              <div className="py-8">
                <ImageUploader 
                  onImageSelected={handleImageSelected}
                  isProcessing={status !== 'idle'}
                />
              </div>
            )}
            
            {/* Processing animation */}
            {(status === 'uploading' || status === 'processing') && (
              <ProcessingAnimation 
                stage={processingStage}
                progress={progress}
              />
            )}
            
            {/* Results display */}
            {status === 'complete' && result && (
              <>
                <ResultsDisplay 
                  result={result}
                  imageUrl={imageUrl}
                  onReset={handleReset}
                />
                <div className="mt-8">
                  <MetricsDisplay result={result} />
                </div>
              </>
            )}
            
            {/* Error state */}
            {status === 'error' && (
              <div className="text-center py-8">
                <div className="text-danger mb-4 text-xl">
                  An error occurred during analysis
                </div>
                <button 
                  className="btn-primary"
                  onClick={handleReset}
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Detection;