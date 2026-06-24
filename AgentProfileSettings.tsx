import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Building2, Phone, Mail, MapPin, Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AgentProfileSettings() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    company: "Kapoor Realty",
    rera: "PRM/KA/RERA/1251/2018",
    experience: "12",
    about: "With over 12 years of experience in Bangalore real estate, I specialize in luxury residential properties and premium villas.",
    specializations: "Residential, Luxury, Investment",
    city: "Bangalore",
    website: "www.kapoorrealty.com",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Profile Settings</h1>
        <p className="text-muted-foreground">Manage your agent profile and KYC details</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
            {user?.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : <User className="h-8 w-8 text-muted-foreground" />}
            <button className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Upload className="h-5 w-5 text-white" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold">Profile Photo</h3>
            <p className="text-sm text-muted-foreground">Recommended: 400x400px, JPG or PNG</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">Full Name</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-sm font-medium mb-1 block">Email</label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">Phone</label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><label className="text-sm font-medium mb-1 block">City</label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Company Name</label>
            <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">RERA Number</label><Input value={form.rera} onChange={(e) => setForm({ ...form, rera: e.target.value })} /></div>
            <div><label className="text-sm font-medium mb-1 block">Experience (Years)</label><Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">About</label>
            <Textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={4} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Specializations (comma separated)</label>
            <Input value={form.specializations} onChange={(e) => setForm({ ...form, specializations: e.target.value })} />
          </div>
        </div>

        <Button className="mt-6 bg-[#C4703F] hover:bg-[#A85A2F]" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
