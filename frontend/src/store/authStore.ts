import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../config';

interface AuthState {
  authUser: any;
  isLoading: boolean;
  isAuthenticated: boolean;

  signup: (data: object) => Promise<boolean | undefined>;
  login: (data: object) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  authUser: null,
  isLoading: false,
  isAuthenticated: false,

  signup: async (data: object) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BACKEND_URL}/api/auth/sign-up`, data, {
        withCredentials: true,
      });
      console.log('signup called', data);
      toast.success('account created');
      set({ isAuthenticated: true });
      return true;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data: object) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BACKEND_URL}/api/auth/sign-in`, data, {
        withCredentials: true,
      });
      toast.success('signin successful');
      set({ isAuthenticated: true });
      return true;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Signin failed');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success('logout successful');
      window.location.href = '/signin';
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },
}));
