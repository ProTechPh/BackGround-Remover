import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, FileCheck, CloudUpload } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB
const ACCEPTED_FORMATS = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export function ImageUploader() {
  const { actions } = useApp();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragDepth, setDragDepth] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      // Handle validation errors
      const error = rejectedFiles[0].errors[0];
      console.error('File validation error:', error.message);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Upload to context
      actions.uploadImage(file);
    }
  }, [actions]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDragEnter: () => setDragDepth(prev => prev + 1),
    onDragLeave: () => setDragDepth(prev => prev - 1),
  });

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    actions.resetApp();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="card-elevated overflow-hidden">
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-contain bg-gradient-to-br from-neutral-50 to-neutral-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button
              onClick={clearSelection}
              className="absolute top-3 right-3 p-2 bg-error-500 text-white rounded-full hover:bg-error-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-6 bg-gradient-to-r from-white to-neutral-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900 truncate text-lg">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  {formatFileSize(selectedFile.size)} • Ready to process
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-success-100 rounded-full">
                  <FileCheck className="h-4 w-4 text-success-600" />
                  <span className="text-sm text-success-700 font-medium">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${
            isDragActive && !isDragReject
              ? 'glass-card border-primary-400 shadow-2xl scale-[1.02]' 
              : isDragReject
                ? 'glass-card border-error-400 shadow-error-200 shadow-xl'
                : 'card-elevated border-2 border-dashed border-neutral-200 hover:border-primary-300'
          }
        `}
      >
        <input {...getInputProps()} />
        
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative p-12 text-center space-y-6">
          {/* Icon with animation */}
          <div className="flex justify-center">
            <div className={`
              relative p-6 rounded-full transition-all duration-300
              ${
                isDragActive && !isDragReject
                  ? 'bg-primary-500 shadow-primary-200 shadow-2xl scale-110 animate-bounce-soft'
                  : isDragReject
                    ? 'bg-error-500 shadow-error-200 shadow-xl scale-110'
                    : 'bg-gradient-to-br from-primary-100 to-purple-100 group-hover:from-primary-200 group-hover:to-purple-200 group-hover:scale-110'
              }
            `}>
              {isDragActive && !isDragReject ? (
                <CloudUpload className="h-8 w-8 text-white" />
              ) : (
                <Upload className={`h-8 w-8 transition-colors duration-300 ${
                  isDragReject ? 'text-white' : 'text-primary-600 group-hover:text-primary-700'
                }`} />
              )}
              
              {/* Pulse animation */}
              {isDragActive && !isDragReject && (
                <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30" />
              )}
            </div>
          </div>
          
          {/* Text content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-neutral-900">
              {isDragActive && !isDragReject
                ? 'Drop your image here'
                : isDragReject
                  ? 'Invalid file type or size'
                  : 'Upload Your Image'
              }
            </h3>
            
            <p className="text-neutral-600 text-lg leading-relaxed max-w-md mx-auto">
              {isDragActive && !isDragReject
                ? 'Release to upload your image'
                : isDragReject
                  ? 'Please check the file requirements below'
                  : (
                    <>
                      Drag & drop an image here, or{' '}
                      <span className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        browse files
                      </span>
                    </>
                  )
              }
            </p>
          </div>
          
          {/* Requirements */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <ImageIcon className="h-4 w-4 text-primary-600" />
                <span className="text-neutral-700 font-medium">JPEG, PNG, WEBP</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <FileCheck className="h-4 w-4 text-primary-600" />
                <span className="text-neutral-700 font-medium">Max 12MB</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <CloudUpload className="h-4 w-4 text-primary-600" />
                <span className="text-neutral-700 font-medium">High Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}