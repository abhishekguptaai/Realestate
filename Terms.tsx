export default function Terms() {
  return (
    <div className="container-custom py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Terms of Use</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">By accessing and using EstateOne, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Use of Platform</h2>
          <p className="text-muted-foreground leading-relaxed">EstateOne provides a platform for property listings, search, and connection with real estate agents. You agree to use the platform only for lawful purposes and in accordance with these terms.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Property Listings</h2>
          <p className="text-muted-foreground leading-relaxed">All property listings are provided by third-party agents and builders. EstateOne does not guarantee the accuracy of listings and advises users to verify all information independently.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">EstateOne shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform or any property transactions.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
        </section>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="container-custom py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">We collect information you provide directly (name, email, phone), usage data, and device information to improve our services.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Information</h2>
          <p className="text-muted-foreground leading-relaxed">We use your information to provide and improve our services, communicate with you, and personalize your experience on EstateOne.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">We may share your information with agents when you enquire about their listings. We do not sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Security</h2>
          <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">You have the right to access, correct, or delete your personal information. Contact us at privacy@estateone.com for any data-related requests.</p>
        </section>
      </div>
    </div>
  );
}
