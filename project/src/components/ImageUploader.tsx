import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileImage, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    onImageSelected(file);
  }, [onImageSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-gray-700 hover:border-gray-500 bg-background-secondary'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...getRootProps()}
        whileHover={!isProcessing ? { scale: 1.01 } : {}}
        whileTap={!isProcessing ? { scale: 0.99 } : {}}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          {isDragActive ? (
            <>
              <FileImage className="h-16 w-16 text-primary animate-pulse" />
              <p className="text-lg text-primary font-medium">Drop your image here...</p>
            </>
          ) : (
            <>
              <Upload className="h-16 w-16 text-gray-400" />
              <div>
                <p className="text-lg text-gray-300 font-medium">Drag and drop your image here</p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to select a file (JPEG, PNG, GIF, WEBP)
                </p>
              </div>
              <button 
                className="btn-primary mt-4"
                disabled={isProcessing}
              >
                Select Image
              </button>
            </>
          )}
        </div>
      </motion.div>
      
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-danger/20 border border-danger/50 rounded-lg flex items-center text-danger"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>Supported formats: JPEG, PNG, GIF, WEBP</p>
        <p>Maximum file size: 5MB</p>
      </div>
    </div>
  );
};

export default ImageUploader;