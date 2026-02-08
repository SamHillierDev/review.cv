import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-heading font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">Last updated: 8 February 2026</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using ReviewCV ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">2. Description of Service</h2>
              <p>
                ReviewCV provides AI-powered CV and resume analysis. The Service analyses uploaded documents and provides feedback, scores, and suggestions to help improve your CV. The Service is provided for informational purposes and does not guarantee employment outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">3. User Accounts</h2>
              <p>
                You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Upload content that is unlawful, harmful, or infringes on the rights of others</li>
                <li>Attempt to gain unauthorised access to our systems or other users' accounts</li>
                <li>Use the Service for any purpose other than its intended use</li>
                <li>Interfere with or disrupt the Service or its infrastructure</li>
                <li>Use automated tools to scrape or extract data from the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">5. Intellectual Property</h2>
              <p>
                You retain ownership of the CV documents you upload. By uploading a document, you grant us a limited licence to process it for the purpose of providing our analysis service. All other content, branding, and technology on the Service are the property of ReviewCV.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">6. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that the analysis results will be accurate or complete. CV analysis is provided as guidance only and should not be relied upon as professional career advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, ReviewCV shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">8. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">9. Changes to Terms</h2>
              <p>
                We may modify these Terms of Service at any time. We will notify you of material changes by posting the updated terms on this page. Your continued use of the Service after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
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

export default Terms;
