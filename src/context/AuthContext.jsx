import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

const checkLoggedIn = async () => {
    try {
       
        const res = await API.get("/auth/current_user", { withCredentials: true });
        setCurrUser(res.data);
    } catch (err) {
        setCurrUser(null);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ currUser, setCurrUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};