import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    const login = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem("admin", JSON.stringify(adminData));
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("admin");
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
