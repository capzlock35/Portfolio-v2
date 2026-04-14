"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppNavbar() {
    const pathname = usePathname();
    const [currentTime, setCurrentTime] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [showExpModal, setShowExpModal] = useState(false);
    const [isClosingExpModal, setIsClosingExpModal] = useState(false);
    const [expModalReady, setExpModalReady] = useState(false);

    useEffect(() => {
        if (showExpModal) {
            // Small delay to ensure mounting before triggering animation
            const timer = setTimeout(() => setExpModalReady(true), 10);
            return () => clearTimeout(timer);
        } else {
            setExpModalReady(false);
        }
    }, [showExpModal]);

    

    

    const closeExpModal = () => {
        setIsClosingExpModal(true);
        setTimeout(() => {
            setShowExpModal(false);
            setIsClosingExpModal(false);
        }, 500);
    };

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const day = days[now.getDay()];
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? "P.M" : "A.M";
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes.toString().padStart(2, "0");
            setCurrentTime(`${day} ${displayHours}:${displayMinutes} ${ampm}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    // Hide navbar on scroll down, show on scroll up
    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const currentY = window.scrollY;
            if (menuOpen) return; // don't hide while overlay is open

            if (currentY > lastY && currentY > 80) {
                setNavHidden(true);
            } else if (currentY < lastY) {
                setNavHidden(false);
            }
            lastY = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [menuOpen]);

    const navItems = [
        { name: "ABOUT", href: "#stats" },
        { name: "PROJECTS", href: "/projects" },
        { name: "CONTACTS", href: "/#contact" },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 flex justify-between items-center p-6 px-8 md:px-12 lg:px-20 transition-transform duration-300 bg-black/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none ${navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}>
                {/* Left - Dashboard */}
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="hover:opacity-80 transition-opacity cursor-pointer"
>
  <img
    src="/logoawma.png"
    alt="Dashboard Logo"
    className="h-10 md:h-12 w-auto"
  />
</button>

                {/* Center - Desktop Navigation */}
                <div className="hidden">
                    {/* EXP Button */}
                    <button
                        onClick={() => setShowExpModal(true)}
                        className="relative uppercase tracking-wider text-xs md:text-sm font-medium transition-all text-white/60 hover:text-white"
                    >
                        EXP.
                    </button>

                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const isHashLink = item.href.startsWith("#");
                        
                        if (isHashLink) {
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={`relative uppercase tracking-wider text-xs md:text-sm font-medium transition-all text-white/60 hover:text-white`}
                                >
                                    {item.name}
                                </a>
                            );
                        }
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative uppercase tracking-wider text-xs md:text-sm font-medium transition-all ${
                                    isActive
                                        ? "text-white"
                                        : "text-white/60 hover:text-white"
                                }`}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Right side nav */}
                    <a
                        href="mailto:abdulwahid01.abdul@gmail.com"
                        aria-label="Send email"
                        className="text-white uppercase tracking-wider text-xs md:text-sm font-medium hover:text-white/80 transition-colors"
                    >
                        LET&apos;S WORK
                    </a>
                </div>

                {/* Mobile - Hamburger Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-60 flex flex-col items-center justify-center w-10 h-10 gap-[6px]"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                            menuOpen ? "rotate-45 translate-y-[8px]" : ""
                        }`}
                    />
                    <span
                        className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                            menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                        }`}
                    />
                    <span
                        className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                            menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile Full-Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-55 transition-all duration-500 ${
                    menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                {/* Menu Content */}
                <div className="relative h-full flex flex-col justify-center items-center gap-2 px-8">
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Nav Links */}
                    {/* EXP Button */}
                    <button
                        onClick={() => {
                            setShowExpModal(true);
                            setMenuOpen(false);
                        }}
                        className={`group relative block py-4 transition-all duration-500 ${
                            menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        style={{
                            transitionDelay: menuOpen ? `150ms` : "0ms",
                        }}
                    >
                        <span className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider transition-colors duration-300 text-white/40 group-hover:text-white`}>
                            EXP.
                        </span>
                    </button>

                    {navItems.map((item, i) => {
                        const isActive = pathname === item.href;
                        const isHashLink = item.href.startsWith("#");
                        
                        if (isHashLink) {
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`group relative block py-4 transition-all duration-500 ${
                                        menuOpen
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                    style={{
                                        transitionDelay: menuOpen ? `${150 + i * 75}ms` : "0ms",
                                    }}
                                >
                                    <span className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider transition-colors duration-300 text-white/40 group-hover:text-white`}>
                                        {item.name}
                                    </span>
                                </a>
                            );
                        }
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`group relative block py-4 transition-all duration-500 ${
                                    menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                                style={{
                                    transitionDelay: menuOpen ? `${150 + i * 75}ms` : "0ms",
                                }}
                            >
                                <span
                                    className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider transition-colors duration-300 ${
                                        isActive
                                            ? "text-white"
                                            : "text-white/40 group-hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                </span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div
                        className={`w-16 h-px bg-white/20 my-4 transition-all duration-500 ${
                            menuOpen
                                ? "opacity-100 scale-x-100"
                                : "opacity-0 scale-x-0"
                        }`}
                        style={{ transitionDelay: menuOpen ? "375ms" : "0ms" }}
                    />

                    {/* CTA */}
                    <a
                        href="mailto:abdulwahid01.abdul@gmail.com"
                        onClick={() => setMenuOpen(false)}
                        className={`text-lg sm:text-xl font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-all duration-500 ${
                            menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
                    >
                        LET&apos;S WORK
                    </a>

                    {/* Time display at bottom */}
                    <div
                        className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono tracking-widest transition-all duration-500 ${
                            menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: menuOpen ? "525ms" : "0ms" }}
                    >
                        {currentTime}
                    </div>
                </div>
            </div>

            {/* Experience Modal */}
            {showExpModal && (
                <div className={`fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 transition-opacity duration-300 ${isClosingExpModal ? "opacity-0" : "opacity-100"}`}>
                    <style>{`
                        .exp-modal-scroll::-webkit-scrollbar {
                            width: 6px;
                        }
                        .exp-modal-scroll::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .exp-modal-scroll::-webkit-scrollbar-thumb {
                            background: rgba(255, 255, 255, 0.15);
                            border-radius: 3px;
                        }
                        .exp-modal-scroll::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.25);
                        }
                    `}</style>
                    <div 
                        className={`relative bg-black border border-white/10 rounded-xl max-w-4xl w-full h-[90vh] md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col transition-all duration-500 ease-out ${!expModalReady || isClosingExpModal ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
                        style={{
                            transform: !expModalReady || isClosingExpModal ? "translateY(-60px)" : "translateY(0)"
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeExpModal}
                            className="absolute top-4 md:top-8 right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Modal Content - Scrollable */}
                        <div className="exp-modal-scroll overflow-y-auto flex-1">
                            <div className="pt-12 md:pt-16 px-4 md:px-16 pb-8">
                                {/* Title */}
                                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-8 md:mb-12">
                                    Experience
                                </h2>

                                {/* Job Header Box */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6 md:p-10 mb-8 md:mb-12">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                                        <h3 className="text-xl md:text-4xl font-black uppercase tracking-tight text-white">
                                            Software QA Engineer
                                        </h3>
                                    </div>

                                    {/* Accent Line - Gray */}
                                    <div className="h-1 w-full bg-gradient-to-r from-white/50 via-white/30 to-transparent rounded-full mb-4 md:mb-6" />

                                    {/* Job Meta */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                                        <p className="text-white/70 uppercase text-xs md:text-base tracking-[0.15em] font-medium">
                                            Socia, Taguig City
                                        </p>
                                        <div className="hidden md:block w-px h-5 bg-white/20" />
                                        <p className="text-white/50 uppercase text-xs md:text-base tracking-[0.1em] font-mono">
                                            10/2025 – Present
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-white/70 text-base md:text-xl leading-relaxed mb-6 md:mb-8">
                                    Serve as the one‑man QA for the team, independently managing all testing responsibilities across multiple projects.
                                </p>

                                {/* Job Responsibilities */}
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex gap-3 md:gap-6">
                                        <div className="w-1 flex-shrink-0 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" />
                                        <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                                            Handle numerous large, high‑traffic client websites, ensuring quality, stability, and seamless user experience.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 md:gap-6">
                                        <div className="w-1 flex-shrink-0 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" />
                                        <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                                            Perform comprehensive manual and automation testing, including functional, regression, and cross‑browser testing.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 md:gap-6">
                                        <div className="w-1 flex-shrink-0 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" />
                                        <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                                            Create clear and detailed bug reports and oversee ticketing and issue‑tracking processes.
                                        </p>
                                    </div>

                                    <div className="flex gap-3 md:gap-6">
                                        <div className="w-1 flex-shrink-0 bg-gradient-to-b from-white/50 via-white/30 to-transparent rounded-full" />
                                        <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                                            Develop and execute test plans, scenarios, and test cases tailored to each assigned website.
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Padding */}
                                <div className="h-8 md:h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}