import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Outis Clips",
  description: "How Outis Clips collects, uses and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-burgundy-deep text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <Link href="/" className="text-sm text-gold/60 hover:text-gold transition-colors mb-8 inline-block">
          &larr; Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gold-light mb-2">Privacy Policy</h1>
        <p className="text-sm text-gold-light/40 mb-12">Last updated: September 2026</p>

        <div className="prose-sm space-y-8 text-gold-light/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">1. Who We Are</h2>
            <p>
              Outis Media LLC (&ldquo;Outis Clips&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the website outisclips.com.
              This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">2. Information We Collect</h2>
            <p><strong className="text-gold-light/80">Personal information you provide:</strong> When you book a strategy call or contact us, we collect your name, email address, company name and any message you include.</p>
            <p><strong className="text-gold-light/80">Automatically collected information:</strong> We may collect standard web analytics data such as IP address, browser type, operating system, referring URLs, pages viewed and time spent on the site. We use this data in aggregate to improve our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To schedule and confirm strategy calls</li>
              <li>To respond to your inquiries</li>
              <li>To send you relevant information about our services (only with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting business (e.g., email services, hosting), provided they agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, delete or port your personal data. You may also object to or restrict certain processing. To exercise these rights, contact us at info@outisclips.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">7. Cookies</h2>
            <p>
              Our website may use essential cookies required for the site to function. We do not use tracking or advertising cookies. If we add analytics in the future, we will update this policy and provide you with appropriate notice and controls.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">8. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete that information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:info@outisclips.com" className="text-gold hover:text-gold-light transition-colors">
                info@outisclips.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
