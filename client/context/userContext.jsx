import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check auth (safe against race conditions)
  const checkAuth = async () => {
    try {
      const { data } = await axios.post("/auth/check");

      if (data.success) {
        setAuthUser(data.user);
      } else {
        setAuthUser(null);
      }
    } catch {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Run when token changes
  useEffect(() => {
    if (!token) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    checkAuth();
  }, [token]);

  // 🔹 Login / Signup
  const login = async (endpoint, credentials) => {
    try {
      const { data } = await axios.post(`/${endpoint}`, credentials);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setAuthUser(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Logout (HARD RESET)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
