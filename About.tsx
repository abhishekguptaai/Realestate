import { Link } from "react-router-dom";
import { CheckCircle, Users, Building2, Award, TrendingUp, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    { icon: CheckCircle, title: "Trust & Transparency", desc: "Every listing is verified and every transaction is transparent" },
    { icon: Users, title: "Customer First", desc: "We prioritize your needs above everything else" },
    { icon: Award, title: "Excellence", desc: "We strive for excellence in every interaction" },
    { icon: TrendingUp, title: "Innovation", desc: "Leveraging technology to simplify real estate" },
  ];

  const stats = [
    { value: "12,500+", label: "Properties Listed" },
    { value: "8,200+", label: "Happy Clients" },
    { value: "50+", label: "Cities Covered" },
    { value: "8+", label: "Years in Business" },
  ];

  const team = [
    { name: "Amit Sharma", role: "CEO & Founder", avatar: "/images/agents/agent-01.jpg" },
    { name: "Priya Patel", role: "COO", avatar: "/images/agents/agent-02.jpg" },
    { name: "Vikram Reddy", role: "Head of Sales", avatar: "/images/agents/agent-03.jpg" },
    { name: "Ananya Gupta", role: "Marketing Director", avatar: "/images/agents/agent-02.jpg" },
  ];

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Building Trust in <span className="text-[#C4703F]">Real Estate</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            EstateOne is India's most trusted real estate platform, connecting buyers, sellers, and agents with transparency and technology.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C4703F] py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="text-white/80 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/images/properties/prop-05.jpg" alt="Our Office" className="rounded-2xl shadow-xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2018, EstateOne emerged from a simple observation: the real estate industry in India needed a platform that prioritized trust, transparency, and technology.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What started as a small team in Bangalore has grown into a nationwide network of real estate professionals, serving thousands of happy clients across 50+ cities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, EstateOne is the go-to destination for property buyers, sellers, and investors who demand verified listings, expert guidance, and a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-padding bg-[#FAF8F5] dark:bg-[#1a1a1a]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Our Core Values</h2>
            <p className="text-muted-foreground mt-2">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 text-center">
                <v.icon className="h-10 w-10 text-[#C4703F] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Our Leadership</h2>
            <p className="text-muted-foreground mt-2">Meet the people behind EstateOne</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img src={member.avatar} alt={member.name} className="h-32 w-32 rounded-full object-cover mx-auto mb-4 border-4 border-[#C4703F]/20" />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-[#C4703F]">
        <div className="container-custom text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Join thousands of satisfied customers who found their perfect property through EstateOne.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/properties">
              <Button className="bg-white text-[#C4703F] hover:bg-white/90 font-medium">Browse Properties</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
