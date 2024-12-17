import { User } from '@/types/auth';

interface LoginResponse {
  user: User;
  token: string;
}

export const auth = {
  user: null as User | null,
  token: null as string | null,
  
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data: LoginResponse = await response.json();
      auth.user = data.user;
      auth.token = data.token;
      
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      
      return auth.user;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    auth.user = null;
    auth.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
  
  getUser: () => auth.user,
  
  init: () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        auth.token = token;
        auth.user = user;
        return true;
      } catch (error) {
        auth.logout();
      }
    }
    return false;
  }
};