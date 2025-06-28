import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center border border-white/20">
            <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Ops! Algo deu errado</h2>
            <p className="text-blue-200 mb-6">
              Ocorreu um erro inesperado. Nossa equipe foi notificada.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              <RefreshCw size={20} />
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;