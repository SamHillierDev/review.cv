import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What file formats do you support?",
    answer:
      "We currently support PDF and DOCX files up to 10MB. These are the most common formats used by job seekers and accepted by applicant tracking systems.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "Our AI scans your CV for key factors that recruiters and ATS systems look for, including keyword optimization, formatting consistency, impact metrics, and section structure. You get a detailed score breakdown with actionable suggestions.",
  },
  {
    question: "Is my CV data kept private?",
    answer:
      "Absolutely. Your CV is processed securely and never shared with third parties. We delete uploaded files after analysis is complete. Your privacy is our top priority.",
  },
  {
    question: "How accurate is the ATS compatibility check?",
    answer:
      "Our ATS check is trained on the parsing logic of major applicant tracking systems used by Fortune 500 companies. It identifies formatting issues, missing keywords, and structural problems that could cause your CV to be filtered out.",
  },
  {
    question: "Can I review my CV multiple times?",
    answer:
      "Yes! You can upload revised versions of your CV as many times as you like to track your improvements and ensure each change moves your score in the right direction.",
  },
  {
    question: "How long does the analysis take?",
    answer:
      "Most CV analyses complete in under 30 seconds. You'll receive a full score breakdown, section-by-section feedback, and prioritized recommendations as soon as the analysis finishes.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ReviewCV and how it can help
            you land your dream job.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-primary font-sans">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
