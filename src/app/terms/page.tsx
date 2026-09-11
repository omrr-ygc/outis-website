import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Outis Clips",
  description: "Terms and conditions for using Outis Clips services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-burgundy-deep text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <Link href="/" className="text-sm text-gold/60 hover:text-gold transition-colors mb-8 inline-block">
          &larr; Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gold-light mb-2">Terms of Service</h1>
        <p className="text-sm text-gold-light/40 mb-12">Last updated: September 2026</p>

        <div className="prose-sm space-y-8 text-gold-light/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Outis Clips website (&ldquo;outisclips.com&rdquo;) and services provided by Outis Media LLC (&ldquo;Outis Clips&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">2. Services</h2>
            <p>
              Outis Clips provides managed content clipping and distribution services. We coordinate independent creators who post short-form video content derived from our clients&apos; existing assets across social media platforms including TikTok, Instagram and YouTube. Specific service terms, deliverables and pricing are established in individual service agreements with each client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">3. Booking and Consultations</h2>
            <p>
              Strategy calls booked through our website are subject to availability. We reserve the right to reschedule or cancel bookings with reasonable notice. Booking a call does not create a binding service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">4. Client Obligations</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>You must have the rights or authorization to share any content you provide to us for clipping and distribution.</li>
              <li>You are responsible for ensuring that content complies with applicable laws and platform terms of service.</li>
              <li>You agree to provide accurate information when booking calls or signing up for services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">5. Payment Terms</h2>
            <p>
              Payment terms, including minimum budgets, service fees and campaign budgets, are defined in individual service agreements. The minimum campaign budget is $1,000 USD. A service fee is deducted as a percentage of the total campaign budget; the remainder is allocated to creator payouts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos and design — is the property of Outis Media LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works without our written permission.
            </p>
            <p>
              Content provided by clients for distribution remains the intellectual property of the client. By providing content, the client grants Outis Clips a limited license to edit, reformat and distribute that content through our creator network for the duration of the campaign.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">7. Disclaimers</h2>
            <p>
              Our services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; While we work to deliver quality results, we cannot guarantee specific view counts, engagement rates or viral outcomes. Social media platform algorithms and policies are beyond our control and may affect campaign performance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Outis Media LLC shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">10. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes become effective upon posting to this page. Your continued use of the website after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gold-light mb-3">11. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{" "}
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
