import { useEffect } from "react";
//  import "../Styles/Toast.css";

export default function ToastContainer({  toasts, removeToast, className = "" }) {

  console.log("TOASTCONTAINER RECEIVED:", toasts);

    
  useEffect(() => {
    if (toasts.length > 2) {
      // Si hay más de 2, eliminar el más antiguo
      removeToast(toasts[0].id);
    }
  }, [toasts, removeToast]);

  return (
    <div className={`toast-container ${className}`}>
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  );
}
