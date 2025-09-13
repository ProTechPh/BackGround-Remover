import { AlertTriangle, X, RefreshCw, AlertCircle, Wifi, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ErrorAlert() {
  const { error, actions } = useApp();

  if (!error) return null;

  const getErrorConfig = () => {
    switch (error.type) {
      case 'INVALID_API_KEY':
        return {
          icon: AlertTriangle,
          color: 'error',
          title: 'Invalid API Key',
          bgClass: 'bg-error-50 border-error-200',
          textClass: 'text-error-800',
          iconClass: 'text-error-600'
        };
      case 'INSUFFICIENT_CREDITS':
        return {
          icon: CreditCard,
          color: 'error',
          title: 'Insufficient Credits',
          bgClass: 'bg-error-50 border-error-200',
          textClass: 'text-error-800',
          iconClass: 'text-error-600'
        };
      case 'NETWORK_ERROR':
        return {
          icon: Wifi,
          color: 'warning',
          title: 'Network Error',
          bgClass: 'bg-amber-50 border-amber-200',
          textClass: 'text-amber-800',
          iconClass: 'text-amber-600'
        };
      case 'PROCESSING_ERROR':
        return {
          icon: AlertCircle,
          color: 'warning',
          title: 'Processing Error',
          bgClass: 'bg-amber-50 border-amber-200',
          textClass: 'text-amber-800',
          iconClass: 'text-amber-600'
        };
      case 'UNSUPPORTED_FORMAT':
      case 'FILE_TOO_LARGE':
        return {
          icon: AlertTriangle,
          color: 'warning',
          title: error.type === 'UNSUPPORTED_FORMAT' ? 'Unsupported Format' : 'File Too Large',
          bgClass: 'bg-orange-50 border-orange-200',
          textClass: 'text-orange-800',
          iconClass: 'text-orange-600'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'error',
          title: 'Error',
          bgClass: 'bg-error-50 border-error-200',
          textClass: 'text-error-800',
          iconClass: 'text-error-600'
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <div className={`${config.bgClass} border-2 rounded-2xl p-6 shadow-lg backdrop-blur-sm animate-slide-in`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 p-2 rounded-full bg-white/60 ${config.iconClass}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg ${config.textClass} mb-2`}>
            {config.title}
          </h3>
          <p className={`${config.textClass} opacity-90 leading-relaxed`}>
            {error.message}
          </p>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0">
          {error.retryable && (
            <button
              onClick={() => actions.processImage()}
              className={`
                inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                ${config.color === 'error' 
                  ? 'bg-error-600 text-white hover:bg-error-700 shadow-md hover:shadow-lg' 
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg'
                }
                transform hover:scale-105
              `}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          )}
          
          <button
            onClick={actions.clearError}
            className={`
              p-2 rounded-xl transition-all duration-200 hover:scale-110
              ${config.textClass} hover:bg-white/60
            `}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}