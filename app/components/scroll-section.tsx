"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/app/hooks/useGSAP";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
    children: React.ReactNode;
}

export default function ScrollSection({ children }: ScrollSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Wait for ScrollTrigger to be ready
        ScrollTrigger.refresh();

        // 1. ENTRANCE REVEAL (Lenis-style)
        gsap.fromTo(contentRef.current, 
            { 
                clipPath: "inset(15% 5% 15% 5% round 20px)",
                opacity: 0,
                scale: 0.9,
                filter: "blur(20px)",
            },
            {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            }
        );

        // 2. EXIT STACKING - Disabled pinning to prevent scroll conflicts
        // Only animate opacity/scale without pinning to allow smooth scrolling
        gsap.to(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 1,
                pin: false,
                invalidateOnRefresh: true,
            },
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
            ease: "none"
        });
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <div ref={contentRef} className="w-full h-full overflow-hidden">
                {children}
            </div>
        </div>
    );
}
