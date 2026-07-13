import type { LoginFormData } from "../schemas/loginSchema";
import type { LoginResponse } from "../types/auth";
import { mockUsers } from "../data/mockUsers";

export async function login(data: LoginFormData): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    (u) => u.email === data.email && u.password === data.password,
  );

  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  return {
    success: false,
    error: "Invalid email or password",
  };
}
