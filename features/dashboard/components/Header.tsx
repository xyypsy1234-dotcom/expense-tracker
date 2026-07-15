"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="flex items-center justify-end border-b border-gray-600 px-4 py-2 bg-gray-700">
      <div className="flex items-center gap-4">
        <span className="text-white text-sm">{user?.name}</span>
        <button
          onClick={handleLogout}
          className=" rounded-md px-3 py-1 text-sm  text-white hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
