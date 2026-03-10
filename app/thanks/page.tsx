"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../assets/logo.png"
import { Instagram, Linkedin, Twitter } from "lucide-react"

/**
 * Animated Section Wrapper (reused logic for consistancy)
 */
function AnimatedSection({ children, className, id, delay = 0 }: { children: React.ReactNode; className?: string; id?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add a small delay if provided
                    setTimeout(() => {
                        entry.target.classList.add("appear");
                    }, delay);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} id={id} className={cn("appear-animation", className)}>
            {children}
        </div>
    );
}

export default function ThanksPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="relative min-h-screen selection:bg-primary/20 selection:text-primary font-inter overflow-x-hidden">
            {/* Background clouds (fixed) */}
            <div className="fixed inset-0 -z-10 w-full h-full bg-clouds" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 flex flex-col items-center justify-center min-h-screen">
                {/* Centered thank you card */}
                <div className="w-full max-w-2xl mx-auto text-center">
                    {/* Heading */}
                    <AnimatedSection id="headline" delay={400}>
                        <h1 className="font-dm-sans font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[-0.06em] leading-[1.2] max-w-3xl mx-auto">
                            <span className="bg-gradient-to-r from-[#1c1c1c] to-[#545454] bg-clip-text text-transparent">
                                Thanks for joining <span className="font-dm-serif italic font-normal text-primary">EarlyBird!</span>
                            </span>
                        </h1>
                    </AnimatedSection>

                    {/* Subtext */}
                    <AnimatedSection id="subtext" delay={600} className="mt-4 max-w-md mx-auto">
                        <p className="text-[#545454] text-lg leading-relaxed">
                            We’ll notify you as soon as EarlyBird launches. Follow us for sneak peeks and updates.
                        </p>
                    </AnimatedSection>

                    {/* Logo */}
                    <AnimatedSection id="logo" delay={800} className="mt-3 mb-1 flex justify-center cursor-pointer group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src={logo}
                                alt="Logo"
                                width={112}
                                height={112}
                                className="w-28 h-28 object-contain relative z-10 transition-all duration-500 group-hover:scale-105 drop-shadow-sm"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Social icons */}
                    <AnimatedSection
                        id="social"
                        delay={1000}
                        className="mt-8 flex justify-center gap-4"
                    >

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/jobstory0/"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <Instagram
                                size={22}
                                className="text-[#ededed] group-hover:opacity-80 transition-opacity"
                            />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/job-story-6a344b3b6/"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <Linkedin
                                size={22}
                                className="text-[#ededed] group-hover:opacity-80 transition-opacity"
                            />
                        </a>

                        {/* X (Twitter) */}
                        <a
                            href="https://x.com/Jobstory141664"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <Twitter
                                size={22}
                                className="text-[#ededed] group-hover:opacity-80 transition-opacity"
                            />
                        </a>

                    </AnimatedSection>

                    {/* Back Home Button (Extra) */}
                    <AnimatedSection id="back-button" delay={1200} className="mt-12">
                        <a
                            href="/"
                            className="text-[#545454] hover:text-primary transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Go back home
                        </a>
                    </AnimatedSection>
                </div>
            </main>
        </div>
    );
}
