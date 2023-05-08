import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const bearerToken = localStorage.getItem('bearerToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return !!(bearerToken && refreshToken);
      });

      const value = {
        isLoggedIn,
        setIsLoggedIn,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
