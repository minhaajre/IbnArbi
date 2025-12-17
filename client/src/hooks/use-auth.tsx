import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth, onAuthChange, loginWithGoogle, logout } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Handle redirect result from Google sign-in
        const result = await getRedirectResult(auth);
        if (isMounted && result?.user) {
          console.log('User authenticated via redirect:', result.user.email);
        }
      } catch (error) {
        console.error('Redirect error:', error);
      }

      // Set up auth state listener - this will capture the current user state
      const unsubscribe = onAuthChange((user) => {
        if (isMounted) {
          console.log('Auth state changed:', user?.email || 'logged out');
          setUser(user);
          setLoading(false);
        }
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | null = null;
    initAuth().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signIn = async () => {
    await loginWithGoogle();
  };

  const signOutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
