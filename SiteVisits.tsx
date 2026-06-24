import { Calendar, MapPin, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoVisits = [
  { id: 1, property: "Prestige Lakeside Habitat", agent: "Rahul Kapoor", date: "2026-06-28", time: "10:00 AM", status: "confirmed", location: "Whitefield, Bangalore" },
  { id: 2, property: "Sobha Dream Acres", agent: "Priya Sharma", date: "2026-07-02", time: "11:30 AM", status: "pending", location: "Koramangala, Bangalore" },
];

export default function SiteVisits() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Site Visits</h1>
        <p className="text-muted-foreground">Manage your scheduled property visits</p>
      </div>

      <div className="space-y-4">
        {demoVisits.map((visit) => (
          <div key={visit.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{visit.property}</h3>
                  <Badge className={visit.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                    {visit.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#C4703F]" /> {visit.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-[#C4703F]" /> {visit.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-[#C4703F]" /> {visit.time}</span>
                  <span className="flex items-center gap-1"><Phone className="h-4 w-4 text-[#C4703F]" /> {visit.agent}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Reschedule</Button>
                <Button variant="outline" size="sm" className="text-red-600">Cancel</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
