import Header from "@/components/layout/Header";
import ScrollReveal from "@/components/ScrollReveal";
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
        <ScrollReveal><HowItWorks /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><FAQ /></ScrollReveal>
        <ScrollReveal><MeetTheTeam /></ScrollReveal>
        <ScrollReveal><CTA /></ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
