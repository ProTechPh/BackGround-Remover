export type ApiErrorType = 
  | 'INVALID_API_KEY'
  | 'INSUFFICIENT_CREDITS'
  | 'UNSUPPORTED_FORMAT'
  | 'FILE_TOO_LARGE'
  | 'NETWORK_ERROR'
  | 'PROCESSING_ERROR';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  statusCode?: number;
  retryable: boolean;
}

export interface RemovalOptions {
  size: 'auto' | 'preview' | 'full';
  type?: 'auto' | 'person' | 'product';
  format?: 'png' | 'jpg';
}

export interface ProcessingState {
  isActive: boolean;
  progress: number;
  stage: 'uploading' | 'processing' | 'complete';
}

export interface AppSettings {
  outputFormat: 'png' | 'jpg';
  size: 'auto' | 'preview' | 'full';
}

export interface ImageData {
  original: File | null;
  processed: ArrayBuffer | null;
}

export interface AppContextType {
  images: ImageData;
  processing: ProcessingState;
  settings: AppSettings;
  error: ApiError | null;
  actions: {
    uploadImage: (file: File) => void;
    processImage: () => Promise<void>;
    downloadImage: () => void;
    resetApp: () => void;
    updateSettings: (settings: Partial<AppSettings>) => void;
    clearError: () => void;
  };
}