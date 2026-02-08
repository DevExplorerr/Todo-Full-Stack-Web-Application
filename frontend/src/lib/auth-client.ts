import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:8000",
    fetchOptions: {
        onError: async (context) => {
            const { response } = context;
            if (response.status === 401) {
                localStorage.removeItem("auth-token");
                window.location.href = "/login";
            }
        },
        onRequest: async (context) => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                // We cast to 'any' to stop TypeScript from complaining
                const ctx = context as any;

                // Ensure options object exists before touching headers
                if (!ctx.options) {
                    ctx.options = {};
                }
                if (!ctx.options.headers) {
                    ctx.options.headers = {};
                }
                
                // Attach the token safely
                ctx.options.headers["Authorization"] = `Bearer ${token}`;
            }
        }
    }
});