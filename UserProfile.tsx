import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, MapPin, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-[#C4703F]" /> Personal Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">City</label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#C4703F]" /> Notification Preferences
          </h3>
          <div className="space-y-3">
            {["Email notifications for new listings", "SMS alerts for price drops", "WhatsApp updates for saved searches", "Marketing communications"].map((pref) => (
              <label key={pref} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-[#C4703F]" />
                <span className="text-sm">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="bg-[#C4703F] hover:bg-[#A85A2F]">Save Changes</Button>
      </form>
    </div>
  );
}
