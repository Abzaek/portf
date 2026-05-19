"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-32 bg-noir-surface-2 bg-grid relative overflow-hidden"
    >
      <motion.div
        className="container max-w-container-max relative z-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-2xl">
          <SectionHeading title="Get In Touch" subtitle="Let's Connect" />
          <p className="mt-4 text-noir-text-mute leading-relaxed">
            Currently open to senior full-stack and platform engineering
            roles. Happy to talk about a project, a team, or anything in
            between.
          </p>
        </div>

        <div className="mt-16 max-w-2xl">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
}
