import { User } from '@/types/auth';

// Simulated authentication - replace with real auth service
export const auth = {
  user: null as User | null,
  
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@example.com' && password === 'password') {
      auth.user = {
        id: '1',
        email,
        name: 'Demo User'
      };
      return auth.user;
    }
    
    throw new Error('Invalid credentials');
  },
  
  logout: async () => {
    auth.user = null;
  },
  
  getUser: () => auth.user
};