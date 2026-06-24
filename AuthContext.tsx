import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "user" | "agent" | "builder" | "admin";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  city?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
  city?: string;
  companyName?: string;
  reraNumber?: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  "user@estateone.com": {
    id: 1,
    name: "Rahul Sharma",
    email: "user@estateone.com",
    password: "password",
    avatar: "/images/agents/agent-01.jpg",
    role: "user",
    phone: "+91 98765 43210",
    city: "Bangalore",
  },
  "agent@estateone.com": {
    id: 2,
    name: "Priya Patel",
    email: "agent@estateone.com",
    password: "password",
    avatar: "/images/agents/agent-02.jpg",
    role: "agent",
    phone: "+91 98765 43211",
    city: "Hyderabad",
  },
  "admin@estateone.com": {
    id: 3,
    name: "Admin User",
    email: "admin@estateone.com",
    password: "password",
    avatar: "/images/agents/agent-03.jpg",
    role: "admin",
    phone: "+91 98765 43212",
    city: "Mumbai",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) return JSON.parse(stored);
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (!demoUser || demoUser.password !== password) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }
    const { password: _, ...userWithoutPassword } = demoUser;
    setUser(userWithoutPassword);
    localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: AuthUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: (data.role as UserRole) || "user",
      phone: data.phone,
      city: data.city,
    };
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem("auth_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
