import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  MapPin,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  BedDouble,
  Bath,
  Maximize,
  Car,
  Layers,
  Compass,
  Calendar,
  CheckCircle,
  Star,
  ArrowLeft,
  Home,
  Building2,
  Shield,
  Waves,
  Dumbbell,
  Zap,
  ArrowUpDown,
  TreePine,
  Wifi,
  Camera,
  Flame,
  Footprints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const amenityIcons: Record<string, React.ElementType> = {
  "Swimming Pool": Waves,
  "Gymnasium": Dumbbell,
  "24/7 Security": Shield,
  "Power Backup": Zap,
  "Lift": ArrowUpDown,
  "Parking": Car,
  "Club House": Building2,
  "Children Play Area": Home,
  "Rain Water Harvesting": TreePine,
  "Intercom": Phone,
  "Fire Safety": Flame,
  "CCTV": Camera,
  "Jogging Track": Footprints,
  "Landscaped Gardens": TreePine,
  "Wifi": Wifi,
};

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getPropertyBySlug, isSaved, toggleSave, properties, addEnquiry } = useData();
  const { isAuthenticated } = useAuth();
  const property = getPropertyBySlug(slug || "");
  const [showAllImages, setShowAllImages] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">The property you are looking for does not exist.</p>
        <Link to="/properties">
          <Button>Browse Properties</Button>
        </Link>
      </div>
    );
  }

  const similarProperties = properties.filter((p) => p.city === property.city && p.id !== property.id).slice(0, 3);
  const saved = isSaved(property.id);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      ...contactForm,
    });
    toast.success("Enquiry sent successfully!");
    setContactForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-custom pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-[#C4703F]">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-[#C4703F]">Properties</Link>
          <span>/</span>
          <span className="text-foreground">{property.title}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 rounded-xl overflow-hidden">
          <div className="lg:col-span-2 relative aspect-[16/10] lg:aspect-auto cursor-pointer" onClick={() => setShowAllImages(true)}>
            <img src={property.images[activeImage] || property.coverImage} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.isVerified && <Badge className="bg-[#2B6CB0] text-white">Verified</Badge>}
              {property.isFeatured && <Badge className="bg-[#C9A84C] text-white">Featured</Badge>}
              {property.isNewLaunch && <Badge className="bg-[#C4703F] text-white">New Launch</Badge>}
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-2 gap-2">
            {property.images.slice(0, 2).map((img, i) => (
              <div key={i} className="relative aspect-video cursor-pointer" onClick={() => { setActiveImage(i); setShowAllImages(true); }}>
                <img src={img} alt={`${property.title} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{property.title}</h1>
                  <p className="text-muted-foreground flex items-center gap-1 mt-2">
                    <MapPin className="h-4 w-4" /> {property.address}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleSave(property.id)} className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-muted">
                    <Heart className={`h-5 w-5 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <button className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-muted" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}>
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">{property.propertyType.replace("_", " ")}</Badge>
                <Badge variant="outline">{property.furnishing}</Badge>
                <Badge variant="outline">{property.facing} facing</Badge>
                <Badge variant="outline">{property.status}</Badge>
              </div>
            </div>

            <Separator />

            {/* Key Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                  { icon: Maximize, label: "Super Area", value: `${property.superBuiltUpArea} sqft` },
                  { icon: Maximize, label: "Carpet Area", value: `${property.carpetArea} sqft` },
                  { icon: Car, label: "Parking", value: property.parking },
                  { icon: Layers, label: "Floor", value: `${property.floorNumber} of ${property.totalFloors}` },
                  { icon: Compass, label: "Facing", value: property.facing },
                  { icon: Calendar, label: "Age", value: property.ageOfProperty || "New" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted rounded-lg p-4 text-center">
                    <item.icon className="h-5 w-5 text-[#C4703F] mx-auto mb-2" />
                    <p className="text-sm font-medium">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator />

            {/* Price Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Price Details</h2>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per sqft</span>
                  <span className="font-medium">Rs. {property.pricePerUnit}</span>
                </div>
                {property.maintenanceCharges && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-medium">Rs. {property.maintenanceCharges}</span>
                  </div>
                )}
                {property.securityDeposit && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-medium">Rs. {(property.securityDeposit / 100000).toFixed(1)}L</span>
                  </div>
                )}
                {property.isNegotiable && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" /> Price is negotiable
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div key={amenity} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Icon className="h-4 w-4 text-[#C4703F]" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* EMI Calculator */}
            <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-3">Home Loan EMI Estimate</h2>
              <QuickEMI price={property.price} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <p className="text-3xl font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)}L</p>
              <p className="text-sm text-muted-foreground">Rs. {property.pricePerUnit}/sqft</p>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#C4703F] hover:bg-[#A85A2F] h-12 text-base" onClick={() => toast.info("Contact feature coming soon!")}>
                  <Phone className="h-4 w-4 mr-2" /> Contact Agent
                </Button>
                <Button variant="outline" className="w-full h-12" onClick={() => toast.info("Visit scheduled!")}>
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Visit
                </Button>
                <Button variant="outline" className="w-full h-12" onClick={() => toast.info("Callback requested!")}>
                  <MessageSquare className="h-4 w-4 mr-2" /> Get Callback
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Agent Info */}
              <div className="flex items-center gap-3 mb-4">
                <img src={property.agentAvatar} alt={property.agentName} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{property.agentName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[#C9A84C] text-[#C9A84C]" />
                    <span className="text-sm text-muted-foreground">{property.rating} ({property.viewCount} views)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{property.agentPhone}</p>

              <Separator className="my-6" />

              {/* Contact Form */}
              <h4 className="font-medium mb-3">Send Enquiry</h4>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <Input placeholder="Your Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                <Input placeholder="Phone Number" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} required />
                <Input placeholder="Email" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                <Textarea placeholder="Message" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={3} />
                <Button type="submit" className="w-full bg-[#C4703F] hover:bg-[#A85A2F]">Send Enquiry</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="section-padding bg-[#FAF8F5] dark:bg-[#1a1a1a]">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                  <Link to={`/property/${p.slug}`}>
                    <div className="aspect-[4/3]">
                      <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="font-bold text-[#C4703F]">Rs. {(p.price / 100000).toFixed(1)}L</p>
                    <Link to={`/property/${p.slug}`}>
                      <h3 className="font-semibold mt-1 hover:text-[#C4703F] transition-colors">{p.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{p.locality}, {p.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function QuickEMI({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = useState(Math.round(price * 0.8 / 100000));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi = Math.round(loanAmount * 100000 * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1));
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount * 100000;

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-muted-foreground">Loan Amount (Lakhs)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full mt-1 p-2 rounded border bg-white dark:bg-[#1E1E1E]" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Interest Rate (%)</label>
          <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full mt-1 p-2 rounded border bg-white dark:bg-[#1E1E1E]" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Tenure (Years)</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full mt-1 p-2 rounded border bg-white dark:bg-[#1E1E1E]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-3">
          <p className="text-lg font-bold text-[#C4703F]">Rs. {emi.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Monthly EMI</p>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-3">
          <p className="text-lg font-bold">Rs. {(totalInterest / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground">Total Interest</p>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-3">
          <p className="text-lg font-bold">Rs. {(totalPayment / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground">Total Payment</p>
        </div>
      </div>
    </div>
  );
}
