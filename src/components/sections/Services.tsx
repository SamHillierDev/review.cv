import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const services = [
  {
    name: "CV Review",
    description: "Perfect for quick improvements",
    price: "Free",
    period: "",
    popular: false,
    features: [
      "AI-powered CV analysis",
      "ATS compatibility check",
      "Basic improvement suggestions",
      "Overall score breakdown",
      "Export report as PDF",
    ],
    cta: "Get Started Free",
    variant: "heroOutline" as const,
  },
  {
    name: "Pro Review",
    description: "Most popular for job seekers",
    price: "$29",
    period: "one-time",
    popular: true,
    features: [
      "Everything in CV Review",
      "In-depth section analysis",
      "Industry-specific keywords",
      "Competitor benchmarking",
      "Unlimited revisions for 30 days",
      "Priority support",
    ],
    cta: "Get Pro Review",
    variant: "hero" as const,
  },
  {
    name: "Expert Consultation",
    description: "Personalized career coaching",
    price: "$99",
    period: "per session",
    popular: false,
    features: [
      "Everything in Pro Review",
      "1-hour video call with expert",
      "Personalized career strategy",
      "LinkedIn profile review",
      "Interview preparation tips",
      "Follow-up support for 7 days",
    ],
    cta: "Book Consultation",
    variant: "heroOutline" as const,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Choose Your{" "}
            <span className="text-gradient">Success Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From free AI analysis to expert consultations, we have the right 
            solution for every stage of your career journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                service.popular
                  ? "bg-card border-2 border-primary shadow-lg scale-105"
                  : "bg-card border border-border hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {service.price}
                  </span>
                  {service.period && (
                    <span className="text-muted-foreground text-sm">
                      /{service.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={service.variant}
                size="lg"
                className="w-full group"
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
