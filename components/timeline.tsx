"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Reisearch",
    companyUrl: "https://reisearch.com",
    period: "Nov 2024 – Present · Remote · Addis Ababa, Ethiopia",
    contributions: `
* Working on a small engineering team building the platform: **34 frontend modules**, **16 Go microservices**, **23+ DynamoDB tables** in production.
* Rebuilt a Go-based comps orchestration system into a high-throughput streaming pipeline with DynamoDB and SQS worker pools, cutting processing time from **40 minutes to 4 minutes**.
* Built a **9.6M-record market data pipeline** that ingests raw government TSV files into queryable DynamoDB tables at every geographic level (ZIP, city, county, metro, state, national).
* Shipped an **AI Renovation Copilot** using OpenAI and Gemini that generates photorealistic renovation previews and itemized cost estimates in under 30 seconds.
* Co-led an AWS architecture redesign that cut **infrastructure costs by 40%**. Introduced strict typing, hypothesis-based tests, and pre-commit gates that dropped **production bugs by 30%**.
* Authored architecture and orchestration docs, introduced dependency-injection patterns, and mentored other engineers on Clean Architecture practices.
    `,
  },
  {
    title: "Web Developer",
    company: "Nucleus Institute",
    companyUrl: "#",
    period: "Oct 2024 · Remote · Canada",
    contributions: `
* Improved **accessibility and mobile usability** by refining responsive layouts and ensuring components met accessibility guidelines.
    `,
  },
  {
    title: "Software Engineer",
    company: "Eskalate",
    companyUrl: "#",
    period: "Sep 2023 – Jul 2024 · Addis Ababa, Ethiopia",
    contributions: `
* Led a small team to build a **blog starter** with Go (Gin), Redis caching, and MongoDB following Clean Architecture principles.
* Integrated **AI automation** to generate and review blog content, boosting user engagement.
* Drove **performance optimizations** through concurrency tuning and rigorous code reviews to maintain quality standards.
    `,
  },
  {
    title: "Fullstack Engineer",
    company: "NEO AI Technologies",
    companyUrl: "#",
    period: "Nov 2022 – Sep 2023 · Addis Ababa, Ethiopia",
    contributions: `
* Built and maintained **hospital and inventory management systems** with React and TypeScript, delivering scalable frontends.
* Integrated **Firebase / Firestore** for real-time data storage and synchronization.
    `,
  },
];

export function Timeline() {
  return (
    <div className="relative pl-8 md:pl-10">
      <div
        aria-hidden
        className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-noir-line"
      />

      <div className="space-y-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-40px" }}
            className="relative group"
          >
            <span
              aria-hidden
              className="absolute -left-[28px] md:-left-[34px] top-2 w-2.5 h-2.5 rounded-full
                         bg-noir-bg border border-noir-accent
                         group-hover:bg-noir-accent group-hover:shadow-[0_0_0_3px_rgba(0,229,255,0.18)]
                         transition-[background,box-shadow] duration-200"
            />

            <article className="rounded-lg border border-noir-line bg-noir-surface-1 p-6 transition-colors duration-200 group-hover:border-noir-accent/30">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-noir-text leading-tight">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="text-noir-text-soft">{experience.company}</span>
                    {experience.companyUrl !== "#" && (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-noir-text-faint hover:text-noir-accent transition-colors"
                        aria-label={`Visit ${experience.company}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-noir-text-faint">
                  {experience.period}
                </span>
              </header>

              <div className="mt-4 text-noir-text-mute text-sm leading-relaxed
                              prose prose-invert prose-sm max-w-none
                              prose-ul:pl-4 prose-ul:my-2 prose-li:my-0.5
                              prose-li:marker:text-noir-accent
                              prose-strong:text-noir-text prose-strong:font-semibold">
                <ReactMarkdown>{experience.contributions}</ReactMarkdown>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
