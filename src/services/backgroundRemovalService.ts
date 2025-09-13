import type { RemovalOptions, ApiError, ApiErrorType } from '../types/index.js';

export class BackgroundRemovalService {
  private readonly baseUrl = 'https://api.remove.bg/v1.0/removebg';
  private readonly timeout = 30000; // 30 seconds
  private readonly apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY; // Your API key from env

  async removeBackground(imageFile: File, options: RemovalOptions): Promise<ArrayBuffer> {
    // Validate file
    this.validateFile(imageFile);

    // Create FormData
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', options.size);
    
    if (options.type) {
      formData.append('type', options.type);
    }
    
    if (options.format) {
      formData.append('format', options.format);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': this.apiKey,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await this.handleApiErrors(response);
      }

      const result = await response.arrayBuffer();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createApiError('NETWORK_ERROR', 'Request timeout - please try again');
        }
        
        if (error.message.includes('fetch')) {
          throw this.createApiError('NETWORK_ERROR', 'Network error - please check your connection');
        }
      }
      
      // Re-throw if it's already an ApiError
      if (this.isApiError(error)) {
        throw error;
      }
      
      throw this.createApiError('PROCESSING_ERROR', 'An unexpected error occurred');
    }
  }

  private validateFile(file: File): void {
    const maxSize = 12 * 1024 * 1024; // 12MB
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
      throw this.createApiError('FILE_TOO_LARGE', 'File size must be less than 12MB');
    }

    if (!supportedTypes.includes(file.type)) {
      throw this.createApiError('UNSUPPORTED_FORMAT', 'Supported formats: JPEG, PNG, WEBP');
    }
  }

  private async handleApiErrors(response: Response): Promise<never> {
    let errorMessage = 'Unknown error occurred';
    let errorType: ApiErrorType = 'PROCESSING_ERROR';

    try {
      const errorData = await response.json();
      errorMessage = errorData.errors?.[0]?.title || errorData.message || errorMessage;
    } catch {
      // If we can't parse JSON, use status-based messages
    }

    switch (response.status) {
      case 400:
        errorType = 'UNSUPPORTED_FORMAT';
        errorMessage = errorMessage || 'Invalid image format or corrupted file';
        break;
      case 401:
        errorType = 'INVALID_API_KEY';
        errorMessage = 'Invalid API key - please check your credentials';
        break;
      case 402:
        errorType = 'INSUFFICIENT_CREDITS';
        errorMessage = 'Insufficient API credits - please upgrade your plan';
        break;
      case 403:
        errorType = 'INVALID_API_KEY';
        errorMessage = 'API key access denied';
        break;
      case 429:
        errorType = 'PROCESSING_ERROR';
        errorMessage = 'Rate limit exceeded - please try again later';
        break;
      case 500:
      case 502:
      case 503:
        errorType = 'PROCESSING_ERROR';
        errorMessage = 'Server error - please try again later';
        break;
      default:
        errorType = 'PROCESSING_ERROR';
    }

    throw this.createApiError(errorType, errorMessage, response.status);
  }

  private createApiError(type: ApiErrorType, message: string, statusCode?: number): ApiError {
    return {
      type,
      message,
      statusCode,
      retryable: type === 'NETWORK_ERROR' || type === 'PROCESSING_ERROR',
    };
  }

  private isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'type' in error && 'message' in error;
  }
}