export default function Privacy() {
  return (
    <div className="container-custom py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">We collect information you provide directly (name, email, phone), usage data, and device information to improve our services and personalize your experience.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Information</h2>
          <p className="text-muted-foreground leading-relaxed">We use your information to provide and improve our services, connect you with agents, send relevant property recommendations, and process your enquiries.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">We share your contact details with agents when you submit an enquiry about their listings. We do not sell your personal data to third parties for marketing purposes.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Cookies & Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences in your browser settings.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">You have the right to access, correct, or delete your personal information. Contact us at privacy@estateone.com for data-related requests.</p>
        </section>
      </div>
    </div>
  );
}
