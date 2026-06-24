import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const offices = [
    { city: "Bangalore", address: "Prestige Shantiniketan, Whitefield, Bangalore - 560048", phone: "+91 80 1234 5678" },
    { city: "Hyderabad", address: "Cyber Towers, HITEC City, Hyderabad - 500081", phone: "+91 40 1234 5678" },
    { city: "Mumbai", address: "Bandra Kurla Complex, Mumbai - 400051", phone: "+91 22 1234 5678" },
  ];

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get in Touch
          </h1>
          <p className="text-white/60 mt-2">We'd love to hear from you. Reach out for any queries or assistance.</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name *</label>
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email *</label>
                    <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject *</label>
                    <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="buying">Buying Property</SelectItem>
                        <SelectItem value="selling">Selling Property</SelectItem>
                        <SelectItem value="agent">Become an Agent</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message *</label>
                  <Textarea placeholder="How can we help you?" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" className="bg-[#C4703F] hover:bg-[#A85A2F]">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#C4703F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">1800-123-4567 (Toll Free)</p>
                    <p className="text-sm text-muted-foreground">+91 80 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#C4703F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@estateone.com</p>
                    <p className="text-sm text-muted-foreground">info@estateone.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#C4703F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-xl p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#C4703F]" /> WhatsApp Support
              </h3>
              <p className="text-sm text-muted-foreground mb-3">Chat with us on WhatsApp for quick assistance.</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Our Offices</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.city} className="bg-card rounded-xl border border-border p-6">
                <Building2 className="h-6 w-6 text-[#C4703F] mb-3" />
                <h3 className="font-semibold text-lg">{office.city}</h3>
                <p className="text-sm text-muted-foreground flex items-start gap-2 mt-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {office.address}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4 shrink-0" /> {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
