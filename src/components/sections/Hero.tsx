import { Button } from "@/components/ui/button";
import { getLatestAnalysisId } from "@/hooks/use-latest-analysis";
import CVUploadArea from "@/components/upload/CVUploadArea";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [latestId] = useState(getLatestAnalysisId);
  const benefits = [
    "AI-powered analysis in seconds",
    "Expert feedback from recruiters",
    "Increase interview callbacks by 3x",
  ];

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                AI-Powered CV Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
              Land Your Dream Job with a{" "}
              <span className="text-gradient">Perfect CV</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Get instant AI analysis of your CV, expert feedback from industry
              professionals, and personalised recommendations to stand out.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {latestId ? (
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={`/results/${latestId}`}>
                    View CV Analysis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="xl"
                  className="group"
                  onClick={() => document.getElementById("cv-upload")?.click()}
                >
                  Get Your Free CV Review
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button variant="heroOutline" size="xl">
                Book a Consultation
              </Button>
            </div>

            {/* <p className="text-sm text-muted-foreground mt-6">
              Trusted by <span className="font-semibold text-foreground">50,000+</span> job seekers worldwide
            </p> */}
          </div>

          {/* Right Content - Upload Area */}
          <div className="animate-slide-up">
            <CVUploadArea />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
