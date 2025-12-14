import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);

  // Check auth on refresh
  const checkAuth = async () => {
    try {
        console.log("Hi")
      const { data } = await axios.post("/auth/check");
      console.log(data, "data")
      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
      setAuthUser(null);
    }
  };

  // Login / Signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/${state}`, credentials);

      if (data.success) {
        setAuthUser(data.userData);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
    setToken(null);
    delete axios.defaults.headers.common["token"];
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

















