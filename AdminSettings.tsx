import { useState } from "react";
import { Settings, Building2, Globe, CreditCard, Bell, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-48 shrink-0">
          <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id ? "bg-[#C4703F]/20 text-[#C4703F]" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#1E1E1E] border border-white/10 rounded-xl p-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "seo" && <SEOSettings />}
          {activeTab === "payment" && <PaymentSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  const [settings, setSettings] = useState({
    siteName: "EstateOne",
    tagline: "India's Most Trusted Real Estate Platform",
    contactEmail: "support@estateone.com",
    contactPhone: "1800-123-4567",
    address: "Prestige Shantiniketan, Whitefield, Bangalore - 560048",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">General Settings</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm text-white/60 mb-1 block">Site Name</label><Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="bg-[#2A2A2A] border-white/10" /></div>
        <div><label className="text-sm text-white/60 mb-1 block">Tagline</label><Input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="bg-[#2A2A2A] border-white/10" /></div>
        <div><label className="text-sm text-white/60 mb-1 block">Contact Email</label><Input value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="bg-[#2A2A2A] border-white/10" /></div>
        <div><label className="text-sm text-white/60 mb-1 block">Contact Phone</label><Input value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} className="bg-[#2A2A2A] border-white/10" /></div>
      </div>
      <div><label className="text-sm text-white/60 mb-1 block">Address</label><Textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="bg-[#2A2A2A] border-white/10" /></div>
      <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => toast.success("Settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
    </div>
  );
}

function SEOSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
      <div>
        <label className="text-sm text-white/60 mb-1 block">Meta Title</label>
        <Input defaultValue="EstateOne - India's Most Trusted Real Estate Platform" className="bg-[#2A2A2A] border-white/10" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">Meta Description</label>
        <Textarea defaultValue="Find verified properties for sale and rent across India. 12,500+ listings, trusted agents, and expert guidance." rows={3} className="bg-[#2A2A2A] border-white/10" />
      </div>
      <div>
        <label className="text-sm text-white/60 mb-1 block">Keywords</label>
        <Input defaultValue="real estate, property, buy, rent, apartment, villa, India" className="bg-[#2A2A2A] border-white/10" />
      </div>
      <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => toast.success("SEO settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Payment Settings</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm text-white/60 mb-1 block">Currency</label><Input defaultValue="INR" className="bg-[#2A2A2A] border-white/10" /></div>
        <div><label className="text-sm text-white/60 mb-1 block">Currency Symbol</label><Input defaultValue="Rs." className="bg-[#2A2A2A] border-white/10" /></div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-white/60">Payment Gateways</label>
        {["Razorpay", "Stripe", "PayU"].map((g) => (
          <label key={g} className="flex items-center gap-2 text-white/70">
            <input type="checkbox" defaultChecked className="accent-[#C4703F]" />
            {g}
          </label>
        ))}
      </div>
      <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => toast.success("Payment settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
      <div className="space-y-3">
        {[
          "Email notifications for new listings",
          "Email notifications for new leads",
          "SMS alerts for urgent enquiries",
          "Weekly analytics report",
          "New user registration alerts",
          "Agent verification requests",
        ].map((pref) => (
          <label key={pref} className="flex items-center gap-3 text-white/70">
            <input type="checkbox" defaultChecked className="accent-[#C4703F] h-4 w-4" />
            {pref}
          </label>
        ))}
      </div>
      <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => toast.success("Notification settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Security Settings</h2>
      <div className="space-y-3">
        {[
          "Enable two-factor authentication",
          "Require email verification for new users",
          "Enable CAPTCHA on enquiry forms",
          "Auto-suspend inactive accounts (30 days)",
          "Log all admin actions",
          "Enable IP-based rate limiting",
        ].map((pref) => (
          <label key={pref} className="flex items-center gap-3 text-white/70">
            <input type="checkbox" defaultChecked={pref.includes("CAPTCHA") || pref.includes("rate")} className="accent-[#C4703F] h-4 w-4" />
            {pref}
          </label>
        ))}
      </div>
      <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => toast.success("Security settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
    </div>
  );
}
