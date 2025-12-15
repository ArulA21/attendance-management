import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/userContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "login") {
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      login("login", { email, password });
    }

    if (state === "signup") {
      if (!name || !email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      login("signup", { name, email, password });
    }
  };

  const switchToSignup = () => {
    setState("signup");
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const switchToLogin = () => {
    setState("login");
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <form
        onSubmit={handleSubmit}
        className="border border-black w-[350px] px-5 py-4 flex flex-col gap-6 rounded-xl"
      >
        <h1 className="text-center text-2xl">
          {state === "login" ? "Login Form" : "Signup Form"}
        </h1>

        {state === "signup" && (
          <input
            type="text"
            placeholder="Name"
            className="border border-black px-5 py-2 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-black px-5 py-2 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 🔹 Password with Eye Icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-black px-5 py-2 rounded-xl w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="border border-black rounded-xl cursor-pointer py-2"
        >
          {state === "login" ? "Sign in" : "Sign up"}
        </button>

        <p className="text-center">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            className="underline cursor-pointer ml-1"
            onClick={state === "login" ? switchToSignup : switchToLogin}
          >
            {state === "login" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};
