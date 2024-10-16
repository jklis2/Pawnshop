import { createContext, useState, useContext, ReactNode } from "react";

interface AlertContextProps {
  showAlert: (message: string, type: "success" | "info" | "error") => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// eslint-disable-next-line
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  const showAlert = (message: string, type: "success" | "info" | "error") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000); // alert znika po 5 sekundach
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
        </div>
      )}
    </AlertContext.Provider>
  );
};
