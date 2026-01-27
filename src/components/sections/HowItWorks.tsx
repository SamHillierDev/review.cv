import { Upload, Scan, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your CV",
    description: "Simply drag and drop your resume in PDF or DOCX format. We support all common file types.",
  },
  {
    icon: Scan,
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI scans your CV for keywords, formatting, impact, and ATS compatibility.",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Get Feedback",
    description: "Receive detailed insights with specific recommendations to improve each section of your CV.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Land Interviews",
    description: "Apply the changes and watch your interview callback rate increase dramatically.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Four Simple Steps to{" "}
            <span className="text-gradient">Success</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your CV reviewed and improved is quick and easy. 
            Follow these simple steps to transform your resume.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
                      {step.step.slice(-1)}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
