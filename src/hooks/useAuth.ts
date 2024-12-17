import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';
import type { User } from '@/types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(auth.getUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialized = auth.init();
    setUser(auth.getUser());
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}