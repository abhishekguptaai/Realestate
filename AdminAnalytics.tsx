import { TrendingUp, Users, Building2, Eye, MousePointer, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalytics() {
  const kpis = [
    { label: "Total Visitors", value: "45,230", change: "+18%", icon: Users },
    { label: "Page Views", value: "128,450", change: "+22%", icon: Eye },
    { label: "Avg Session", value: "4m 32s", change: "+8%", icon: TrendingUp },
    { label: "Bounce Rate", value: "34.2%", change: "-5%", icon: MousePointer },
  ];

  const topCities = [
    { city: "Mumbai", visitors: 12500, listings: 5600 },
    { city: "Bangalore", visitors: 11200, listings: 4200 },
    { city: "Delhi NCR", visitors: 10800, listings: 6800 },
    { city: "Hyderabad", visitors: 8900, listings: 3100 },
    { city: "Chennai", visitors: 7200, listings: 2800 },
  ];

  const topProperties = [
    { title: "Prestige Lakeside Habitat", views: 3200, enquiries: 85, city: "Bangalore" },
    { title: "My Home Avatar", views: 2800, enquiries: 72, city: "Hyderabad" },
    { title: "Lodha Park", views: 4100, enquiries: 98, city: "Mumbai" },
    { title: "Lanco Hills Penthouse", views: 2100, enquiries: 56, city: "Hyderabad" },
    { title: "Royal Orchid Villa", views: 1900, enquiries: 48, city: "Hyderabad" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-[#1E1E1E] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-5 w-5 text-[#C4703F]" />
                <span className="text-xs text-green-400 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-white/50">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader><CardTitle className="text-lg text-white">Traffic Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {[45, 52, 48, 60, 55, 68, 62, 75, 70, 82, 78, 90, 85, 95, 92, 100, 98, 105, 102, 110, 108, 115, 112, 120, 118, 125, 122, 130, 128, 135].map((v, i) => (
                <div key={i} className="flex-1 bg-[#C4703F]/30 rounded-t" style={{ height: `${(v / 150) * 100}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>Jun 1</span><span>Jun 15</span><span>Jun 30</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-white/10">
          <CardHeader><CardTitle className="text-lg text-white">Top Cities</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCities.map((c) => (
                <div key={c.city}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{c.city}</span>
                    <span className="text-white">{c.visitors.toLocaleString()} visitors</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4703F] rounded-full" style={{ width: `${(c.visitors / 13000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1E1E1E] border-white/10">
        <CardHeader><CardTitle className="text-lg text-white">Top Properties</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10">
                <th className="text-left p-3 font-medium text-white/60">Property</th>
                <th className="text-left p-3 font-medium text-white/60">City</th>
                <th className="text-left p-3 font-medium text-white/60">Views</th>
                <th className="text-left p-3 font-medium text-white/60">Enquiries</th>
                <th className="text-left p-3 font-medium text-white/60">Conv. Rate</th>
              </tr></thead>
              <tbody>
                {topProperties.map((p, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 text-white font-medium">{p.title}</td>
                    <td className="p-3 text-white/60">{p.city}</td>
                    <td className="p-3 text-white/60">{p.views.toLocaleString()}</td>
                    <td className="p-3 text-[#C4703F]">{p.enquiries}</td>
                    <td className="p-3 text-green-400">{((p.enquiries / p.views) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
