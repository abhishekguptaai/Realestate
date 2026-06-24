import { useData } from "@/contexts/DataContext";
import { MessageSquare, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MyEnquiries() {
  const { enquiries } = useData();

  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-amber-100 text-amber-700",
    Visited: "bg-purple-100 text-purple-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>My Enquiries</h1>
        <p className="text-muted-foreground">Track all your property enquiries</p>
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-xl">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-semibold mb-2">No enquiries yet</h3>
          <p className="text-muted-foreground">Start enquiring about properties you like</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div key={e.id} className="bg-card rounded-xl border border-border p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{e.propertyTitle || e.projectName}</h3>
                  <Badge className={statusColors[e.status] || "bg-muted"}>{e.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{e.message}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(e.createdAt).toLocaleDateString()}</span>
                  <span>To: {e.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
