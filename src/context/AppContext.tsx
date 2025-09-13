import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppContextType, ImageData, ProcessingState, AppSettings, ApiError } from '../types/index.js';
import { BackgroundRemovalService } from '../services/backgroundRemovalService';

interface AppState {
  images: ImageData;
  processing: ProcessingState;
  settings: AppSettings;
  error: ApiError | null;
}

type AppAction =
  | { type: 'UPLOAD_IMAGE'; payload: File }
  | { type: 'START_PROCESSING' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'PROCESSING_COMPLETE'; payload: ArrayBuffer }
  | { type: 'PROCESSING_ERROR'; payload: ApiError }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'RESET_APP' }
  | { type: 'CLEAR_ERROR' };

const initialState: AppState = {
  images: {
    original: null,
    processed: null,
  },
  processing: {
    isActive: false,
    progress: 0,
    stage: 'uploading',
  },
  settings: {
    outputFormat: 'png',
    size: 'auto',
  },
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPLOAD_IMAGE':
      return {
        ...state,
        images: {
          ...state.images,
          original: action.payload,
          processed: null,
        },
        error: null,
      };

    case 'START_PROCESSING':
      return {
        ...state,
        processing: {
          isActive: true,
          progress: 0,
          stage: 'uploading',
        },
        error: null,
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        processing: {
          ...state.processing,
          progress: action.payload,
          stage: action.payload < 50 ? 'uploading' : 'processing',
        },
      };

    case 'PROCESSING_COMPLETE':
      return {
        ...state,
        images: {
          ...state.images,
          processed: action.payload,
        },
        processing: {
          isActive: false,
          progress: 100,
          stage: 'complete',
        },
        error: null,
      };

    case 'PROCESSING_ERROR':
      return {
        ...state,
        processing: {
          ...state.processing,
          isActive: false,
        },
        error: action.payload,
      };

    case 'UPDATE_SETTINGS':
      const newSettings = { ...state.settings, ...action.payload };
      return {
        ...state,
        settings: newSettings,
      };

    case 'RESET_APP':
      return {
        ...state,
        images: {
          original: null,
          processed: null,
        },
        processing: {
          isActive: false,
          progress: 0,
          stage: 'uploading',
        },
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const backgroundRemovalService = new BackgroundRemovalService();

  const uploadImage = (file: File) => {
    dispatch({ type: 'UPLOAD_IMAGE', payload: file });
  };

  const processImage = async () => {
    if (!state.images.original) {
      dispatch({
        type: 'PROCESSING_ERROR',
        payload: {
          type: 'PROCESSING_ERROR',
          message: 'Please select an image to process',
          retryable: true,
        },
      });
      return;
    }

    try {
      dispatch({ type: 'START_PROCESSING' });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        dispatch({ type: 'UPDATE_PROGRESS', payload: Math.min(state.processing.progress + 10, 90) });
      }, 200);

      const result = await backgroundRemovalService.removeBackground(
        state.images.original,
        {
          size: state.settings.size,
          format: state.settings.outputFormat,
        }
      );

      clearInterval(progressInterval);
      dispatch({ type: 'PROCESSING_COMPLETE', payload: result });
    } catch (error) {
      dispatch({
        type: 'PROCESSING_ERROR',
        payload: error as ApiError,
      });
    }
  };

  const downloadImage = () => {
    if (!state.images.processed) return;

    const blob = new Blob([state.images.processed], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `background-removed-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetApp = () => {
    dispatch({ type: 'RESET_APP' });
  };

  const updateSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AppContextType = {
    images: state.images,
    processing: state.processing,
    settings: state.settings,
    error: state.error,
    actions: {
      uploadImage,
      processImage,
      downloadImage,
      resetApp,
      updateSettings,
      clearError,
    },
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}