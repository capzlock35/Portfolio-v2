"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Map of items that use PNG format instead of SVG
const pngItems = new Set(["Pycharm"]);

const techStacks = [
    {
        label: "Frontend",
        items: ["JavaScript", "HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
        iconDir: "/images/frontend",
    },
    {
        label: "Backend",
        items: ["Node.js", "Python", "MongoDB", "MySQL"],
        iconDir: "/images/backend",
    },
    {
        label: "Testing",
        items: ["Playwright", "Pytest", "Postman", "Selenium","JMeter","K6","Artillery"],
        iconDir: "/images/database",
    },
    {
        label: "Tools",
        items: ["Github", "Git", "VsCode", "Jira", "Pycharm", "TestRail", "Bugzilla", "Vercel", "Redmine"],
        iconDir: "/images/tools",
    },
];

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);
    const [imageFormats, setImageFormats] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const root = sectionRef.current;
            if (!root) return;

            const leftPanel = root.querySelector<HTMLElement>(".stats-panel-left");
            const rightPanel = root.querySelector<HTMLElement>(".stats-panel-right");
            const profileLeftPanel = root.querySelector<HTMLElement>(".profile-panel-left");
            const profileRightPanel = root.querySelector<HTMLElement>(".profile-panel-right");

            const statsItems = gsap.utils.toArray<HTMLElement>(".stats-anim", root);
            const techItems = gsap.utils.toArray<HTMLElement>(".tech-anim", root);
            const profileItems = gsap.utils.toArray<HTMLElement>(".profile-anim", root);

            const panels: HTMLElement[] = [leftPanel, rightPanel, profileLeftPanel, profileRightPanel].filter((el): el is HTMLElement => !!el);
            const allItems: HTMLElement[] = [...statsItems, ...techItems, ...profileItems];

            // Initial state: hidden + shifted down (prevents "static hidden" caused by competing triggers).
            gsap.set(panels, { autoAlpha: 0, y: 40, willChange: "transform,opacity" });
            gsap.set(allItems, { autoAlpha: 0, y: 26, willChange: "transform,opacity" });

            // Panels reveal once; the content inside reveals one-by-one as you scroll.
            const tlPanelsIn = gsap.timeline({ paused: true });
            tlPanelsIn.to(panels, {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                stagger: 0.1,
            });

            ScrollTrigger.create({
                trigger: root,
                start: "top 78%",
                end: "bottom 22%",
                onEnter: () => {
                    tlPanelsIn.play(0);
                },
                onEnterBack: () => {
                    tlPanelsIn.play(0);
                },
                onRefresh: (self) => {
                    // If the page loads while already inside/past the section,
                    // ensure content isn't stuck in the initial hidden state.
                    if (self.progress > 0) {
                        tlPanelsIn.progress(1);
                    } else {
                        tlPanelsIn.pause(0).progress(0);
                    }
                },
            });

            const revealOneByOne = (el: HTMLElement, yFrom: number) => {
                // Scrubbed animation = smooth show/hide while scrolling (no "static jump").
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: yFrom },
                    {
                        autoAlpha: 1,
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            end: "top 70%",
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            };

            // About-side copy reveals line-by-line.
            statsItems.forEach((el) => revealOneByOne(el, 22));

            // Tech icons reveal one-by-one; fall out when scrolling up past them.
            techItems.forEach((el) => revealOneByOne(el, 26));

            // Profile items reveal one-by-one.
            profileItems.forEach((el) => revealOneByOne(el, 30));
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="stats" className="relative bg-black py-16 sm:py-20 lg:py-28 overflow-hidden">
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44 max-w-[1920px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-10 md:gap-14 lg:gap-16 items-start">
                    {/* Left — About */}
                    <div className="stats-panel-left w-full lg:w-5/12 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="stats-anim text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/35 font-mono">
                                About
                            </span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <h2 className="stats-anim text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.95] text-white tracking-tight">
                            About
                        </h2>
                        <p className="stats-anim text-base sm:text-lg text-white/50 leading-relaxed max-w-lg">
                            Software QA Tester and Front-End Web Developer with a BS in Information Technology, experience in building reliable, user-friendly web 
                            applications. Skilled in React, Tailwind CSS, and testing frameworks such as Playwright, 
                            Pytest, and Selenium.
                        </p>
                        <p className="stats-anim text-sm sm:text-base text-white/35 leading-relaxed max-w-lg">
                            Experienced in ensuring software quality across enterprise and web projects, performing functional, 
                            automated, and regression testing, while also developing interactive front-end interfaces.  
                        </p>
                        <p className="stats-anim text-sm sm:text-base text-white/35 leading-relaxed max-w-lg">
                            Passionate about delivering high-quality, maintainable code, improving user experience, and collaborating 
                            with cross-functional teams to create robust and scalable applications.
                        </p>
                    </div>

                    {/* Right — Tech Stacks */}
                    <div className="stats-panel-right w-full lg:w-7/12 lg:self-center">
                        <div className="grid gap-8 sm:gap-10 md:gap-12">
                            {techStacks.map((group) => (
                                <div key={group.label} className="grid grid-cols-12 items-start sm:items-center gap-5 sm:gap-6 md:gap-8">
                                    <div className="col-span-12 sm:col-span-4">
                                        <div className="stats-anim text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white/25 leading-none">
                                            {group.label}
                                        </div>
                                    </div>

                                    <div className="col-span-12 sm:col-span-8">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                                            {group.items.map((item) => {
                                                const imageKey = `${group.label}-${item}`;
                                                const imageFormat = imageFormats[imageKey] || (pngItems.has(item) ? "png" : "svg");
                                                const imageSrc = `${group.iconDir}/${item}.${imageFormat}`;

                                                return (
                                                    <div
                                                        key={item}
                                                        className="tech-anim flex items-center gap-2 sm:gap-3 pr-2 sm:pr-3 min-w-0"
                                                        title={item}
                                                    >
                                                        <Image
                                                            src={imageSrc}
                                                            alt={item}
                                                            width={40}
                                                            height={40}
                                                            sizes="(max-width: 640px) 28px, (max-width: 1024px) 32px, 40px"
                                                            className="opacity-100 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0"
                                                            onError={() => {
                                                                if (imageFormat === "svg") {
                                                                    setImageFormats((prev) => ({
                                                                        ...prev,
                                                                        [imageKey]: "png",
                                                                    }));
                                                                }
                                                            }}
                                                        />
                                                        <span className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-white/60 whitespace-nowrap">
                                                            {item}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Profile Section - Image and Name */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-10 md:gap-14 lg:gap-16 items-start mt-20 sm:mt-24 lg:mt-28">
                    {/* Left — Profile Image */}
<div className="profile-panel-left w-full lg:w-5/12">
    <div className="relative w-full max-w-sm mx-auto">
        
        {/* Polaroid Frame */}
        <div className="bg-white p-3 pb-2 rounded-sm shadow-2xl rotate-[-2deg] hover:rotate-0 transition duration-300">
            
            <Image
                src="/images/awma.jpg"
                alt="Wahid Abdul"
                width={500}
                height={600}
                className="profile-anim w-full h-auto object-cover"
                quality={90}
            />

            {/* Caption */}
            <p className="mt-2 text-center text-xs font-mono text-gray-700 tracking-widest">
                AWMA.dev
            </p>
                        <p className="mt-2 text-center text-xs font-mono text-gray-700 tracking-widest">
                SOFTWARE QA ENGINEER
            </p>

        </div>
    </div>
</div>

                    {/* Right — Profile Name */}
                    <div className="profile-panel-right w-full lg:w-7/12 lg:self-center flex items-center">
                    <div className="space-y-6 w-full">
                        
                        <h2 className="profile-anim text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.95] text-white/40 tracking-tight">
                        
                        {/* TOP SECTION */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-32">
                            
                            {/* NAME */}
                            <div className="flex flex-col">
                            <div>Wahid</div>

                            <div className="flex items-baseline gap-2 mt-2">
                                <div>Abdul</div>
                                <div className="text-white/20 font-mono text-[10px] tracking-[0.3em]">
                                -AWMA
                                </div>
                            </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="text-xs sm:text-sm font-normal text-white/40 leading-relaxed uppercase tracking-wider max-w-xs lg:max-w-sm">
                            <p>Ensuring Quality, Crafting Interfaces</p>
                            <p>That Users Can Trust.</p>

                            <p className="mt-3">Open For Part-Time / Full-Time</p>
                            <p>Based In San Juan City, Ph</p>
                            </div>

                        </div>

                        </h2>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
