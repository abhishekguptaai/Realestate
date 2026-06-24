import { useState } from "react";
import { Calendar, Phone, MapPin, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const appointments = [
  { id: 1, visitor: "Amit Kumar", phone: "+91 98765 43210", property: "Prestige Lakeside Habitat", date: "2026-06-28", time: "10:00 AM", status: "confirmed" },
  { id: 2, visitor: "Sneha Reddy", phone: "+91 98765 43211", property: "The Royal Orchid Villa", date: "2026-06-29", time: "2:00 PM", status: "pending" },
  { id: 3, visitor: "Rajesh Gupta", phone: "+91 98765 43212", property: "Sobha Dream Acres", date: "2026-06-27", time: "11:00 AM", status: "completed" },
  { id: 4, visitor: "Priya Sharma", phone: "+91 98765 43213", property: "Brigade Gateway", date: "2026-06-30", time: "4:00 PM", status: "cancelled" },
];

export default function AgentAppointments() {
  const [filter, setFilter] = useState("all");

  const filtered = appointments.filter((a) => filter === "all" ? true : a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Appointments</h1>
          <p className="text-muted-foreground">Manage site visits and meetings</p>
        </div>
        <div className="flex gap-2">
          {["all", "confirmed", "pending", "completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${filter === f ? "bg-[#C4703F] text-white" : "bg-muted"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((apt) => (
          <div key={apt.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{apt.visitor}</h3>
                  <Badge className={
                    apt.status === "confirmed" ? "bg-green-100 text-green-700" :
                    apt.status === "pending" ? "bg-amber-100 text-amber-700" :
                    apt.status === "completed" ? "bg-blue-100 text-blue-700" :
                    "bg-red-100 text-red-700"
                  }>{apt.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{apt.property}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-[#C4703F]" /> {apt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-[#C4703F]" /> {apt.time}</span>
                  <span className="flex items-center gap-1"><Phone className="h-4 w-4 text-[#C4703F]" /> {apt.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {apt.status === "pending" && (
                  <>
                    <Button size="sm" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Confirm</Button>
                    <Button size="sm" variant="outline" className="text-red-600"><XCircle className="h-3 w-3 mr-1" /> Decline</Button>
                  </>
                )}
                {apt.status === "confirmed" && (
                  <>
                    <Button size="sm" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Complete</Button>
                    <Button size="sm" variant="outline"><RefreshCw className="h-3 w-3 mr-1" /> Reschedule</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
