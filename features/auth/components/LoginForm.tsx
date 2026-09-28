"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { login } from "../services/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { loginUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");
      const user = await login(data);
      loginUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setServerError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-2">
      {serverError && (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-3"
        >
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}
      <div className="text-center gap-2">
        <h1 className="text-2xl font-bold "> Expense Tracker </h1>
        <p className="pr-4 text-gray-500">Track your expenses and save money</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 px-3 py-3 outline-none focus:border-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 px-3 py-3 pr-10 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
          <Link
            href="/signup"
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
