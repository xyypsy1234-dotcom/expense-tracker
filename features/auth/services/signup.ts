import type { SignupFormData } from "../schemas/signupSchema";
import type { SignupResponse } from "../types/auth";
import { mockUsers } from "../data/mockUsers";

export async function signup(data: SignupFormData): Promise<SignupResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const existingUser = mockUsers.find((user) => user.email === data.email);
  if (existingUser) {
    return {
      success: false,
      error: "A user with this email already exists",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: data.password,
  };
  mockUsers.push(newUser);

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
}
