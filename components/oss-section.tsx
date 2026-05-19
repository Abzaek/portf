"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

export type Language = "Go" | "Python";

export interface OSSRepo {
  id: string; // e.g. "0xOS_01"
  name: string;
  org: string;
  url: string;
  language: Language;
  stars: string;
  forks: string;
  note: string;
}

/** GitHub-style language colors for the small filled dot beside each repo. */
const LANGUAGE_COLORS: Record<Language, string> = {
  Go: "#00ADD8",
  Python: "#3572A5",
};

const PROFILE_URL = "https://github.com/Abzaek";

interface OSSSectionProps {
  repos: OSSRepo[];
  /** Pre-computed total stars string for the footer rail, e.g. "108k+". */
  totalStars: string;
}

export function OSSSection({ repos, totalStars }: OSSSectionProps) {
  return (
    <section
      id="oss"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container max-w-container-max relative z-10 px-6">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {repos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* Footer rail with link to GitHub profile */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-noir-line pt-6 flex-wrap">
          <span className="font-mono text-[12px] tracking-[0.04em] text-noir-text-faint">
            [ {repos.length} REPOS // {totalStars} COMBINED_STARS // ALL CONTRIBUTIONS VERIFIABLE ON GITHUB ]
          </span>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-[12px] font-bold tracking-[0.1em] uppercase text-noir-accent hover:text-noir-accent-bright transition-colors"
          >
            View Full Profile
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="border-l-2 border-noir-accent pl-6 max-w-3xl mb-12"
    >
      <div className="font-mono text-[14px] text-noir-accent mb-3">
        [ SECTION_03 // OPEN_SOURCE ]
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-noir-text uppercase leading-[1.1] mb-3">
        Open Source
      </h2>
      <p className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-noir-accent uppercase mb-6">
        Contributor To Projects That Run Production Systems
      </p>
      <p className="text-noir-text-soft leading-relaxed max-w-2xl">
        Upstream contributions to the libraries and tools I build with. These
        are the engines behind container builds, infrastructure automation,
        event-driven systems, and SSH tooling. Click any card to inspect.
      </p>
    </motion.header>
  );
}

function RepoCard({ repo, index }: { repo: OSSRepo; index: number }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut",
      }}
      className="group relative flex flex-col bg-noir-surface-1 border border-noir-line-strong p-5 md:p-6
                 transition-colors duration-300 hover:border-noir-accent-bright
                 focus:outline-none focus-visible:border-noir-accent-bright"
      aria-label={`${repo.org}/${repo.name} on GitHub`}
    >
      <BlueprintCorners />

      {/* Top row: MODULE_ID + open-link arrow */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-noir-text-faint">
          MODULE_ID: {repo.id}
        </span>
        <ArrowUpRight className="w-4 h-4 text-noir-text-faint group-hover:text-noir-accent-bright group-hover:-translate-y-[1px] group-hover:translate-x-[1px] transition-[transform,color] duration-200" />
      </div>

      {/* Repo name */}
      <div className="mb-1">
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-noir-accent group-hover:text-noir-accent-bright transition-colors leading-tight">
          {repo.name}
        </h3>
        <p className="font-mono text-[11px] tracking-[0.04em] text-noir-text-faint mt-0.5">
          {repo.org}/{repo.name}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-noir-text-soft leading-relaxed mt-3 mb-5 min-h-[3em]">
        {repo.note}
      </p>

      {/* Stats row */}
      <div className="mt-auto pt-4 border-t border-noir-line flex items-center gap-4 font-mono text-[12px] text-noir-text-soft">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] }}
            aria-hidden
          />
          {repo.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="w-3.5 h-3.5" strokeWidth={2} />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" strokeWidth={2} />
          {repo.forks}
        </span>
      </div>
    </motion.a>
  );
}

function BlueprintCorners(): ReactNode {
  return (
    <>
      <span aria-hidden className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
    </>
  );
}
