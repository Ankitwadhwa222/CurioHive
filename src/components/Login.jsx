import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel - Welcome Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-950 text-white p-15">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Curio<span className="text-rose-400">Hive</span>
          </h1>
          <p className="text-lg text-gray-300 text-center">
            Log in to explore, create, and connect with amazing content.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-1/2 p-15">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login to your account
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(login)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              {...register("password", { required: true })}
            />
            <button className="group mx-auto relative inline-flex items-center justify-center px-10 py-2 font-black uppercase border-2 border-white rounded-full overflow-hidden text-white bg-gray-950 cursor-pointer ">
              <span className="z-10 mix-blend-difference font-semibold transition-all duration-200 text-sm">
                Login
              </span>

              <span
                className="absolute top-0 left-[-100%] w-[calc(100%+1.2rem)] h-full bg-white z-0 transition-transform duration-200 group-hover:translate-x-full"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 1.2rem) 0, 100% 50%, calc(100% - 1.2rem) 100%, 0 100%)",
                }}
              ></span>
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-rose-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

//Login
