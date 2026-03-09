"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../assets/logo.png"

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
                    <AnimatedSection id="social" delay={1000} className="mt-8 flex justify-center gap-4">
                        {/* Threads */}
                        <a
                            href="https://www.threads.com/@liana.tudakova"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:opacity-80 transition-opacity">
                                <path d="M14.25 4.28C13.299 1.808 11.303 0 7.5 0C1.5 0 0 4.5 0 9C0 13.5 1.5 18 7.5 18C12 18 14.25 15 14.25 12.75C14.25 6.75 4.5 6.75 4.5 11.25C4.5 15 11.25 15 11.25 9C11.25 3.75 6 3.75 4.5 6" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(4.5 3)" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/liana.tudakova/"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:opacity-80 transition-opacity">
                                <path d="M4.5 18C2.015 18 0 15.985 0 13.5V4.5C0 2.015 2.015 0 4.5 0H13.5C15.985 0 18 2.015 18 4.5V13.5C18 15.985 15.985 18 13.5 18Z" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)" />
                                <path d="M0 3.75C0 1.679 1.679 0 3.75 0C5.821 0 7.5 1.679 7.5 3.75C7.5 5.821 5.821 7.5 3.75 7.5C1.679 7.5 0 5.821 0 3.75Z" stroke="#ededed" strokeWidth="1.5" transform="translate(8.25 8.25)" />
                                <circle cx="1.125" cy="1.125" r="1.125" fill="#ededed" transform="translate(15.75 6)" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/liana-tme/"
                            target="_blank"
                            rel="noopener"
                            className="social-icon w-12 h-12 bg-[#1c1c1c] rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:opacity-80 transition-opacity">
                                <path d="M0.75 18C0.336 18 0 17.664 0 17.25V0.75C0 0.336 0.336 0 0.75 0H17.25C17.664 0 18 0.336 18 0.75V17.25C18 17.664 17.664 18 17.25 18Z" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)" />
                                <path d="M0 0V6" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(11.25 10.5)" />
                                <path d="M0 0V6" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(8.25 10.5)" />
                                <path d="M0 2.625C0 1.175 1.175 0 2.625 0C4.075 0 5.25 1.175 5.25 2.625V6" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(11.25 10.5)" />
                                <circle cx="1.125" cy="1.125" r="1.125" fill="#ededed" transform="translate(7.125 6.75)" />
                            </svg>
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
