import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuth: boolean;
  Login: () => void;
  Logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isToken, setIsToken] = useState(Cookies.get("accessToken"));
  const [isAuth, setIsAuth] = useState(false);

  React.useLayoutEffect(() => {
    console.log("refresh");
    if (!!Cookies.get("accessToken")) {
      try {
        axios
          .post(
            "https://trainess-api.dev-vt2b.ru/auth/refresh",
            {},
            {
              headers: {
                "refresh-token": Cookies.get("refreshToken") || "",
              },
            }
          )
          .then(function (response) {
            const result = response.data;
            Cookies.set("accessToken", result.access_token, { expires: 1 });
            Cookies.set("refreshToken", result.refresh_token, { expires: 7 });
            setIsToken(result.access_token);
          });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data.message || "Ошибка авторизации");
        } else {
          console.log("Неизвестная ошибка");
        }
      }
    }
  }, []);

  useEffect(() => {
    setIsAuth(!!isToken);
  }, [isToken]);

  const Login = () => {
    setIsAuth(true);
  };

  const Logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, Login, Logout }}>
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
