import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-heading font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: 8 February 2026</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">1. Introduction</h2>
              <p>
                ReviewCV ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services at review.cv.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold mb-2">Information you provide</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>CV/resume files you upload for analysis</li>
                <li>Account information (name, email address) if you create an account</li>
                <li>Communications you send to us (e.g. support requests)</li>
              </ul>
              <h3 className="text-lg font-semibold mt-4 mb-2">Information collected automatically</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device and browser information</li>
                <li>IP address and approximate location</li>
                <li>Usage data (pages visited, features used)</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and improve our CV analysis services</li>
                <li>Communicate with you about your account or our services</li>
                <li>Ensure the security and integrity of our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">4. Data Retention</h2>
              <p>
                Uploaded CV files are processed for analysis and are not stored permanently. We retain analysis results for as long as your account is active or as needed to provide our services. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">5. Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our platform, subject to confidentiality obligations. We may also disclose information where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">6. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">7. Cookies</h2>
              <p>
                We use essential cookies to ensure our website functions correctly. We may also use analytics cookies to understand how visitors interact with our site. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">8. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:contact@review.cv" className="text-primary hover:underline">
                  contact@review.cv
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
