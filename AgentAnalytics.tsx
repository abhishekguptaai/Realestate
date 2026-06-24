import { useState } from "react";
import { TrendingUp, Users, Eye, MessageSquare, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Jan", leads: 12, views: 340, enquiries: 8 },
  { month: "Feb", leads: 18, views: 420, enquiries: 12 },
  { month: "Mar", leads: 15, views: 380, enquiries: 10 },
  { month: "Apr", leads: 22, views: 510, enquiries: 15 },
  { month: "May", leads: 28, views: 640, enquiries: 19 },
  { month: "Jun", leads: 24, views: 580, enquiries: 16 },
];

export default function AgentAnalytics() {
  const [range, setRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Analytics</h1>
          <p className="text-muted-foreground">Track your performance and insights</p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 rounded-lg text-sm ${range === r ? "bg-[#C4703F] text-white" : "bg-muted"}`}>
              {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: "3,240", change: "+12%", icon: Eye },
          { label: "Leads Generated", value: "156", change: "+8%", icon: Users },
          { label: "Enquiries", value: "89", change: "+15%", icon: MessageSquare },
          { label: "Conversion Rate", value: "12.4%", change: "+2.1%", icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-[#C4703F]" />
                <span className="text-xs text-green-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#C4703F]/20 rounded-t relative" style={{ height: `${(d.leads / 30) * 100}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-[#C4703F] rounded-t" style={{ height: "100%" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Listing Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#C4703F]/20 rounded-t relative" style={{ height: `${(d.views / 700) * 100}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-[#2B6CB0] rounded-t" style={{ height: "100%" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Listings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Prestige Lakeside Habitat", views: 1245, enquiries: 32, conversion: "12%" },
              { title: "Sobha Dream Acres", views: 890, enquiries: 24, conversion: "10%" },
              { title: "The Royal Orchid Villa", views: 2100, enquiries: 45, conversion: "15%" },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-[#C4703F]/10 text-[#C4703F] flex items-center justify-center text-sm font-medium">{i + 1}</span>
                  <div>
                    <p className="font-medium text-sm">{l.title}</p>
                    <p className="text-xs text-muted-foreground">{l.views} views | {l.enquiries} enquiries</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">{l.conversion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
