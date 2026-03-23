"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/app/data/projects";
import { releaseDocumentScroll } from "@/app/utils/release-document-scroll";
import {
  prefersHardNavigationToProjectDetail,
  projectDetailPath,
} from "@/app/utils/project-detail-navigation";
import {
  logPrefersHardNavContext,
  logProjectsScroll,
} from "@/app/utils/projects-scroll-debug";

export default function ProjectsPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const navTimeoutRef = useRef<number | null>(null);

  const navigateToProject = useCallback((slug: string) => {
    if (isNavigating) return;

    const hard = prefersHardNavigationToProjectDetail();
    logProjectsScroll("/projects card click", {
      slug,
      hardNavigation: hard,
      targetPath: projectDetailPath(slug),
      ...logPrefersHardNavContext(),
    });

    if (hard) {
      logProjectsScroll("/projects -> location.assign (hard nav)", {
        slug,
        path: projectDetailPath(slug),
      });
      window.location.assign(projectDetailPath(slug));
      return;
    }

    setIsNavigating(true);
    setTransitionKey((value) => value + 1);

    logProjectsScroll("/projects scroll lock ON (isNavigating)", {});

    navTimeoutRef.current = window.setTimeout(() => {
      logProjectsScroll("/projects -> router.push (soft nav)", {
        slug,
        path: projectDetailPath(slug),
      });
      window.sessionStorage.setItem("route-transition-lock", "1");
      window.sessionStorage.setItem("project-transition-reveal", "1");
      router.push(projectDetailPath(slug));
    }, 620);
  }, [isNavigating, router]);

  useEffect(() => {
    return () => {
      if (navTimeoutRef.current !== null) {
        window.clearTimeout(navTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isNavigating) return;

    document.documentElement.classList.add("route-transition-lock");
    document.body.classList.add("route-transition-lock");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      logProjectsScroll("/projects scroll lock cleanup (releaseDocumentScroll)", {
        wasNavigating: true,
      });
      releaseDocumentScroll();
    };
  }, [isNavigating]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {isNavigating && (
        <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
          <motion.div
            key={transitionKey}
            className="absolute inset-0"
            initial={{ y: "100%" }}
            animate={{
              y: ["100%", "0%", "0%"],
              backgroundColor: ["#0a0a0a", "#0a0a0a", "#0a0a0a"],
            }}
            transition={{
              duration: 1.25,
              times: [0, 0.24, 1],
              ease: "easeInOut",
            }}
          />
        </div>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 lg:px-14 xl:px-0 py-14 sm:py-16 md:py-20 lg:py-24">
        <header className="mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-white/40">
            Portfolio
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95]">
            All Projects
          </h1>
          <p className="mt-4 text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed">
            Browse the full project list and open each one for complete details.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => navigateToProject(project.slug)}
              className="group rounded-sm border border-white/10 bg-white/5 hover:border-white/30 transition-colors overflow-hidden text-left cursor-pointer"
            >
              <div className="relative w-full aspect-16/10 bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-95 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                  <span>{project.year}</span>
                  {project.featured && <span className="text-white/55">Featured</span>}
                </div>
                <h2 className="text-white font-black uppercase tracking-tight text-lg sm:text-xl leading-tight">
                  {project.title}
                </h2>
                <p className="mt-3 text-white/60 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                  View project details
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
