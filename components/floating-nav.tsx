"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { useMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Open Source", href: "#oss" },
  { name: "Stack", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// Stellar Blueprint label-caps style: Space Grotesk, 12px, weight 700, tracking 0.1em, uppercase.
const LABEL_CAPS = "font-display text-[12px] font-bold tracking-[0.1em] uppercase";

/** "Services" → "[ 01_SERVICES ]" — Stellar Blueprint nav-link semantics.
 * Multi-word names join with underscores: "Open Source" → "[ 03_OPEN_SOURCE ]". */
function blueprintLabel(index: number, name: string) {
  const num = String(index + 1).padStart(2, "0");
  return `[ ${num}_${name.toUpperCase().replace(/\s+/g, "_")} ]`;
}

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const isMobile = useMobile();

  // Scroll-spy: highlight nav link for the section currently in view
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => Boolean(s));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (isMobile) setIsOpen(false);

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      const navHeight = 64;
      window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 bg-noir-bg/80 backdrop-blur-md border-b border-noir-line"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-container-max mx-auto px-6 h-16 flex justify-between items-center gap-6">
          {/* Logo — Stellar Blueprint headline-md style: Space Grotesk, bold, tracking-tighter, in primary teal */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="Abdulazez Zeinu, Home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display text-2xl font-bold tracking-[-0.02em] text-noir-accent hidden sm:inline">
              ABZAEK.DEV
            </span>
          </Link>

          {/* Desktop nav — bracket-syntax label-caps with section numbers */}
          {!isMobile && (
            <div className="flex items-center gap-4 lg:gap-5">
              {NAV_ITEMS.map((item, index) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${LABEL_CAPS} pb-1 border-b-2 whitespace-nowrap shrink-0 transition-[color,border-color,transform] duration-150 active:scale-95 ${
                      isActive
                        ? "text-noir-accent border-noir-accent"
                        : "text-noir-text-soft border-transparent hover:text-noir-accent-bright"
                    }`}
                  >
                    {blueprintLabel(index, item.name)}
                  </a>
                );
              })}
            </div>
          )}

          {/* Right side: theme toggle + Hire Me CTA (desktop) or menu toggle (mobile) */}
          {!isMobile ? (
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <a
                href="#network"
                onClick={(e) => handleNavClick(e, "#network")}
                className={`${LABEL_CAPS} bg-noir-accent text-white px-5 py-2 ml-1 transition-[background,color,transform] duration-150 hover:bg-noir-accent-bright hover:text-noir-accent-deep active:scale-95`}
              >
                Hire Me
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <button
                type="button"
                className="text-noir-text-soft hover:text-noir-accent p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-noir-bg/95 backdrop-blur-md ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center h-full pt-16 gap-3">
            {NAV_ITEMS.map((item, index) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-display block px-8 py-3 text-lg font-bold tracking-[0.1em] uppercase transition-colors ${
                      isActive ? "text-noir-accent" : "text-noir-text-soft hover:text-noir-accent-bright"
                    }`}
                  >
                    {blueprintLabel(index, item.name)}
                  </a>
                </motion.div>
              );
            })}
            <motion.a
              href="#network"
              onClick={(e) => handleNavClick(e, "#network")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}
              transition={{ duration: 0.25, delay: NAV_ITEMS.length * 0.04 }}
              className={`${LABEL_CAPS} mt-6 bg-noir-accent text-white px-8 py-3`}
            >
              Hire Me
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}

/**
 * Light/dark toggle. Hydration-safe: renders an inert placeholder until
 * mounted so the server render and the first client render match.
 */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const label = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(next)}
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-9 h-9
                 text-noir-text-soft border border-noir-line
                 transition-colors duration-200
                 hover:border-noir-accent hover:text-noir-accent
                 focus:outline-none focus-visible:border-noir-accent"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
