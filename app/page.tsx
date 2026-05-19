import { FloatingNav } from "@/components/floating-nav"
import { CreativeHero } from "@/components/creative-hero"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { OSSSectionLive } from "@/components/oss-section-live"
import { SkillsSection } from "@/components/skills-section"
import { ServicesSection } from "@/components/services-section"
import { ExperienceSection } from "@/components/experience-section"
import { NetworkSection } from "@/components/network-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-noir-bg text-noir-text overflow-x-hidden">
      <FloatingNav />

      <CreativeHero />

      <AboutSection />

      <ProjectsSection />

      <OSSSectionLive />

      <SkillsSection />

      <ServicesSection />

      <ExperienceSection />

      <NetworkSection />

      <ContactSection />

      <Footer />
    </main>
  )
}
