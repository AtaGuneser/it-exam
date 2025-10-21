import { create } from "zustand";

type User = {
    id: string;
    name: string;
    email: string;
} | null;

type AuthState = {
    user: User;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem("token"),
    setUser: (user) => set({ user }),
    setToken: (token) => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
        set({ token });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },
}));
