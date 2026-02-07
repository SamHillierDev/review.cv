import { Globe } from "lucide-react";

const MeetTheTeam = () => {
  return (
    <section id="about" className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Meet the{" "}
            <span className="text-gradient">Team</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left: Photo, Name, Title, Socials */}
            <div className="flex flex-col items-center text-center shrink-0">
              <img
                src="/sam-hillier.jpg"
                alt="Sam Hillier"
                className="w-28 h-28 rounded-full border-2 border-primary/30 object-cover mb-4"
              />

              <h3 className="text-2xl font-heading font-bold text-foreground">
                Sam Hillier
              </h3>
              <p className="text-primary font-medium mt-1 mb-4">
                Software Engineer
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/samhillier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/samhillierdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a
                  href="https://samhillier.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Personal website"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Description */}
            <div className="md:border-l md:border-border md:pl-12">
              <p className="text-muted-foreground leading-relaxed text-center md:text-left">
                Hi, I'm Sam 👋 I'm a software engineer with a track record of applying technical expertise and collaboration to enhance system health, scalability, and long-term organisational excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed text-center md:text-left mt-4">
              I built ReviewCV because I kept seeing talented people get overlooked, not for lack of skill, but because their CVs didn't reflect it. After reviewing hundreds of CVs for friends and colleagues, I wanted to make that kind of guidance available to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
