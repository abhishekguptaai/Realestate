import { Link } from "react-router-dom";
import {
  Users, Building2, FolderOpen, MessageSquare, TrendingUp,
  ArrowUpRight, Eye, CheckCircle, Clock, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "2,450", change: "+5%", icon: Users, color: "text-blue-500" },
  { label: "Active Agents", value: "186", change: "+3%", icon: Users, color: "text-green-500" },
  { label: "Total Listings", value: "12,500", change: "+8%", icon: Building2, color: "text-[#C4703F]" },
  { label: "Leads Today", value: "45", change: "+12%", icon: MessageSquare, color: "text-purple-500" },
  { label: "Pending Approvals", value: "23", change: "-2%", icon: Clock, color: "text-amber-500" },
  { label: "Revenue", value: "Rs. 2.4L", change: "+15%", icon: TrendingUp, color: "text-green-600" },
];

const recentListings = [
  { title: "Luxury Apartment in HSR Layout", agent: "Rahul Kapoor", city: "Bangalore", status: "pending", date: "2 hours ago" },
  { title: "Commercial Space in HITEC City", agent: "Vikram Reddy", city: "Hyderabad", status: "approved", date: "5 hours ago" },
  { title: "Villa in Banjara Hills", agent: "Priya Sharma", city: "Hyderabad", status: "pending", date: "8 hours ago" },
];

const recentLeads = [
  { name: "Amit Kumar", property: "Prestige Lakeside Habitat", status: "New", time: "10 min ago" },
  { name: "Sneha Reddy", property: "The Royal Orchid Villa", status: "Contacted", time: "1 hour ago" },
  { name: "Rajesh Gupta", property: "Sobha Dream Acres", status: "Visited", time: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Dashboard</h1>
        <p className="text-white/60">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[#1E1E1E] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs text-green-400 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{stat.change}</span>
              </div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/50">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Charts */}
        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">Lead Trends (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {[35, 42, 38, 50, 45, 55, 48, 60, 52, 58, 65, 70, 62, 68, 75, 72, 80, 78, 85, 82, 90, 88, 95, 92, 100, 98, 105, 102, 110, 108].map((v, i) => (
                <div key={i} className="flex-1 bg-[#C4703F]/30 rounded-t" style={{ height: `${(v / 120) * 100}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>Day 1</span>
              <span>Day 15</span>
              <span>Day 30</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">Listings by City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: "Bangalore", count: 4200, percent: 85 },
                { city: "Hyderabad", count: 3100, percent: 62 },
                { city: "Mumbai", count: 5600, percent: 100 },
                { city: "Chennai", count: 2800, percent: 50 },
                { city: "Pune", count: 2400, percent: 43 },
              ].map((c) => (
                <div key={c.city}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{c.city}</span>
                    <span className="text-white">{c.count}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4703F] rounded-full" style={{ width: `${c.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">Pending Approvals</CardTitle>
            <Link to="/admin/listings"><Button variant="outline" size="sm">View All</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentListings.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">{l.title}</p>
                    <p className="text-xs text-white/50">{l.agent} | {l.city}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${l.status === "pending" ? "bg-amber-500/20 text-amber-400" : "bg-green-500/20 text-green-400"}`}>
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">Recent Leads</CardTitle>
            <Link to="/admin/leads"><Button variant="outline" size="sm">View All</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">{l.name}</p>
                    <p className="text-xs text-white/50">{l.property}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      l.status === "New" ? "bg-blue-500/20 text-blue-400" :
                      l.status === "Contacted" ? "bg-amber-500/20 text-amber-400" :
                      "bg-purple-500/20 text-purple-400"
                    }`}>{l.status}</span>
                    <p className="text-xs text-white/40 mt-1">{l.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
