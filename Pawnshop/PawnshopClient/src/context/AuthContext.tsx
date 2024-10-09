import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios"; // Dodaj axios jako zależność

type Employee = {
  firstName: string;
  lastName: string;
  login: string;
  role: string;
};

type AuthContextType = {
  employee: Employee | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  const login = async (login: string, password: string) => {
    const response = await axios.post("http://localhost:5000/api/login", {
      login,
      password,
    });

    const employeeData = response.data;
    setEmployee(employeeData);

    localStorage.setItem("employee", JSON.stringify(employeeData));
    localStorage.setItem(
      "loginExpiration",
      (Date.now() + 12 * 60 * 60 * 1000).toString()
    );
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem("employee");
    localStorage.removeItem("loginExpiration");
  };

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");
    const expiration = localStorage.getItem("loginExpiration");

    if (storedEmployee && expiration && Date.now() < parseInt(expiration)) {
      setEmployee(JSON.parse(storedEmployee));
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ employee, login, logout, isAuthenticated: !!employee }}
    >
      {children}
    </AuthContext.Provider>
  );
};
