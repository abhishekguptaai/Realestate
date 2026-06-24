import { useState } from "react";
import { Building2, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const steps = [
  { title: "Basic Info", fields: ["title", "type", "purpose", "city", "locality"] },
  { title: "Details", fields: ["bedrooms", "bathrooms", "area", "price", "description"] },
  { title: "Photos", fields: ["images"] },
  { title: "Pricing", fields: ["negotiable", "maintenance"] },
  { title: "Review", fields: [] },
];

export default function AddProperty() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", type: "", purpose: "sale", city: "", locality: "",
    bedrooms: "", bathrooms: "", area: "", price: "", description: "",
    negotiable: false, maintenance: "",
  });

  const update = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    toast.success("Property submitted for approval!");
    setStep(0);
    setForm({
      title: "", type: "", purpose: "sale", city: "", locality: "",
      bedrooms: "", bathrooms: "", area: "", price: "", description: "",
      negotiable: false, maintenance: "",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Add Property</h1>
        <p className="text-muted-foreground">List your property in 5 simple steps</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2 flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i <= step ? "bg-[#C4703F] text-white" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`hidden sm:block text-xs ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-[#C4703F]" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">{steps[step].title}</h2>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Property Title *</label>
              <Input placeholder="e.g., 3BHK Apartment in Whitefield" value={form.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Property Type *</label>
                <select className="w-full p-2 rounded-md border bg-background" value={form.type} onChange={(e) => update("type", e.target.value)}>
                  <option value="">Select</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Purpose *</label>
                <select className="w-full p-2 rounded-md border bg-background" value={form.purpose} onChange={(e) => update("purpose", e.target.value)}>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">City *</label>
                <Input placeholder="Bangalore" value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Locality *</label>
                <Input placeholder="Whitefield" value={form.locality} onChange={(e) => update("locality", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                <Input type="number" placeholder="3" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bathrooms</label>
                <Input type="number" placeholder="3" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Super Built-up Area (sqft)</label>
                <Input type="number" placeholder="1800" value={form.area} onChange={(e) => update("area", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price (Rs.)</label>
                <Input type="number" placeholder="15000000" value={form.price} onChange={(e) => update("price", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea placeholder="Describe your property..." rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Photo upload feature will be available soon.</p>
            <p className="text-sm text-muted-foreground">You can add photos after the property is created.</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.negotiable} onChange={(e) => update("negotiable", e.target.checked)} className="accent-[#C4703F]" />
              <span className="text-sm">Price is negotiable</span>
            </label>
            <div>
              <label className="text-sm font-medium mb-1 block">Maintenance Charges (Rs./month)</label>
              <Input placeholder="5000" value={form.maintenance} onChange={(e) => update("maintenance", e.target.value)} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-medium">Review your listing</h3>
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <p><span className="text-muted-foreground">Title:</span> {form.title || "-"}</p>
              <p><span className="text-muted-foreground">Type:</span> {form.type || "-"}</p>
              <p><span className="text-muted-foreground">Purpose:</span> {form.purpose}</p>
              <p><span className="text-muted-foreground">Location:</span> {form.locality}{form.locality && form.city ? ", " : ""}{form.city}</p>
              <p><span className="text-muted-foreground">Bedrooms:</span> {form.bedrooms || "-"}</p>
              <p><span className="text-muted-foreground">Area:</span> {form.area ? `${form.area} sqft` : "-"}</p>
              <p><span className="text-muted-foreground">Price:</span> {form.price ? `Rs. ${form.price}` : "-"}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={() => setStep(step + 1)}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F]" onClick={handleSubmit}>
              <Check className="h-4 w-4 mr-1" /> Submit for Approval
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
