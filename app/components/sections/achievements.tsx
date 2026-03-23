"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Trophy, Zap } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  {
    icon: Code,
    title: "Manufacturing Admin System",
    description: "Designed and developed a Manufacturing Admin platform, managing both frontend and backend features, while ensuring high-quality standards and maintainable code.",
    year: "2025",
    category: "Milestone"
  },
  {
    icon: Trophy,
    title: "Lead QA Engineer",
    description: "Sole QA in the company, responsible for testing multiple web and admin systems to ensure reliable releases and a bug-free experience for users.",
    year: "2025",
    category: "Milestone"
  },
  {
    icon: Zap,
    title: "QA Process Implementation",
    description: "Created and implemented QA processes, test plans, and checklists across systems, improving overall release quality and reducing defects.",
    year: "2025",
    category: "Milestone"
  },
  {
    icon: Code,
    title: "Mentoring QA Interns",
    description: "Guided QA interns in manual and automated testing, bug reporting, and overall quality assurance best practices.",
    year: "2025",
    category: "Milestone"
  },
  {
    icon: Code,
    title: "Automation & Manual Testing",
    description: "Performed comprehensive testing using Cypress, Selenium, and manual testing strategies, covering frontend, backend, and database integrity.",
    year: "2025",
    category: "Milestone"
  }
];

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const isDesktop = window.innerWidth >= 1024;

        // Header entrance
        if (isDesktop) {
            gsap.from(".achievements-header", {
                y: 50,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                }
            });
        }

        // Desktop: subtle reveal per card
        if (isDesktop) {
            // Animate each card on scroll
            achievements.forEach((_, i) => {
                gsap.from(`.achievement-card-${i}`, {
                    scrollTrigger: {
                        trigger: `.achievement-card-${i}`,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1,
                    },
                    x: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // Mobile: Simple fade animations
        if (!isDesktop) {
            gsap.from(".achievement-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className="achievements-section relative bg-black overflow-hidden py-16 sm:py-20 lg:py-28">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
                {/* Header */}
                <div className="achievements-header mb-10 md:mb-14 lg:mb-16">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 mb-3 block">
                    Achievements
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter italic mb-4">
                    Milestones
                </h2>
                <p className="text-white/40 text-sm md:text-lg italic leading-relaxed max-w-2xl">
                        Highlights of QA achievements, leadership, and system development across multiple projects and platforms.
                </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <article 
                                key={index} 
                                className={`achievement-card achievement-card-${index} group relative p-5 md:p-6 lg:p-7 rounded-sm border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/25 transition-colors duration-300`}
                            >
                                {/* Year and Category */}
                                <div className="flex items-center justify-between gap-4 text-white/30 font-mono text-[10px] uppercase tracking-widest mb-5">
                                    <span>{achievement.year}</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-white/40">{achievement.category}</span>
                                </div>

                                {/* Icon */}
                                <div className="mb-5">
                                    <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-colors">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight mb-3 group-hover:text-white/90 transition-colors">
                                    {achievement.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/55 text-sm md:text-base leading-relaxed italic">
                                    {achievement.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
