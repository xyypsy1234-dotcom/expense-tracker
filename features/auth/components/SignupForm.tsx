"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schemas/signupSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { register as registerApi } from "../services/authApi";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      setMessage("");
      await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setMessage("Account created successfully. You can now log in!");
      reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Signup failed:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create account");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <div>
          {message && <p className="text-black-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 pr-2 "
          >
            Name:
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="rounded-md p-2 mb-2 border border-gray-300 outline-none focus:border-black"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="rounded-md p-2 border border-gray-300 outline-none focus:border-black"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="rounded-md p-2 w-full border border-gray-300 outline-none focus:border-black"
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
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 "
          >
            Confirm Password:
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full rounded-md p-2 mb-2 border border-gray-300 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={
                showConfirmPassword ? "Hide Password" : "Show Password"
              }
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
