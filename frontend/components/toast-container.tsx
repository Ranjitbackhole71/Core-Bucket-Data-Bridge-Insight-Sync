"use client";

import { useApp } from '../context/app-context';
import { Toast } from './toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast: any) => (
        <div key={toast.id}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export { ToastContainer };