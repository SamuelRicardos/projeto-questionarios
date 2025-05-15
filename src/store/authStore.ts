import { create } from "zustand";

interface User {
  name: string;
  cargo: string;
  photo?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void; // ✅ Adicionei o método clearUser aqui
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }), // ✅ Agora o método realmente existe
}));
