import { goto } from "$app/navigation";
import { API_BASE_URL } from "$lib/constants";
import type { User } from "$lib/types";

class AuthStore {
    user = $state<User | null>(null);
    isAuthenticated = $state(false);
    loading = $state(true);
    error = $state<string | null>(null);

    private CACHE_INTERVAL = 5 * 60 * 1000; // 5 minutes

    constructor() {
        // Initialize from localStorage if available (client-side only)
        if (typeof localStorage !== "undefined") {
            const cachedUser = localStorage.getItem("user_profile");
            if (cachedUser) {
                this.user = JSON.parse(cachedUser);
                this.isAuthenticated = true;
            }
        }
    }

    async init() {
        if (typeof localStorage === "undefined") return;
        await this.checkAuth();
    }

    async checkAuth() {
        const token = localStorage.getItem("access_token");
        if (!token) {
            this.logout(false); // Don't redirect on initial check
            this.loading = false;
            return;
        }

        const lastVerified = Number(localStorage.getItem("token_last_verified") || "0");
        const now = Date.now();

        // If verified recently, just ensure we have the user
        if (now - lastVerified < this.CACHE_INTERVAL && this.user) {
            this.isAuthenticated = true;
            this.loading = false;
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/jwt/verify/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (res.ok) {
                localStorage.setItem("token_last_verified", now.toString());
                if (!this.user) {
                    await this.fetchUser(token);
                } else {
                    this.isAuthenticated = true;
                }
            } else if (res.status === 429) {
                console.warn("Auth verify throttled (429), assuming valid session");
                this.isAuthenticated = true;
            } else {
                await this.refreshToken();
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            // If network error but we have cached user, keep logged in temporarily
            if (!this.user) {
                this.isAuthenticated = false;
            }
        } finally {
            this.loading = false;
        }
    }

    async refreshToken() {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) {
            this.logout();
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/jwt/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("token_last_verified", Date.now().toString());
                await this.fetchUser(data.access);
            } else {
                this.logout();
            }
        } catch (err) {
            console.error("Refresh error:", err);
            this.logout();
        }
    }

    async fetchUser(token: string) {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/users/me/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                this.user = await res.json();
                this.isAuthenticated = true;
                localStorage.setItem("user_profile", JSON.stringify(this.user));
            } else {
                console.error("Failed to fetch user profile:", res.status);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        this.loading = true;
        this.error = null;
        try {
            const response = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                await this.fetchUser(data.access);
                return true;
            } else {
                const data = await response.json();
                this.error = data.detail || "Credenciales inválidas";
                return false;
            }
        } catch (err) {
            this.error = "Error de conexión con el servidor";
            return false;
        } finally {
            this.loading = false;
        }
    }

    logout(redirect = true) {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_profile");
            localStorage.removeItem("token_last_verified");
        }
        this.user = null;
        this.isAuthenticated = false;
        if (redirect) {
            goto("/login");
        }
    }
}

export const auth = new AuthStore();
