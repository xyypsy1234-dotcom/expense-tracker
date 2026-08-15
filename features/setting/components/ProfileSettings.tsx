"use client";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function ProfileSettings() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <section className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2">
        <h2 className="text-lg ">Profile</h2>
        <p className="text-sm text-gray-500">
          Your personal account information.
        </p>
      </div>
      <div className="grid max-w-xl gap-2">
        <div>
          <label htmlFor="name" className="pr-3">
            Name
          </label>
          <input
            id="name"
            value={user.name}
            readOnly
            className="rounded-md border bg-gray-50 px-1 py-1 "
          />
        </div>
        <div>
          <label htmlFor="email" className="pr-3">
            Email
          </label>
          <input
            id="email"
            value={user.email}
            readOnly
            className="rounded-md border bg-gray-50 px-1 py-1 "
          />
        </div>
      </div>
    </section>
  );
}
