import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/userContext';

export const Login = () => {
  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    setState('signup');
    setEmail('');
    setPassword('');
  };

  const switchToLogin = () => {
    setState('login');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center mt-[10%]">
      { state === 'login' &&
        <form
          onSubmit={handleSubmit}
          className="border border-black w-[350px] px-5 py-4 flex flex-col gap-6 rounded-xl"
        >
          <h1 className="text-center text-2xl">Login Form</h1>

          <input
            type="email"
            placeholder="Email"
            className="border border-black px-5 py-2 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-black px-5 py-2 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="border border-black rounded-xl cursor-pointer py-2"
          >
            Sign in
          </button>

          <p className="text-center">
            Don&apos;t have an account?
            <span
              className="underline cursor-pointer ml-1"
              onClick={switchToSignup}
            >
              Sign up
            </span>
          </p>
        </form>
      }
      {state === 'signup' &&
        <form
            onSubmit={handleSubmit}
            className="border border-black w-[350px] px-5 py-4 flex flex-col gap-6 rounded-xl"
          >
            <h1 className="text-center text-2xl">Login Form</h1>

            <input 
              type='text'
              placeholder='Name'
              className="border border-black px-5 py-2 rounded-xl"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="border border-black px-5 py-2 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-black px-5 py-2 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="border border-black rounded-xl cursor-pointer py-2"
            >
              Sign up
            </button>

            <p className="text-center">
              Already have an account?
              <span
                className="underline cursor-pointer ml-1"
                onClick={switchToLogin}
              >
                Sign in
              </span>
            </p>
        </form>
      }
    </div>
  );
};
