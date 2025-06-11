export interface AnalysisResult {
  isDeepfake: boolean;
  confidenceScore: number;
  detectionTime: number;
  detectionDate: string;
  areas?: {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }[];
  metadata: {
    format: string;
    dimensions: {
      width: number;
      height: number;
    };
    fileSize: string;
  };
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  timestamp: string;
  result: AnalysisResult;
  modelUsed: ModelType;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export type ModelType = 'xception' | 'vision-transformer';

export interface ModelInfo {
  name: string;
  description: string;
  type: ModelType;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}