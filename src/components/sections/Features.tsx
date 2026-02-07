import { Brain, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyse your CV against millions of successful CVs to identify strengths and improvements.",
  },
  {
    icon: Target,
    title: "ATS optimisation",
    description: "Ensure your CV passes Applicant Tracking Systems with our keyword optimisation and formatting recommendations.",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Connect with industry professionals and certified career coaches for personalised one-on-one guidance.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Receive comprehensive analysis within seconds, complete with actionable improvement suggestions.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and never shared. We prioritize your privacy and data security above all.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your CV improvements over time and see how your score evolves with each update.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Stand Out</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive suite of tools and services helps you create a CV that
            gets noticed by recruiters and passes ATS systems.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
