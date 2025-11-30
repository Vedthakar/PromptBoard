// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// change this to your backend URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // restore user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("pb_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const mapBackendUser = (backendUser: any): User => ({
    id: backendUser.id,
    email: backendUser.email,
    name: backendUser.first_name || backendUser.email,
  });

  const handleAuthSuccess = (data: any) => {
    const backendUser = data.user;
    const tokens = data.tokens;

    const mappedUser = mapBackendUser(backendUser);

    localStorage.setItem("pb_access", tokens.access);
    localStorage.setItem("pb_refresh", tokens.refresh);
    localStorage.setItem("pb_user", JSON.stringify(mappedUser));

    setUser(mappedUser);
  };

  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || "Failed to sign in");
    }

    const data = await res.json();
    handleAuthSuccess(data);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        first_name: name,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      // SimpleJWT / DRF errors: detail or field-level (email)
      throw new Error(data.detail || data.email?.[0] || "Failed to sign up");
    }

    const data = await res.json();
    handleAuthSuccess(data);
  };

  const signOut = () => {
    localStorage.removeItem("pb_access");
    localStorage.removeItem("pb_refresh");
    localStorage.removeItem("pb_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
