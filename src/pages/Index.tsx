import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import MeetTheTeam from "@/components/sections/MeetTheTeam";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <MeetTheTeam />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
