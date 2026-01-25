"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  User, 
  getIdToken 
} from "firebase/auth";
import { app } from "@/firebase/firebase.config";

// Initialize Firebase Auth
const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const idToken = await getIdToken(currentUser);
        setToken(idToken);
      } else {
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Force token refresh utility if needed
  useEffect(() => {
     // Optional: interceptor logic or interval to refresh token can go here
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};
