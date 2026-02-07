import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Adam",
    role: "Data Scientist",
    content: "Really enjoyed working with Sam, he was really friendly and easy to talk to. Gave clear, actionable and effective suggestions to improve my CV. Explained as to why these improvements were necessary and how they can benefit me. Would highly recommend to others.",
    rating: 5,
  },
  {
    name: "Bashir",
    role: "Software Engineer",
    content: "I would recommend Sam's service as he was very quick with replies and set a good focus on my needs. He gave valid critique on my work and gave constructive criticism which enabled me to have a better more robust outcome.",
    rating: 5,
  },
  {
    name: "Tong",
    role: "Business Analyst",
    content: "Sam was incredibly helpful, offering clear advice on improving my CV and LinkedIn profile. I really appreciate his expertise and thoughtful guidance.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Loved by{" "}
            <span className="text-gradient">Job Seekers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals who have transformed their careers
            with ReviewCV.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">
                  — {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
