"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  authToken: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isTokenExpired = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const handleAuthState = useCallback(async (refreshToken?: string) => {
    try {
      const accessToken = Cookies.get("authAccessToken");

      if (accessToken && !isTokenExpired(accessToken)) {
        setAuthToken(accessToken);
        setIsAuthenticated(true);
        return;
      }

      if (refreshToken) {
        const response = await axios.post(
          "https://trainess-api.dev-vt2b.ru/auth/refresh",
          {},
          { headers: { "refresh-token": refreshToken } }
        );

        const { access_token, refresh_token } = response.data;
        Cookies.set("authAccessToken", access_token, { expires: 1 });
        Cookies.set("authRefreshToken", refresh_token, { expires: 7 });

        setAuthToken(access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = Cookies.get("authRefreshToken");
      await handleAuthState(refreshToken);
    };

    initializeAuth();
  }, [handleAuthState]);

  const login = useCallback((token: string, refreshToken: string) => {
    Cookies.set("authAccessToken", token, { expires: 1 });
    Cookies.set("authRefreshToken", refreshToken, { expires: 7 });
    setAuthToken(token);
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("authAccessToken");
    Cookies.remove("authRefreshToken");
    setAuthToken(null);
    setIsAuthenticated(false);
    toast.success("Вы вышли из аккаунта", { icon: "🔚" });
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
