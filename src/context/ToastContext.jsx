import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((toast) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast = {
      id,
      type: toast.type || 'success', // success, error, warning, info
      title: toast.title || (toast.type === 'error' ? 'Action Failed' : 'Success'),
      message: toast.message || '',
      duration: toast.duration || 3500
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';
            const isWarning = toast.type === 'warning';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl ${
                  isSuccess
                    ? 'bg-dark-900/95 border-neon/50 text-white shadow-neon/10'
                    : isError
                    ? 'bg-dark-900/95 border-red-500/50 text-white shadow-red-500/10'
                    : isWarning
                    ? 'bg-dark-900/95 border-amber-500/50 text-white shadow-amber-500/10'
                    : 'bg-dark-900/95 border-cyan-500/50 text-white shadow-cyan-500/10'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-neon" />}
                  {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-cyan-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold tracking-wide text-white">{toast.title}</h4>
                  {toast.message && <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{toast.message}</p>}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-zinc-400 hover:text-white transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

