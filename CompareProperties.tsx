import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { GitCompare, X, Check, MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompareProperties() {
  const { properties, compareList, toggleCompare } = useData();
  const compared = properties.filter((p) => compareList.includes(p.id));

  if (compared.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Compare Properties</h1>
        <div className="text-center py-16 bg-muted rounded-xl">
          <GitCompare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-semibold mb-2">No properties to compare</h3>
          <p className="text-muted-foreground mb-4">Add up to 3 properties to compare</p>
          <Link to="/properties">
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features: { label: string; key: string; format: (v: unknown, p?: unknown) => string }[] = [
    { label: "Price", key: "price", format: (v) => `Rs. ${((v as number) / 100000).toFixed(1)}L` },
    { label: "Price/sqft", key: "pricePerUnit", format: (v) => `Rs. ${v}` },
    { label: "Bedrooms", key: "bedrooms", format: (v) => `${v} BHK` },
    { label: "Bathrooms", key: "bathrooms", format: (v) => `${v}` },
    { label: "Super Area", key: "superBuiltUpArea", format: (v) => `${v} sqft` },
    { label: "Carpet Area", key: "carpetArea", format: (v) => `${v} sqft` },
    { label: "Furnishing", key: "furnishing", format: (v) => `${v}` },
    { label: "Facing", key: "facing", format: (v) => `${v}` },
    { label: "Parking", key: "parking", format: (v) => `${v}` },
    { label: "Floor", key: "floorNumber", format: (v, p) => `${v} of ${(p as Record<string, unknown>)?.totalFloors ?? "-"}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Compare Properties</h1>
        <Link to="/properties">
          <Button variant="outline">Add More</Button>
        </Link>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 bg-muted rounded-tl-lg w-32">Feature</th>
              {compared.map((p) => (
                <th key={p.id} className="p-3 bg-muted min-w-[200px]">
                  <div className="relative">
                    <button onClick={() => toggleCompare(p.id)} className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="h-3 w-3 text-red-500" />
                    </button>
                    <Link to={`/property/${p.slug}`}>
                      <img src={p.coverImage} alt={p.title} className="h-24 w-full object-cover rounded-lg mb-2" />
                      <p className="text-sm font-medium text-left hover:text-[#C4703F]">{p.title}</p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.label} className="border-t">
                <td className="p-3 font-medium text-sm bg-muted/30">{f.label}</td>
                {compared.map((p) => (
                  <td key={p.id} className="p-3 text-sm">
                    {f.format((p as any)[f.key], p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t">
              <td className="p-3 bg-muted/30 rounded-bl-lg"></td>
              {compared.map((p) => (
                <td key={p.id} className="p-3">
                  <Button size="sm" className="bg-[#C4703F] hover:bg-[#A85A2F] w-full">Contact</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
