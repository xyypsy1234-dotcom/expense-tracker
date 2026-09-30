"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schemas/signupSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { register as registerApi, checkEmail } from "../services/authApi";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailAvailable, setEmailAvailabe] = useState(false);

  const emailRegisterb = register("email");

  const handleEmailBlur = async () => {
    const email = getValues("email");
    if (!email) {
      setEmailAvailabe(false);
      return;
    }
    const isValid = await trigger("email");
    if (!isValid) {
      setEmailAvailabe(false);
      return;
    }

    try {
      setIsCheckingEmail(true);
      const exists = await checkEmail(email);
      if (exists) {
        setError("email", {
          type: "manual",
          message: "Email already registered",
        });
        setEmailAvailabe(false);
      } else {
        clearErrors("email");
        setEmailAvailabe(true);
      }
    } catch (error) {
      console.error("Email check failed:", error);
      setEmailAvailabe(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setServerError("");
      setMessage("");
      await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setMessage("Account created successfully. You can now log in!");
      reset();
      setEmailAvailabe(false);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Signup failed:", error);
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Failed to create account");
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
          {message && <p className="text-green-500">{message}</p>}
          {serverError && <p className="text-red-500">{serverError}</p>}
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
            {...emailRegisterb}
            onBlur={async (event) => {
              emailRegisterb.onBlur(event);
              await handleEmailBlur();
            }}
            type="email"
            placeholder="Enter your email"
            className="rounded-md p-2 border border-gray-300 outline-none focus:border-black"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {isCheckingEmail && !errors.email && (
            <p className="text-sm text-muted-foreground">Checking email...</p>
          )}
          {emailAvailable && !errors.email && (
            <p className="text-sm text-green-600">Email is available</p>
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
            disabled={isSubmitting || !emailAvailable}
            className="rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
