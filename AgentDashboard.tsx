import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import {
  Building2, Users, TrendingUp, Eye, MessageSquare, Calendar,
  ArrowUpRight, ArrowDownRight, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgentDashboard() {
  const { user } = useAuth();
  const { properties } = useData();
  const myListings = properties.slice(0, 6);

  const stats = [
    { label: "Total Listings", value: 24, change: "+3", up: true, icon: Building2 },
    { label: "Active Listings", value: 18, change: "+2", up: true, icon: Eye },
    { label: "Total Leads", value: 156, change: "+12", up: true, icon: Users },
    { label: "Conversion Rate", value: "12%", change: "+2%", up: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Agent Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Link to="/agent-dashboard/add-property">
          <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">
            <Plus className="h-4 w-4 mr-2" /> Add Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-[#C4703F]" />
                <span className={`text-xs flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-600"}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Leads</CardTitle>
          <Link to="/agent-dashboard/leads" className="text-sm text-[#C4703F] hover:underline">View All</Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Amit Kumar", property: "Prestige Lakeside Habitat", date: "2 hours ago", status: "New" },
              { name: "Sneha Reddy", property: "The Royal Orchid Villa", date: "5 hours ago", status: "Contacted" },
              { name: "Rajesh Gupta", property: "Sobha Dream Acres", date: "1 day ago", status: "Visited" },
              { name: "Priya Sharma", property: "Brigade Gateway", date: "2 days ago", status: "Negotiation" },
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.property}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    lead.status === "New" ? "bg-blue-100 text-blue-700" :
                    lead.status === "Contacted" ? "bg-amber-100 text-amber-700" :
                    lead.status === "Visited" ? "bg-purple-100 text-purple-700" :
                    "bg-green-100 text-green-700"
                  }`}>{lead.status}</span>
                  <p className="text-xs text-muted-foreground mt-1">{lead.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Listings</h2>
          <Link to="/agent-dashboard/listings" className="text-sm text-[#C4703F] hover:underline">Manage All</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myListings.map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-[#C4703F] text-sm">Rs. {(p.price / 100000).toFixed(1)}L</p>
                <p className="font-medium text-sm truncate">{p.title}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{p.viewCount} views</span>
                  <span>{p.enquiryCount} enquiries</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
