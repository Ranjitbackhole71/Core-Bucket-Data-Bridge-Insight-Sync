"use client";

import { useState } from 'react';
import { ToastType } from '../components/toast';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts((prev: Toast[]) => [...prev, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev: Toast[]) => prev.filter((toast: Toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};