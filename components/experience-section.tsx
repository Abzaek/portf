"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <motion.div
        className="container max-w-container-max relative z-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-2xl">
          <SectionHeading title="Experience" subtitle="Career Journey" />
          <p className="mt-4 text-noir-text-mute leading-relaxed">
            Recent roles, with the architectural calls and measurable
            outcomes attached.
          </p>
        </div>

        <div className="mt-16">
          <Timeline />
        </div>
      </motion.div>
    </section>
  );
}
