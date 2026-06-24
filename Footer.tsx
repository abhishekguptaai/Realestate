import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Buy Properties", href: "/properties?purpose=sale" },
    { label: "Rent Properties", href: "/properties?purpose=rent" },
    { label: "Commercial", href: "/properties?type=commercial" },
    { label: "New Projects", href: "/projects" },
    { label: "Find Agents", href: "/agents" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/about" },
  ],
  resources: [
    { label: "EMI Calculator", href: "/tools" },
    { label: "Market Trends", href: "/blog" },
    { label: "Buying Guides", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Sitemap", href: "/" },
  ],
  legal: [
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/terms" },
  ],
};

const cities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-[#C4703F]" />
              <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Estate<span className="text-[#C4703F]">One</span>
              </span>
            </Link>
            <p className="text-sm text-[#9B9590] mb-4 leading-relaxed">
              India's most trusted real estate platform. Find your perfect property with verified listings and expert guidance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#9B9590]">
                <Phone className="h-3.5 w-3.5 text-[#C4703F]" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9B9590]">
                <Mail className="h-3.5 w-3.5 text-[#C4703F]" />
                <span>support@estateone.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9B9590]">
                <MapPin className="h-3.5 w-3.5 text-[#C4703F]" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-[#FAF8F5]">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#9B9590] hover:text-[#C4703F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-[#FAF8F5]">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#9B9590] hover:text-[#C4703F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-[#FAF8F5]">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#9B9590] hover:text-[#C4703F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-[#FAF8F5]">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#9B9590] hover:text-[#C4703F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Cities */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9B9590]">Follow us:</span>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <button key={i} className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4703F] transition-colors">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#9B9590]">
              <span>Popular cities:</span>
              {cities.map((city) => (
                <Link
                  key={city}
                  to={`/properties?city=${city}`}
                  className="hover:text-[#C4703F] transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#9B9590]">
              &copy; {new Date().getFullYear()} EstateOne. All rights reserved.
            </p>
            <p className="text-xs text-[#9B9590]">
              RERA Registered | AERA Compliant | ISO 27001 Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
