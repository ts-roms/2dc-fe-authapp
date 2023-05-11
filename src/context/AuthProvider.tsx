import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthProps = {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;