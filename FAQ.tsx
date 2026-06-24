import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    category: "General",
    questions: [
      { q: "What is EstateOne?", a: "EstateOne is India's most trusted real estate platform that connects property buyers, sellers, and agents. We offer verified listings, expert guidance, and a seamless property search experience across 50+ cities." },
      { q: "Is EstateOne free to use?", a: "Yes, browsing properties and using our search tools is completely free. We offer premium services for agents and builders who want to list their properties." },
      { q: "How do I contact an agent?", a: "You can contact agents directly through the property listing page. Each listing has a 'Contact Agent' button that allows you to send an enquiry or request a callback." },
    ],
  },
  {
    category: "Buying",
    questions: [
      { q: "How do I verify a property listing?", a: "All listings on EstateOne go through a verification process. Look for the 'Verified' badge on listings. We verify property documents, ownership details, and RERA registration." },
      { q: "What documents do I need to buy a property?", a: "Essential documents include: Sale deed, Title deed, Encumbrance certificate, RERA registration, NOC from relevant authorities, and Tax receipts. Our guides section has detailed checklists." },
      { q: "Can I schedule a site visit through EstateOne?", a: "Absolutely! Use the 'Schedule Visit' feature on any property or project page. Select your preferred date and time, and our team will coordinate with the agent or builder." },
    ],
  },
  {
    category: "Selling",
    questions: [
      { q: "How do I list my property?", a: "Register as an agent or owner, then use the 'Add Property' feature in your dashboard. Fill in property details, upload photos, and your listing will be live after verification." },
      { q: "How long does verification take?", a: "Verification typically takes 24-48 hours. Our team reviews property details, documents, and photos before approving the listing." },
      { q: "Can I edit my listing after posting?", a: "Yes, you can edit your listing anytime from your agent dashboard. Changes may be reviewed if they affect key property details." },
    ],
  },
  {
    category: "Agents",
    questions: [
      { q: "How do I become a verified agent?", a: "Register on EstateOne, complete your profile with RERA details, and submit verification documents. Our team will review and verify your account within 48 hours." },
      { q: "What are the subscription plans?", a: "We offer Free, Basic, Professional, and Premium plans. Each plan varies in listing limits, featured slots, lead access, and analytics. Check our pricing page for details." },
      { q: "How do I get leads?", a: "Leads are generated when users enquire about your listings. Premium plans get priority lead access and exclusive lead assignment." },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const filtered = faqData.map((cat) => ({
    ...cat,
    questions: cat.questions.filter((q) => q.q.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.questions.length > 0);

  const currentCategory = filtered.find((c) => c.category === activeCategory) || filtered[0];

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 mt-2">Find answers to common questions</p>
        </div>
      </div>

      <div className="container-custom py-8 max-w-4xl mx-auto">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {!search && (
          <div className="flex flex-wrap gap-2 mb-6">
            {faqData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => { setActiveCategory(cat.category); setOpenQuestion(null); }}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === cat.category ? "bg-[#C4703F] text-white" : "bg-muted hover:bg-[#C4703F]/10"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {(search ? filtered.flatMap((c) => c.questions) : currentCategory?.questions || []).map((q, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{q.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openQuestion === i ? "rotate-180" : ""}`} />
              </button>
              {openQuestion === i && (
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground">{q.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-xl p-6 text-center">
          <h3 className="font-semibold mb-2">Still have questions?</h3>
          <p className="text-sm text-muted-foreground mb-4">Our team is here to help you.</p>
          <Link to="/contact">
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">
              <Phone className="h-4 w-4 mr-2" /> Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
