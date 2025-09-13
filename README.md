# Background Remover Web Application

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.2-blue.svg)

A modern web application that allows users to upload images and automatically remove backgrounds using the remove.bg API. Built with React 19.1.1, TypeScript 5.8.3, and Tailwind CSS 4.1.13 for a seamless user experience.

## ✨ Features

- **Drag & Drop Upload**: Intuitive interface for image upload
- **AI-Powered Processing**: Automatic background removal using remove.bg API
- **Multiple Formats**: Support for JPEG, PNG, and WEBP images
- **Real-time Preview**: Instant preview of uploaded and processed images
- **Before/After Comparison**: Side-by-side comparison view
- **Download Ready**: One-click download of processed images
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your system
- A remove.bg API key (get one free at [remove.bg](https://www.remove.bg/api))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 API Key Setup

1. **Get your API key**:
   - Visit [remove.bg API](https://www.remove.bg/api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Add API key to the application**:
   - Open the application in your browser
   - Look for the "Enter remove.bg API key" field in the header
   - Paste your API key (it will be saved locally)

## 📖 How to Use

1. **Upload an Image**:
   - Drag and drop an image onto the upload area, or
   - Click to browse and select an image file
   - Supported formats: JPEG, PNG, WEBP (max 12MB)

2. **Process the Image**:
   - Enter your remove.bg API key if not already done
   - Click "Remove Background" to start processing
   - Wait for the AI to process your image

3. **Download Result**:
   - View the processed image with transparent background
   - Use the comparison view to see before/after
   - Click "Download" to save the result

## 🛠️ Technical Details

### Technology Stack

- **Frontend**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: React Context API with useReducer
- **File Handling**: react-dropzone 14.3.8
- **Icons**: Lucide React 0.544.0
- **API Integration**: remove.bg REST API

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # App header with API key input
│   ├── Footer.tsx       # App footer
│   ├── ImageUploader.tsx # Drag & drop upload component
│   ├── ImageProcessor.tsx # Processing control component
│   ├── ImageGallery.tsx  # Results display component
│   └── ErrorAlert.tsx    # Error handling component
├── context/
│   └── AppContext.tsx    # Global state management
├── services/
│   └── backgroundRemovalService.ts # API integration
├── types/
│   └── index.ts          # TypeScript type definitions
├── assets/              # Static assets
├── App.css              # Global styles
├── App.tsx              # Main app component
├── index.css            # Base styles
├── main.tsx             # App entry point
└── vite-env.d.ts        # Vite type definitions
```

### Key Features Implementation

- **State Management**: Uses React Context with useReducer for predictable state updates
- **File Validation**: Client-side validation for file type and size (JPEG, PNG, WEBP, max 12MB)
- **Error Handling**: Comprehensive error categorization and user feedback with ErrorAlert component
- **Progress Tracking**: Real-time progress updates during processing with visual indicators
- **Memory Management**: Proper cleanup of object URLs to prevent memory leaks
- **Responsive Design**: Mobile-first design with Tailwind CSS utilities
- **Modern UI**: Glass-morphism effects and smooth animations for enhanced user experience

## 🔧 Configuration

### API Settings

The application supports various remove.bg API options:

- **Output Size**: Auto, Preview (0.25 MP), or Full Resolution
- **Output Format**: PNG (transparent) or JPG (white background)
- **Subject Type**: Auto-detect, Person, or Product

### Environment Variables

No environment variables required. The API key is stored securely in the browser's localStorage.

### Development Configuration

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Configured with React and TypeScript rules
- **Vite**: Optimized for fast development and production builds
- **PostCSS**: Integrated with Tailwind CSS for utility-first styling

## 🚀 Building for Production

```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

*Note: Modern browsers with ES2020+ support required for optimal performance.*

## 🔒 Privacy & Security

- **No Server Storage**: Images are processed directly through the remove.bg API
- **Local API Key Storage**: API keys are stored locally in your browser
- **No Data Tracking**: No user data is collected or tracked
- **Secure Processing**: All processing happens via HTTPS

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify your API key is correct
   - Check that you have remaining credits on your remove.bg account

2. **"File Too Large" Error**
   - Ensure your image is under 12MB
   - Consider resizing the image before upload

3. **"Network Error"**
   - Check your internet connection
   - Try again after a few moments

4. **Processing Fails**
   - Ensure the image is a valid format (JPEG, PNG, WEBP)
   - Try with a different image
   - Check your remove.bg account credits

### Getting Help

- Check the browser console for detailed error messages
- Verify your remove.bg API key and account status
- Ensure you have a stable internet connection

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [remove.bg](https://www.remove.bg/api/) for the powerful background removal API
- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons