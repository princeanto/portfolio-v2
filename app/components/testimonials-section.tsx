"use client";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "He consistently takes complete ownership of projects and drives them with clarity and dedication. Prince has an exceptional ability to handle complex problems and translate them into thoughtful, practical design solutions.",
        name: "Ganesh",
        role: "Manager · M2P Fintech",
        avatar: "/assets/images/ganesh.png",
    },
    {
        quote:
            "His main strengths include sharp problem-solving abilities and grasping complex concepts quickly. His adaptability and resilience enable him to thrive under pressure, with a proactive attitude.",
        name: "Jeevan",
        role: "Manager · M2P Fintech",
        avatar: "/assets/images/jeevan.png",
    },
    {
        quote:
            "Prince quickly understands product context and brings structure to ambiguity. His calm, analytical approach helps teams move faster with confidence.",
        name: "Rajesh Sanker",
        role: "Manager · M2P Fintech",
        avatar: "/assets/images/rajesh.png",
    },
    {
        quote:
            "His creativity, attention to detail, and collaborative spirit make him a joy to work with. He will continue to shine and achieve remarkable success everywhere he goes.",
        name: "Ishaq",
        role: "Lead Designer · Publicis Sapient",
        avatar: "/assets/images/ishaq.png",
    },
];

const AUTOPLAY_INTERVAL = 6500; // ms

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [containerHeight, setContainerHeight] = useState<number | null>(null);
    const isTransitioningRef = useRef(false);

    const measureHeight = useCallback(() => {
        if (!trackRef.current) return;
        const slide = trackRef.current.children[index] as HTMLElement | undefined;
        if (slide) setContainerHeight(slide.offsetHeight);
    }, [index]);

    useEffect(() => { measureHeight(); }, [measureHeight]);
    useEffect(() => {
        // Re-measure on resize for responsiveness
        const onResize = () => measureHeight();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [measureHeight]);

    const goTo = useCallback((i: number) => {
        const target = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
        if (target === index || isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIndex(target);
        // release lock after CSS transition (~500ms)
        setTimeout(() => { isTransitioningRef.current = false; }, 520);
    }, [index]);

    const next = useCallback(() => goTo((index + 1) % TESTIMONIALS.length), [index, goTo]);

    // autoplay
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [index, next]);

    // keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') goTo((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [index, next, goTo]);

    // Preload avatar & maybe future large assets
    useEffect(() => {
        if (typeof window === 'undefined') return;
        TESTIMONIALS.forEach(t => {
            const img = document.createElement('img');
            img.src = t.avatar;
        });
    }, []);

    const active = TESTIMONIALS[index];

    return (
        <section className="pt-40 max-[991px]:pt-24">
            <div className="container">
                <div className="w-full mx-auto text-center relative border border-white/30 rounded-4xl p-10 max-[769px]:p-6">
                    {/* Slider Wrapper */}
                    <div
                        className="relative overflow-hidden"
                        style={{ height: containerHeight ? containerHeight : undefined, transition: 'height 320ms cubic-bezier(.65,.05,.36,1)' }}
                    >
                        <div
                            ref={trackRef}
                            className="flex w-full will-change-transform transition-transform duration-500 ease-[cubic-bezier(.65,.05,.36,1)]"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                            aria-live="polite"
                        >
                            {TESTIMONIALS.map((t, i) => (
                                <div key={t.name} className="w-full shrink-0 px-4 relative">
                                    <blockquote className="flex flex-col items-center justify-center min-h-[220px]">
                                        <span className="text-[130px] text-white/50 absolute top-0 left-0 max-[640px]:-top-10">“</span>
                                        <p className="text-[2rem] px-8 py-20 max-[640px]:px-0 font-medium max-[991px]:text-xl text-white/70">{t.quote}</p>
                                        <span className="text-[130px] text-white/50 absolute bottom-0 right-0 max-[640px]:bottom-10">”</span>
                                        <footer className={`mt-6 text-2xl tracking-wide ${i === index ? 'text-white/70' : 'text-white/40'}`}><span className="text-white">{t.name}</span> - {t.role}</footer>
                                    </blockquote>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Avatars */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 max-[640px]:gap-3">
                        {TESTIMONIALS.map((t, i) => {
                            const isActive = i === index;
                            return (
                                <button
                                    key={t.name}
                                    onClick={() => goTo(i)}
                                    aria-label={`Show testimonial from ${t.name}`}
                                    className={`relative group rounded-md p-[2px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30]/50 ${isActive ? 'ring-2 ring-[#FF7A30]/80' : 'ring-0'}`}
                                >
                                    <span className={`absolute -inset-1 rounded-md bg-gradient-to-br from-[#FF7A30]/40 via-[#FF7A30]/20 to-transparent opacity-0 blur-md group-hover:opacity-100 transition ${isActive ? 'opacity-100' : ''}`}></span>
                                    <div className={`relative w-16 h-16 max-[640px]:w-12 max-[640px]:h-12 rounded-md overflow-hidden bg-[#1C1C1C] border border-white/10 transition-transform duration-300 ${isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-50 group-hover:scale-105'}`}>
                                        <Image src={t.avatar} alt={t.name} fill sizes="64px" className="object-cover" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    {/* Progress bar for autoplay */}
                    <div className="mt-10 h-1 w-48 mx-auto bg-white/10 rounded-full overflow-hidden">
                        <span key={index + '-progress'} className="block h-full bg-gradient-to-r from-[#FF7A30] to-[#FFB070] animate-[grow_6.5s_linear]" />
                    </div>
                    <style jsx>{`
            @keyframes grow { from { transform:translateX(-100%);} to { transform:translateX(0);} }
            .animate-[grow_6.5s_linear] { animation: grow ${AUTOPLAY_INTERVAL}ms linear forwards; }
          `}</style>
                </div>
            </div>
        </section>
    );
}
