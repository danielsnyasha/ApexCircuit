import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Vision from "@/components/Vision";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import Team from "@/components/Team";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <TechStack />
      <section id="services">
        <Services />
      </section>
      <section id="process">
        <Process />
      </section>
      <section id="vision">
        <Vision />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <Pricing />
      <Testimonials />
      <Insights />
      <section id="team">
        <Team />
      </section>
      <section id="stats">
        <Stats />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      <ChatWidget />
    </main>
  );
}
