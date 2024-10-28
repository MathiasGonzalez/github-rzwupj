import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // For demo purposes, accept any valid email/password
        if (email && password.length >= 8) {
          set({
            isAuthenticated: true,
            user: {
              email,
              name: email.split('@')[0],
              firstName: '',
              lastName: '',
              company: '',
              role: '',
            },
          });
          return true;
        }
        return false;
      },
      signup: async (data: SignupData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set({
          isAuthenticated: true,
          user: {
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            firstName: data.firstName,
            lastName: data.lastName,
            company: data.company,
            role: data.role,
          },
        });
        return true;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;