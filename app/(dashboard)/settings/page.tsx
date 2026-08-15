import ProfileSettings from "@/features/setting/components/ProfileSettings";
import { PreferenceSettings } from "@/features/setting/components/PreferenceSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">Settings Page</h1>
        <p className="text-sm text-gray-500">
          Manege your profile and application preferences here.
        </p>
      </div>
      <div className="space-y-4">
        <ProfileSettings />
        <PreferenceSettings />
      </div>
    </div>
  );
}
