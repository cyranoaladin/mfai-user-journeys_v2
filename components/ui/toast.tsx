import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

export function Toast({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  isVisible 
}: ToastProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
    
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const bgColors = {
    success: 'bg-green-800/90 border-green-600',
    info: 'bg-blue-800/90 border-blue-600',
    warning: 'bg-amber-800/90 border-amber-600',
    error: 'bg-red-800/90 border-red-600'
  };

  const iconMap = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-md ${bgColors[type]}`}
        >
          <span className="text-lg">{iconMap[type]}</span>
          <p className="text-sm font-medium text-white">{message}</p>
          <button 
            onClick={handleClose}
            className="ml-2 rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useToast() {
  const [state, setState] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const toast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setState({ isVisible: true, message, type });
  };

  const dismiss = () => {
    setState(prev => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    dismiss,
    state
  };
}
