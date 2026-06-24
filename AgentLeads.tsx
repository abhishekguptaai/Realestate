import { useState } from "react";
import { Search, Filter, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const leadsData = [
  { id: 1, name: "Amit Kumar", phone: "+91 98765 43210", email: "amit@email.com", property: "Prestige Lakeside Habitat", source: "Website", status: "New", date: "2026-06-23" },
  { id: 2, name: "Sneha Reddy", phone: "+91 98765 43211", email: "sneha@email.com", property: "The Royal Orchid Villa", source: "WhatsApp", status: "Contacted", date: "2026-06-22" },
  { id: 3, name: "Rajesh Gupta", phone: "+91 98765 43212", email: "rajesh@email.com", property: "Sobha Dream Acres", source: "Phone", status: "Visited", date: "2026-06-20" },
  { id: 4, name: "Priya Sharma", phone: "+91 98765 43213", email: "priya@email.com", property: "Brigade Gateway", source: "Referral", status: "Negotiation", date: "2026-06-18" },
  { id: 5, name: "Kiran Rao", phone: "+91 98765 43214", email: "kiran@email.com", property: "Lanco Hills Penthouse", source: "Website", status: "New", date: "2026-06-23" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Visited: "bg-purple-100 text-purple-700",
  Negotiation: "bg-orange-100 text-orange-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

export default function AgentLeads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = leadsData.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Leads</h1>
          <p className="text-muted-foreground">{filtered.length} leads</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-56" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Visited">Visited</option>
            <option value="Negotiation">Negotiation</option>
          </select>
        </div>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {["New", "Contacted", "Qualified", "Visited", "Negotiation", "Won/Lost"].map((s) => (
          <div key={s} className="bg-muted rounded-lg p-3 text-center">
            <p className="text-lg font-bold">{s === "Won/Lost" ? "2" : leadsData.filter((l) => l.status === s).length}</p>
            <p className="text-xs text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{lead.name}</h3>
                  <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{lead.property}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{lead.phone}</span>
                  <span>{lead.email}</span>
                  <span>Source: {lead.source}</span>
                  <span>{lead.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Phone className="h-3 w-3 mr-1" /> Call</Button>
                <Button size="sm" variant="outline"><Mail className="h-3 w-3 mr-1" /> Email</Button>
                <Button size="sm" variant="outline"><MessageSquare className="h-3 w-3 mr-1" /> Note</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
