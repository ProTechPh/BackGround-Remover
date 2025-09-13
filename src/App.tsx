import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ImageProcessor } from './components/ImageProcessor';
import { ImageGallery } from './components/ImageGallery';
import { ErrorAlert } from './components/ErrorAlert';
import { useApp } from './context/AppContext';
import { Sparkles, Zap, Shield } from 'lucide-react';

function AppContent() {
  const { images, processing, error } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="flex-1 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="mb-8 animate-slide-in">
              <ErrorAlert />
            </div>
          )}
          
          {!images.original && (
            <div className="text-center space-y-12 animate-fade-in">
              {/* Hero section */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="text-gradient">Remove Backgrounds</span>
                    <br />
                    <span className="text-neutral-900">Instantly with AI</span>
                  </h1>
                  <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                    Upload an image and let our advanced AI technology automatically remove the background. 
                    Perfect for product photos, portraits, and creative projects.
                  </p>
                </div>
                
                {/* Feature highlights */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
                    <Zap className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-neutral-700">Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-neutral-700">AI Powered</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
                    <Shield className="h-5 w-5 text-success-600" />
                    <span className="font-medium text-neutral-700">Secure & Private</span>
                  </div>
                </div>
              </div>
              
              <ImageUploader />
            </div>
          )}
          
          {images.original && !images.processed && !processing.isActive && (
            <div className="animate-slide-in">
              <ImageProcessor />
            </div>
          )}
          
          {processing.isActive && (
            <div className="text-center animate-scale-in">
              <div className="inline-flex flex-col items-center space-y-6 p-8">
                <div className="relative">
                  <div className="w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-purple-300 border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary-600 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-neutral-900">Processing Your Image</h3>
                  <p className="text-lg text-neutral-600">Our AI is working its magic...</p>
                </div>
              </div>
            </div>
          )}
          
          {images.processed && (
            <div className="animate-fade-in">
              <ImageGallery />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App
