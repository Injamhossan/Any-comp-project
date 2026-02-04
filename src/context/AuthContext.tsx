
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: any | null; 
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
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  // Adapt NextAuth session user to look like Firebase User for compatibility
  const user = session?.user ? {
    ...session.user,
    uid: session.user.id,
    displayName: session.user.name,
    email: session.user.email,
    photoURL: session.user.image
  } : null;

  // NextAuth uses session cookies primarily, but we can pass a value if API needs it.
  // We'll pass null or session id for now.
  const token = null;

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};
