import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: ReactNode; // Указываем, что children могут быть любого типа, который поддерживает React
}

interface AuthContextType {
  isAuthenticated: boolean;
  // Добавьте другие свойства и методы, если необходимо
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("accessToken")
  );

  useEffect(() => {
    const handleCookieChange = () => {
      const accessToken = Cookies.get("accessToken");
      setIsAuthenticated(!!accessToken);
    };

    // Слушаем изменения куков
    window.addEventListener("storage", handleCookieChange);

    // Проверяем куки при монтировании компонента
    handleCookieChange();

    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
