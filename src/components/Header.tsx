
import { Scissors, Sparkles, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="relative bg-white/80 backdrop-blur-md shadow-soft border-b border-white/20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-purple-50/50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            {/* Logo/Icon */}
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl shadow-lg">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-success-400 to-success-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            
            {/* Title and tagline */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient">
                Background Remover
              </h1>
              <p className="text-sm text-neutral-600 font-medium hidden sm:block">
                AI-Powered • Instant • Professional
              </p>
            </div>
          </div>
          
          {/* Feature badges */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Zap className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">Lightning Fast</span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}