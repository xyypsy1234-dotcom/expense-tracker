import type { User } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  message: string;
  user: User;
}

interface MeResponse {
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface CheckEmailResponse {
  exists: boolean;
}
export async function login(data: LoginData): Promise<User> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const result: AuthResponse = await response.json();
  return result.user;
}

export async function register(data: RegisterData): Promise<User> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  const result: AuthResponse = await response.json();

  return result.user;
}

export async function getMe(): Promise<User> {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Not authenticated");
  }
  const result: MeResponse = await response.json();

  return result.user;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
}

export async function checkEmail(email: string): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/api/auth/check-email?email=${encodeURIComponent(email)}`,
  );
  if (!response.ok) {
    throw new Error("Failed to check email");
  }
  const data: CheckEmailResponse = await response.json();
  return data.exists;
}
