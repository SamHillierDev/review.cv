import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute inset-0 gradient-primary rounded-3xl opacity-10 blur-3xl" />

          <div className="relative gradient-primary rounded-3xl p-8 md:p-12 lg:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  Start for Free Today
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
                Ready to Transform Your Career?
              </h2>

              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Join over 50,000 professionals who have already improved their CVs
                and landed their dream jobs with ReviewCV.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all group"
                >
                  Get Your Free CV Review
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="xl"
                  className="text-primary-foreground border-2 border-white/30 hover:bg-white/10"
                >
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
