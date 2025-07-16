import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { login } from '../store/authSlice';
import { Link } from 'react-router-dom';
function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {register , handleSubmit} = useForm();

  const create = async(data) => {
      setError("")
      try{
        const userData = await authService.createAccount(data)
        if(userData) {
          const userData = await authService.getCurrentUser()
          console.log(userData);

          if(userData) dispatch(login(userData));
          navigate("/")
        }
      }
      catch (error) {
        setError(error.message);
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel - Welcome Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-950 text-white p-15">
          <h1 className="text-3xl font-bold mb-4">
            Join <span className="text-rose-400">CurioHive</span>
          </h1>
          <p className="text-lg text-gray-300 text-center">
            Sign up to start your journey with amazing content.
          </p>
        </div>

        {/* Right Panel - Signup Form */}
        <div className="w-full md:w-1/2 p-15">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create your account
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)} className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              {...register("name", { required: true })}
            />
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
                Sign Up
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
