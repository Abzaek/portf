"use client";

import { motion } from "framer-motion";

const STAT_TOKENS = [
  { num: "4 yrs", label: "PRO_EXPERIENCE" },
  { num: "7", label: "SHIPPED_SYSTEMS" },
  { num: "9", label: "OSS_CONTRIBUTIONS" },
  { num: "9.6M", label: "RECORDS_INGESTED" },
  { num: "40%", label: "INFRA_COST_DOWN" },
];

export function CreativeHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-20 px-6"
    >
      <div className="container max-w-container-max relative z-10 mx-auto">
        <div className="max-w-3xl border-l-2 border-noir-accent pl-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-mono text-[14px] text-noir-accent mb-5"
          >
            [ SECTION_00 // INTRO ]
          </motion.div>

          {/* Stat-stack headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-noir-text mb-4 uppercase"
          >
            <span className="text-noir-accent">4 Years In.</span>{" "}
            7 Products Shipped.
            <br className="hidden md:block" />{" "}
            <span className="text-noir-accent">9 OSS Contributions.</span>{" "}
            3 Languages.
          </motion.h1>

          {/* Outcome-focused body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-noir-text-soft leading-relaxed max-w-2xl mb-10"
          >
            I ship things that move numbers. A Go pipeline that cut 40 minutes
            to 4. Infrastructure costs down 40%. Production bugs down 30%. User
            engagement up 25%. Four years, seven shipped systems, several of
            them mine end to end.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4
                         bg-noir-cta text-noir-cta-fg
                         font-display font-bold uppercase tracking-[0.1em] text-[12px]
                         transition-[background,color,transform] duration-200
                         hover:bg-noir-accent hover:text-white active:scale-95"
            >
              View_Archive
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4
                         border border-noir-outline text-noir-text
                         font-display font-bold uppercase tracking-[0.1em] text-[12px]
                         transition-colors duration-200
                         hover:border-noir-accent hover:text-noir-accent"
            >
              Init_Contact
            </a>
          </motion.div>

          {/* Stat-token row, replaces identity strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-noir-line border border-noir-line max-w-3xl"
          >
            {STAT_TOKENS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 px-4 py-3 bg-noir-surface-1"
              >
                <span className="font-display text-2xl font-bold tracking-[-0.02em] text-noir-accent leading-none">
                  {s.num}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-noir-text-faint">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Identity strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-3 text-noir-text-faint"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Abdulazez Zeinu
            </span>
            <span className="h-px w-6 bg-noir-line-strong" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Addis Ababa
            </span>
            <span className="h-px w-6 bg-noir-line-strong" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Remote_Native
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="noir-label">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-noir-accent/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
