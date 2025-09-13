import React, { useState } from 'react';
import { Play, RotateCcw, Loader2, Zap, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ImageProcessor() {
  const { images, processing, actions } = useApp();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (images.original) {
      const url = URL.createObjectURL(images.original);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [images.original]);

  const handleProcess = () => {
    actions.processImage();
  };

  const handleReset = () => {
    actions.resetApp();
  };

  if (!images.original) return null;

  return (
    <div className="max-w-4xl mx-auto animate-slide-in">
      <div className="card-elevated overflow-hidden">
        <div className="relative group">
          <img
            src={previewUrl || ''}
            alt="Original image"
            className="w-full h-96 object-contain bg-gradient-to-br from-neutral-50 to-neutral-100"
          />
          
          {/* Image overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {processing.isActive && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-sm mx-4 shadow-2xl border border-white/20">
                <div className="text-center space-y-6">
                  {/* Advanced loading animation */}
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-purple-300 border-b-transparent animate-spin animation-direction-reverse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary-600 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {processing.stage === 'uploading' ? 'Uploading Image...' : 'AI Processing...'}
                    </h3>
                    
                    <p className="text-neutral-600">
                      {processing.stage === 'uploading' 
                        ? 'Securely uploading your image'
                        : 'Our AI is removing the background'
                      }
                    </p>
                  </div>
                  
                  {/* Enhanced progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Progress</span>
                      <span className="font-semibold text-primary-600">{processing.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                        style={{ width: `${processing.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Processing stages */}
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <div className={`flex items-center space-x-1 ${
                      processing.stage === 'uploading' ? 'text-primary-600' : 'text-success-600'
                    }`}>
                      <CheckCircle className="h-3 w-3" />
                      <span>Upload</span>
                    </div>
                    <div className="w-6 h-px bg-neutral-300"></div>
                    <div className={`flex items-center space-x-1 ${
                      processing.stage === 'processing' ? 'text-primary-600' : 'text-neutral-400'
                    }`}>
                      <Loader2 className={`h-3 w-3 ${
                        processing.stage === 'processing' ? 'animate-spin' : ''
                      }`} />
                      <span>Process</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-gradient-to-r from-white to-neutral-50">
          <div className="mb-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-neutral-900">
                Ready to Process
              </h3>
              <p className="text-neutral-600 text-lg">
                Remove the background from your image using advanced AI
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 text-neutral-600 hover:text-neutral-800 border border-neutral-200 rounded-xl hover:bg-white hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="font-medium">Choose Different Image</span>
            </button>
            
            <button
              onClick={handleProcess}
              disabled={processing.isActive}
              className="btn-primary group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                {processing.isActive ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="text-lg font-semibold">
                  {processing.isActive ? 'Processing...' : 'Remove Background'}
                </span>
              </div>
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Lightning Fast</p>
                <p className="text-sm text-neutral-600">Processed in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">High Quality</p>
                <p className="text-sm text-neutral-600">Professional results</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">AI Powered</p>
                <p className="text-sm text-neutral-600">Smart detection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}