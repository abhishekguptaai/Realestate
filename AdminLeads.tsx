import { useState } from "react";
import { Search, Phone, Mail, Calendar, UserCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const leadsData = [
  { id: 1, name: "Amit Kumar", email: "amit@email.com", phone: "+91 98765 43210", property: "Prestige Lakeside Habitat", agent: "Rahul Kapoor", status: "New", source: "Website", date: "2026-06-23" },
  { id: 2, name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 98765 43211", property: "The Royal Orchid Villa", agent: "Vikram Reddy", status: "Contacted", source: "WhatsApp", date: "2026-06-22" },
  { id: 3, name: "Rajesh Gupta", email: "rajesh@email.com", phone: "+91 98765 43212", property: "Sobha Dream Acres", agent: "Priya Sharma", status: "Visited", source: "Phone", date: "2026-06-20" },
  { id: 4, name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43213", property: "Brigade Gateway", agent: "Rahul Kapoor", status: "Negotiation", source: "Referral", date: "2026-06-18" },
  { id: 5, name: "Kiran Rao", email: "kiran@email.com", phone: "+91 98765 43214", property: "Lanco Hills Penthouse", agent: "Vikram Reddy", status: "New", source: "Website", date: "2026-06-23" },
];

const pipeline = ["New", "Contacted", "Qualified", "Visited", "Negotiation", "Won", "Lost"];

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("pipeline");

  const statusColors: Record<string, string> = {
    New: "bg-blue-500/20 text-blue-400",
    Contacted: "bg-amber-500/20 text-amber-400",
    Qualified: "bg-purple-500/20 text-purple-400",
    Visited: "bg-cyan-500/20 text-cyan-400",
    Negotiation: "bg-orange-500/20 text-orange-400",
    Won: "bg-green-500/20 text-green-400",
    Lost: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Leads CRM</h1>
        <div className="flex gap-2">
          <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-56 bg-[#1E1E1E] border-white/10" />
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("pipeline")} className={`px-3 py-2 text-sm ${viewMode === "pipeline" ? "bg-[#C4703F] text-white" : "bg-[#1E1E1E] text-white/60"}`}>Pipeline</button>
            <button onClick={() => setViewMode("list")} className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-[#C4703F] text-white" : "bg-[#1E1E1E] text-white/60"}`}>List</button>
          </div>
        </div>
      </div>

      {viewMode === "pipeline" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {pipeline.map((stage) => (
            <div key={stage} className="bg-[#1E1E1E] border border-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">{stage}</span>
                <span className="text-xs text-white/40">{leadsData.filter((l) => l.status === stage).length}</span>
              </div>
              <div className="space-y-2">
                {leadsData.filter((l) => l.status === stage).map((lead) => (
                  <div key={lead.id} className="bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/10">
                    <p className="text-xs text-white font-medium">{lead.name}</p>
                    <p className="text-[10px] text-white/40 truncate">{lead.property}</p>
                    <p className="text-[10px] text-white/30">{lead.agent}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#1E1E1E] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-medium text-white/60">Lead</th>
                  <th className="text-left p-4 font-medium text-white/60">Property</th>
                  <th className="text-left p-4 font-medium text-white/60">Agent</th>
                  <th className="text-left p-4 font-medium text-white/60">Status</th>
                  <th className="text-left p-4 font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadsData.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <p className="text-white font-medium">{lead.name}</p>
                      <p className="text-xs text-white/40">{lead.phone}</p>
                    </td>
                    <td className="p-4 text-white/60">{lead.property}</td>
                    <td className="p-4 text-white/60">{lead.agent}</td>
                    <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[lead.status]}`}>{lead.status}</span></td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button onClick={() => toast.info("Calling...")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10"><Phone className="h-4 w-4 text-white/60" /></button>
                        <button onClick={() => toast.info("Emailing...")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10"><Mail className="h-4 w-4 text-white/60" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
