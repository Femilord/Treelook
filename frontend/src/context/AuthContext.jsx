import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem("treelook_token");

        if (!token) {
            setUser(null);
            setAuthLoading(false);
            return;
        }

        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch (error) {
            localStorage.removeItem("treelook_token");
            localStorage.removeItem("treelook_user");
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("treelook_token");
        localStorage.removeItem("treelook_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                authLoading,
                refreshUser: loadUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}