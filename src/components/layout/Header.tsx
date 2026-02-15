import { Button } from "@/components/ui/button";
import { getLatestAnalysisId } from "@/hooks/use-latest-analysis";
import { ArrowRight, FileText, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [latestId] = useState(getLatestAnalysisId);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">
              Review<span className="text-gradient">CV</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Testimonials
            </a>
            <a href="/#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              About
            </a>
            <a href="/docs" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Docs
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {latestId ? (
              <Button variant="hero" size="sm" className="group" asChild>
                <a href={`/results/${latestId}`}>
                  View CV Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            ) : (
              <Button
                variant="hero"
                size="sm"
                className="group"
                onClick={() => document.getElementById("cv-upload")?.click()}
              >
                Get Your Free CV Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-down">
            <nav className="flex flex-col gap-4">
              <a href="/#services" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Services
              </a>
              <a href="/#testimonials" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Testimonials
              </a>
              <a href="/#about" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                About
              </a>
              <a href="/docs" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Docs
              </a>
              <div className="pt-4 border-t border-border/50">
                {latestId ? (
                  <Button variant="hero" size="sm" className="w-full group" asChild>
                    <a href={`/results/${latestId}`}>
                      View CV Analysis
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full group"
                    onClick={() => document.getElementById("cv-upload")?.click()}
                  >
                    Get Your Free CV Review
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
