"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../assets/logo.png";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/ui/spinner";

/**
 * FAQ Item Component
 */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "faq-item bg-[#f9f9f9] rounded-2xl p-5 cursor-pointer border border-transparent transition-all",
        isOpen && "open border-[#ededed]"
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-foreground">{question}</p>
        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 faq-icon relative">
          <div className="w-2.5 h-0.5 bg-primary-foreground absolute" />
          <div className="w-0.5 h-2.5 bg-primary-foreground line2" />
        </div>
      </div>
      <div className="faq-answer text-[#545454] text-sm leading-relaxed">
        {answer}
      </div>
    </div>
  );
}

/**
 * Animated Section Wrapper
 */
function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={cn("appear-animation", className)}>
      {children}
    </div>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const joinWaitlist = useMutation(api.waitlist.joinWaitlist);
  const waitlistCount = useQuery(api.waitlist.getCount);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await joinWaitlist({ email });
      router.push("/thanks");
    } catch (error) {
      console.error("Failed to join waitlist:", error);
      // Fallback redirect even if mutation fails, or you could show an error toast
      router.push("/thanks");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-primary font-inter">
      {/* Background clouds (fixed) */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-clouds" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-8">
          {/* Logo + badge */}
          <div className="flex flex-col items-center gap-4">
            <AnimatedSection id="logo" className="mb-0 cursor-pointer group">
              <div className="relative">
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={logo}
                  alt="Logo"
                  width={140}
                  height={140}
                  className="w-36 h-36 object-contain relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 drop-shadow-sm group-hover:drop-shadow-md"
                />
              </div>
            </AnimatedSection>

            {/* Beta badge */}
            <AnimatedSection id="badge">
              <div className="bg-[#f5f5f5] rounded-full px-3 flex items-center gap-2">
                {/* Pulse indicator */}
                <div className="relative w-3 h-3">
                  <div className="absolute inset-0 rounded-full bg-primary animate-pulse-slow opacity-30" />
                  <div className="absolute inset-0 rounded-full bg-primary" />
                </div>
                <span className="text-sm font-medium text-primary tracking-tight">Beta goes live soon</span>
              </div>
            </AnimatedSection>

            {/* Main headline */}
            <AnimatedSection id="headline">
              <h1 className="font-dm-sans font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[-0.06em] leading-[1.2] max-w-3xl mx-auto">
                <span className="text-primary">
                  AI-Powered Resume & <span className="font-dm-serif italic font-normal text-secondary">Portfolio</span> Generator
                </span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection id="subhead">
              <p className="text-[#545454] max-w-lg text-lg">
                Create ATS-friendly resumes and professional portfolios in a single click. Land your dream job with minimal effort.
              </p>
            </AnimatedSection>

            {/* Email signup form */}
            <AnimatedSection id="signup" className="w-full max-w-md">
              <form
                className="w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 px-5 py-3 rounded-full border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition shadow-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-hover group relative px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg overflow-hidden disabled:opacity-80"
                  >
                    <span className="btn-text-container block h-6 overflow-hidden">
                      {isLoading ? (
                        <span className="flex items-center justify-center h-full">
                          <Spinner className="text-primary-foreground size-5" />
                        </span>
                      ) : (
                        <>
                          <span className="btn-text block">Join Waitlist</span>
                          <span className="btn-text block">Join Waitlist</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </AnimatedSection>

            {/* Social proof with avatars */}
            <AnimatedSection id="social" className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              {waitlistCount !== undefined && waitlistCount > 0 && (
                <div className="flex -space-x-3">
                  {[
                    "https://framerusercontent.com/images/HLatOHY2th72tQd2Q8SAtIND7k.png?width=904&height=1200",
                    "https://framerusercontent.com/images/psWN8QXt1XZf9ZPCJS15s3vjvI.png?scale-down-to=512&width=1200&height=1200",
                    "https://framerusercontent.com/images/f4Td5598zP1kJwu77x7p8JntQM.png?scale-down-to=512&width=1200&height=1200",
                  ].map((src, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-lg">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 text-foreground">
                {waitlistCount !== undefined && waitlistCount >= 10 ? (
                  <>
                    <span className="font-medium">Join</span>
                    <span className="font-bold text-primary">{waitlistCount.toLocaleString()}+</span>
                    <span>job seekers & career switchers</span>
                  </>
                ) : (
                  <span className="font-medium text-[#545454]">Become part of our community to shape-up your career</span>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Feature cards */}
          <AnimatedSection id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
            {/* Card 1 */}
            <div className="relative bg-card rounded-2xl p-8 text-center border border-border/50">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mt-6">ATS-Optimized</h3>
              <p className="text-sm text-[#545454] mt-2">Resumes designed to pass screening</p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-card rounded-2xl p-8 text-center border border-border/50">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary mt-6">One-Click Portfolio</h3>
              <p className="text-sm text-[#545454] mt-2">Auto-deploy your personal site</p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-card rounded-2xl p-8 text-center border border-border/50">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mt-6">AI Career Tools</h3>
              <p className="text-sm text-[#545454] mt-2">Generate content effortlessly</p>
            </div>
          </AnimatedSection>
        </section>

        {/* Mission Section */}
        <AnimatedSection id="mission" className="mt-20">
          <div className="max-w-3xl mx-auto bg-[#fcfcfc] rounded-2xl p-2 border border-[#f0f0f0] shadow-sm">
            <div className="bg-[#f9f9f9] rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="inline-block bg-muted rounded-full px-3 py-1 text-sm font-medium text-primary mb-6">Mission</div>

              <h2 className="font-dm-sans font-semibold text-3xl md:text-4xl tracking-[-0.05em] text-primary mb-4">
                The New Era of AI-Powered Career Growth
              </h2>
              <p className="text-[#545454] text-lg mb-2">
                crediblitz aims to become a complete career profile platform where you can build professional resumes, generate personal portfolios, and improve your profile using AI.
              </p>
              <p className="text-[#545454] text-lg mb-6">
                Our goal is to make career storytelling simple. Launch your professional identity in minutes, not hours.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-semibold text-primary">Key Focus:</span>
                  <span className="text-[#545454]">ATS-Friendly Templates</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-primary">Deployment:</span>
                  <span className="text-[#545454]">GitHub Pages Automated</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-primary">Built For:</span>
                  <span className="text-[#545454]">Job seekers & freelancers</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://pbs.twimg.com/profile_images/2018636868590698497/xMyRP90q_400x400.jpg"
                    alt="Yachika Goyal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-primary">Yachika Goyal</p>
                  <p className="text-xs text-[#545454]">Co-Founder @crediblitz</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>


        {/* Benefits Content */}
        <Benefits />

        {/* Comparison Table */}
        <Comparison />

        {/* FAQ Section */}
        <AnimatedSection id="faq" className="mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-muted rounded-full px-3 py-1 text-sm font-medium text-primary mb-4">FAQ</div>
            <h2 className="font-dm-sans font-semibold text-3xl md:text-4xl lg:text-5xl tracking-[-0.06em] leading-tight mb-12">
              <span className="text-primary">
                Frequently Asked <span className="font-dm-serif italic">Questions</span>
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-4">
                <FaqItem
                  question="What’s included in the free tier?"
                  answer="Free users get 5 resume templates, 2 portfolio templates, and unlimited generation with GitHub deployment."
                />
                <FaqItem
                  question="How does portfolio deployment work?"
                  answer="We automatically create a GitHub repository for you and enable GitHub Pages to host your portfolio for free."
                />
                <FaqItem
                  question="Are the resumes ATS-friendly?"
                  answer="Yes, all templates are optimized for standard Applicant Tracking Systems to ensure your resume gets seen."
                />
              </div>
              <div className="space-y-4">
                <FaqItem
                  question="What features do paid users get?"
                  answer="Paid users unlock 20+ resume templates, 10+ portfolio themes, and full AI-powered content generation."
                />
                <FaqItem
                  question="Can I export my resume as PDF?"
                  answer="Absolutely. You can generate and export your professional resume as a high-quality PDF in one click."
                />
                <FaqItem
                  question="Do I need technical skills?"
                  answer="No. crediblitz is designed for everyone. If you can fill out a form, you can build a portfolio."
                />
              </div>
            </div>

            <p className="text-[#545454] text-sm mt-8">
              Contact us:{" "}
              <a href="mailto:contact@crediblitz.online" className="text-primary underline hover:text-secondary transition-colors">
                contact@crediblitz.online
              </a>
            </p>
          </div>
        </AnimatedSection>
      </main>
    </div >
  );
}
