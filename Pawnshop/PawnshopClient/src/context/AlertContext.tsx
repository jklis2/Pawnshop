import { createContext, useState, useContext, ReactNode } from "react";

interface AlertContextProps {
  showAlert: (
    message: string,
    type: "success" | "info" | "error",
    onConfirm?: () => void
  ) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: string;
    onConfirm?: () => void;
  } | null>(null);

  const showAlert = (
    message: string,
    type: "success" | "info" | "error",
    onConfirm?: () => void
  ) => {
    setAlert({ message, type, onConfirm });

    const duration = onConfirm ? 10000 : 5000; // 10 seconds for confirmation alerts, 5 seconds for others
    setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  const handleCancel = () => {
    setAlert(null);
  };

  const handleConfirm = () => {
    if (alert?.onConfirm) {
      alert.onConfirm();
    }
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "info"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
        >
          {alert.message}
          {alert.onConfirm && (
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
              >
                Anuluj
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded"
              >
                Potwierdź
              </button>
            </div>
          )}
        </div>
      )}
    </AlertContext.Provider>
  );
};
