import { useState, useEffect } from 'react';
import { Download, RotateCcw, Eye, EyeOff, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ImageGallery() {
  const { images, actions } = useApp();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (images.original) {
      const url = URL.createObjectURL(images.original);
      setOriginalUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [images.original]);

  useEffect(() => {
    if (images.processed) {
      const blob = new Blob([images.processed], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [images.processed]);

  const handleDownload = async () => {
    setIsDownloading(true);
    await actions.downloadImage();
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const handleReset = () => {
    actions.resetApp();
  };

  if (!images.processed || !processedUrl) return null;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 rounded-full text-white shadow-lg mb-4">
          <CheckCircle className="h-6 w-6" />
          <span className="font-semibold text-lg">Background Removed Successfully!</span>
        </div>
        <p className="text-neutral-600 text-lg">
          Your image is ready for download with professional quality
        </p>
      </div>

      <div className="card-elevated overflow-hidden">
        {/* Header with actions */}
        <div className="p-6 bg-gradient-to-r from-white to-neutral-50 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-neutral-900">Premium Quality</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-neutral-300"></div>
              <div className="text-sm text-neutral-600">
                Ready for professional use
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-neutral-800 border border-neutral-200 rounded-xl hover:bg-white hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {showComparison ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="font-medium">{showComparison ? 'Hide' : 'Show'} Comparison</span>
              </button>
              
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-success group relative overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-success-600 to-success-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Download className={`h-5 w-5 group-hover:scale-110 transition-transform duration-200 ${
                    isDownloading ? 'animate-bounce' : ''
                  }`} />
                  <span className="text-lg font-semibold">
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {showComparison && originalUrl ? (
            <div className="space-y-8">
              {/* Before/After slider */}
              <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl overflow-hidden shadow-inner">
                <div className="relative h-96 overflow-hidden">
                  {/* Original image */}
                  <div className="absolute inset-0">
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Processed image with mask */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checker' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect fill='%23f3f4f6' width='10' height='10'/%3e%3crect fill='%23e5e7eb' x='10' y='10' width='10' height='10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23checker)'/%3e%3c/svg%3e")`,
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                    <img
                      src={processedUrl}
                      alt="Processed"
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>
                  
                  {/* Slider control */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary-500 flex items-center justify-center cursor-col-resize">
                      <ArrowRight className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  
                  {/* Overlay for slider interaction */}
                  <div 
                    className="absolute inset-0 cursor-col-resize z-10"
                    onMouseMove={(e) => {
                      if (e.buttons === 1) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = (x / rect.width) * 100;
                        setSliderPosition(Math.max(0, Math.min(100, percentage)));
                      }
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = (x / rect.width) * 100;
                      setSliderPosition(Math.max(0, Math.min(100, percentage)));
                    }}
                  ></div>
                </div>
                
                {/* Labels */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
                  <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                    Original
                  </div>
                  <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                    Background Removed
                  </div>
                </div>
              </div>
              
              {/* Side by side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-neutral-900 flex items-center space-x-2">
                    <span>Original Image</span>
                  </h4>
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden shadow-inner">
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="w-full h-64 object-contain"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-neutral-900 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                    <span>Background Removed</span>
                  </h4>
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden shadow-inner relative">
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checker' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect fill='%23f3f4f6' width='10' height='10'/%3e%3crect fill='%23e5e7eb' x='10' y='10' width='10' height='10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23checker)'/%3e%3c/svg%3e")`,
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                    <img
                      src={processedUrl}
                      alt="Processed"
                      className="w-full h-64 object-contain relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl overflow-hidden shadow-inner relative">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checker' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect fill='%23f3f4f6' width='10' height='10'/%3e%3crect fill='%23e5e7eb' x='10' y='10' width='10' height='10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23checker)'/%3e%3c/svg%3e")`,
                    backgroundSize: '20px 20px'
                  }}
                ></div>
                <img
                  src={processedUrl}
                  alt="Background removed"
                  className="w-full h-96 object-contain relative z-10"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-neutral-200">
            <button
              onClick={handleReset}
              className="flex items-center space-x-3 px-8 py-4 border-2 border-neutral-200 text-neutral-700 rounded-xl hover:bg-white hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium text-lg">Process Another Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}