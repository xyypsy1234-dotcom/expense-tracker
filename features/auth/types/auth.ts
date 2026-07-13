export interface User {
  id: string;
  name: string;
  email: string;
}

export type LoginResponse =
  | { success: true; user: User }
  | { success: false; error: string };

export type SignupResponse =
  | { success: true; user: User }
  | { success: false; error: string };
