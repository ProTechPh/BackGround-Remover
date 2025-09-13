import { Github, Heart, ExternalLink, Zap, Shield, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-white/80 backdrop-blur-md border-t border-white/20 mt-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/50 to-primary-50/30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Background Remover</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Professional AI-powered background removal tool. Fast, accurate, and easy to use for all your creative needs.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900">Features</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Zap className="h-4 w-4 text-primary-500" />
                <span>Lightning fast processing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Shield className="h-4 w-4 text-success-500" />
                <span>Secure and private</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Award className="h-4 w-4 text-purple-500" />
                <span>Professional quality</span>
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900">Resources</h4>
            <div className="space-y-3">
              <a 
                href="https://remove.bg/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>remove.bg API</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors group"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>View Source Code</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-error-500 fill-current animate-pulse" />
            <span>using modern web technologies</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm text-neutral-500">
              © 2025 Background Remover. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}