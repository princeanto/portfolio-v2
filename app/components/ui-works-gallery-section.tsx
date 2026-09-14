"use client";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { gsap } from "gsap";

// Preview images (card thumbnails)
const UI_WORKS_THUMBS = [
    { thumb: "/assets/images/ui-works-1.webp", full: "/assets/images/ui-works-full-1.webp", alt: "UI exploration 1" },
    { thumb: "/assets/images/ui-works-2.webp", full: "/assets/images/ui-works-full-2.webp", alt: "UI exploration 2" },
    { thumb: "/assets/images/ui-works-3.webp", full: "/assets/images/ui-works-full-3.webp", alt: "UI exploration 3" },
    { thumb: "/assets/images/ui-works-4.webp", full: "/assets/images/ui-works-full-4.webp", alt: "UI exploration 4" }
];

const DEFAULT_GLOW_COLOR = "255, 122, 48"; // rgba(255,122,48,1)

interface UIWorksGalleryProps {
    glowColor?: string;            // RGB string e.g. "255,122,48"
    spotlightRadius?: number;      // Radius influencing glow falloff
    enableSpotlight?: boolean;     // Toggle spotlight effect
    enableTilt?: boolean;          // 3D tilt & magnetism
    enableMagnetism?: boolean;     // subtle translation toward cursor
    enableBorderGlow?: boolean;    // border gradient glow
    enableParticles?: boolean;     // floating particles like Magic Bento
    particleCount?: number;        // number of particles
    clickEffect?: boolean;         // ripple click effect
}

// Spotlight logic (adapted from Magic Bento GlobalSpotlight for local scope)
function useGlobalSpotlight(
    containerRef: React.RefObject<HTMLDivElement | null>,
    { glowColor, radius, enabled }: { glowColor: string; radius: number; enabled: boolean }
) {
    useEffect(() => {
        const root = containerRef.current;
        if (!root || !enabled) return;
        const spotlight = document.createElement("div");
        spotlight.className = "ui-works-spotlight";
        spotlight.style.cssText = `
      position: fixed; width: 700px; height: 700px; border-radius:50%; pointer-events:none; z-index:200; opacity:0; mix-blend-mode:screen; background:radial-gradient(circle,
                rgba(${glowColor},0.18) 0%,
                rgba(${glowColor},0.10) 20%,
                rgba(${glowColor},0.05) 35%,
                rgba(${glowColor},0.02) 55%,
                rgba(${glowColor},0.01) 70%,
        transparent 75%); transform:translate(-50%, -50%); transition:opacity .35s ease;`;
        document.body.appendChild(spotlight);

        const handleMove = (e: MouseEvent) => {
            if (!root) return;
            const section = root.closest(".ui-works-bento-section");
            const rect = section?.getBoundingClientRect();
            const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
            if (!inside) {
                spotlight.style.opacity = "0";
                root.querySelectorAll<HTMLElement>(".ui-works-card").forEach(c => c.style.setProperty("--glow-intensity", "0"));
                return;
            }

            gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.15, ease: "power2.out" });

            const proximity = radius * 0.5;
            const fadeDistance = radius * 0.75;
            let minDist = Infinity;
            root.querySelectorAll<HTMLElement>(".ui-works-card").forEach(card => {
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2;
                const eff = Math.max(0, dist);
                minDist = Math.min(minDist, eff);
                let intensity = 0;
                if (eff <= proximity) intensity = 1; else if (eff <= fadeDistance) intensity = (fadeDistance - eff) / (fadeDistance - proximity);
                card.style.setProperty("--glow-x", `${((e.clientX - r.left) / r.width) * 100}%`);
                card.style.setProperty("--glow-y", `${((e.clientY - r.top) / r.height) * 100}%`);
                card.style.setProperty("--glow-intensity", intensity.toString());
                card.style.setProperty("--glow-radius", `${radius}px`);
            });
            const targetOpacity = minDist <= proximity ? 0.85 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.85 : 0;
            gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.25 : 0.4, ease: "power2.out" });
        };

        document.addEventListener("mousemove", handleMove);
        return () => { document.removeEventListener("mousemove", handleMove); spotlight.remove(); };
    }, [containerRef]);
}

// Tilt & magnetism per card (lightweight version)
function useInteractiveCard(ref: React.RefObject<HTMLButtonElement | null>, { enableTilt, enableMagnetism }: { enableTilt: boolean; enableMagnetism: boolean; }) {
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const handleMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left; const y = e.clientY - r.top;
            const cx = r.width / 2; const cy = r.height / 2;
            if (enableTilt || enableMagnetism) {
                const rotateX = enableTilt ? ((y - cy) / cy) * -8 : 0;
                const rotateY = enableTilt ? ((x - cx) / cx) * 8 : 0;
                gsap.to(el, { rotateX, rotateY, x: enableMagnetism ? (x - cx) * 0.05 : 0, y: enableMagnetism ? (y - cy) * 0.05 : 0, duration: 0.25, ease: "power2.out", transformPerspective: 1000 });
            }
        };
        const reset = () => { gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.4, ease: "power2.out" }); };
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", reset);
        return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", reset); };
    }, [ref, enableTilt, enableMagnetism]);
}

// Gallery overlay (adapted from community) with cross-fade preloading
function GalleryOverlay({ index, onClose, onNavigate }: { index: number; onClose: () => void; onNavigate: (i: number) => void; }) {
    const total = UI_WORKS_THUMBS.length;
    const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
    const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

    useEffect(() => {
        const key = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
        };
        document.addEventListener("keydown", key);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", key); document.body.style.overflow = prevOverflow; };
    }, [goPrev, goNext, onClose]);

    useEffect(() => {
        const preloadIdx = [(index + 1) % total, (index - 1 + total) % total];
        preloadIdx.forEach(i => { const img = new window.Image(); img.src = UI_WORKS_THUMBS[i].full; });
    }, [index, total]);

    const [displayIndex, setDisplayIndex] = useState(index);
    const [isFading, setIsFading] = useState(false);
    useEffect(() => {
        if (displayIndex === index) return;
        setIsFading(true);
        const next = new window.Image();
        next.src = UI_WORKS_THUMBS[index].full;
        next.onload = () => { setDisplayIndex(index); setTimeout(() => setIsFading(false), 200); };
    }, [index, displayIndex]);

    const current = UI_WORKS_THUMBS[index];
    // Keep rendering markup but let Dialog provide overlay/portal; this component will be placed inside DialogContent
    return (
        <div className="flex items-center justify-center w-full">
            <DialogClose asChild>
                <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                    <FiX className="w-5 h-5  max-[640px]:w-3 max-[640px]:h-3" />
                </button>
            </DialogClose>

            {/* Side arrows (desktop / tablet) */}
            <button onClick={goPrev} aria-label="Previous" className="hidden sm:flex absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><FiChevronLeft className="w-6 h-6" /></button>
            <button onClick={goNext} aria-label="Next" className="hidden sm:flex absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><FiChevronRight className="w-6 h-6" /></button>

            <div className="w-full max-w-5xl relative">
                <div className="relative w-full aspect-video max-[640px]:aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                        key={UI_WORKS_THUMBS[displayIndex].full + '-base'}
                        src={UI_WORKS_THUMBS[displayIndex].full}
                        alt={UI_WORKS_THUMBS[displayIndex].alt}
                        fill
                        sizes="100vw"
                        priority
                        className="object-contain select-none"
                    />
                    {isFading && (
                        <Image
                            key={current.full + '-incoming'}
                            src={current.full}
                            alt={current.alt}
                            fill
                            sizes="100vw"
                            priority
                            className="object-contain select-none opacity-0 animate-[fadeIn_0.2s_forwards]"
                        />
                    )}
                </div>
                <div className="mt-4 text-center text-sm text-white/70">{index + 1} / {total}</div>
                {/* Bottom controls (mobile) */}
                <div className="sm:hidden mt-6 flex items-center justify-center gap-8">
                    <button onClick={goPrev} aria-label="Previous" className="w-14 h-14 max-[640px]:w-8 max-[640px]:h-8 flex items-center justify-center rounded-full bg-white/10 active:scale-95 hover:bg-white/20 text-white transition">
                        <FiChevronLeft className="w-7 h-7  max-[640px]:w-4 max-[640px]:h-4" />
                    </button>
                    <button onClick={goNext} aria-label="Next" className="w-14 h-14 max-[640px]:w-8 max-[640px]:h-8  flex items-center justify-center rounded-full bg-white/10 active:scale-95 hover:bg-white/20 text-white transition">
                        <FiChevronRight className="w-7 h-7  max-[640px]:w-4 max-[640px]:h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function UIWorksGallerySection({
    glowColor = DEFAULT_GLOW_COLOR,
    spotlightRadius = 260,
    enableSpotlight = true,
    enableTilt = true,
    enableMagnetism = true,
    enableBorderGlow = true,
    enableParticles = true,
    particleCount = 12,
    clickEffect = true,
}: UIWorksGalleryProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const open = useCallback((i: number) => setOpenIndex(i), []);
    const close = useCallback(() => setOpenIndex(null), []);
    const navigate = useCallback((i: number) => setOpenIndex(i), []);
    const gridRef = useRef<HTMLDivElement>(null);
    useGlobalSpotlight(gridRef, { glowColor, radius: spotlightRadius, enabled: enableSpotlight });

    return (
        <section className="pt-40 max-[991px]:pt-20">
            <div className="container">
                <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold mb-2">UI Works</h2>
                <p className="text-2xl text-[#696969] max-[991px]:text-xl">Snippets from some of my favorite UI explorations, from onboarding to KYC to motion-rich interfaces.</p>
                <style>{`
                            .ui-works-bento-section { --glow-color: ${glowColor}; }
                            .ui-works-card { position:relative; --glow-x:50%; --glow-y:50%; --glow-intensity:0; --glow-radius:${spotlightRadius}px; }
                            .ui-works-card${enableBorderGlow ? '.card--border-glow' : ''}::after { content:""; position:absolute; inset:0; padding:2px; border-radius:inherit; pointer-events:none; background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%, rgba(${glowColor}, calc(var(--glow-intensity) * 0.45)) 35%, transparent 65%); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; transition:opacity .3s ease; opacity:1; }
                            .ui-works-card:hover { box-shadow:0 6px 28px rgba(0,0,0,0.25), 0 0 32px rgba(${glowColor},0.25); }
                        `}</style>
                <div ref={gridRef} className="ui-works-bento-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 select-none">
                    {UI_WORKS_THUMBS.map((img, i) => (
                        <UIWorksCard
                            key={img.thumb}
                            index={i}
                            src={img.thumb}
                            alt={img.alt}
                            onOpen={open}
                            glowColor={glowColor}
                            enableTilt={enableTilt}
                            enableMagnetism={enableMagnetism}
                            enableParticles={enableParticles}
                            particleCount={particleCount}
                            clickEffect={clickEffect}
                        />
                    ))}
                </div>
            </div>
            <Dialog open={openIndex !== null} onOpenChange={(isOpen) => { if (!isOpen) close(); }}>
                {openIndex !== null && (
                    <DialogContent showCloseButton={false} className=" border-0 h-[85vh] sm:lg:max-w-[1200px] p-0 shadow-none max-w-[90vw] w-full">
                        <GalleryOverlay index={openIndex} onClose={close} onNavigate={navigate} />
                    </DialogContent>
                )}
            </Dialog>
        </section>
    );
}

// --- Card Subcomponent with particles & optional ripple ---
function UIWorksCard({
    index,
    src,
    alt,
    onOpen,
    glowColor,
    enableTilt,
    enableMagnetism,
    enableParticles,
    particleCount,
    clickEffect,
}: {
    index: number;
    src: string;
    alt: string;
    onOpen: (i: number) => void;
    glowColor: string;
    enableTilt: boolean;
    enableMagnetism: boolean;
    enableParticles: boolean;
    particleCount: number;
    clickEffect: boolean;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const isHoverRef = useRef(false);

    useInteractiveCard(btnRef, { enableTilt, enableMagnetism });

    // Particle creation similar to Magic Bento (simplified)
    const createParticle = useCallback((w: number, h: number) => {
        const el = document.createElement("div");
        el.className = "ui-works-particle";
        const size = 4 + Math.random() * 4;
        el.style.cssText = `position:absolute; width:${size}px; height:${size}px; border-radius:50%; left:${Math.random() * w}px; top:${Math.random() * h}px; background:rgba(${glowColor},1); box-shadow:0 0 6px rgba(${glowColor},0.6); pointer-events:none; opacity:0;`;
        return el;
    }, [glowColor]);

    const clearParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        particlesRef.current.forEach(p => {
            gsap.to(p, { opacity: 0, scale: 0, duration: 0.3, ease: "back.in(1.7)", onComplete: () => p.remove() });
        });
        particlesRef.current = [];
    }, []);

    const spawnParticles = useCallback(() => {
        const host = btnRef.current;
        if (!host || !enableParticles) return;
        const { width, height } = host.getBoundingClientRect();
        for (let i = 0; i < particleCount; i++) {
            const timeout = setTimeout(() => {
                if (!isHoverRef.current || !host) return;
                const particle = createParticle(width, height);
                host.appendChild(particle);
                particlesRef.current.push(particle);
                gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
                // floating animation
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                });
                gsap.to(particle, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: "power2.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }, i * 90);
            timeoutsRef.current.push(timeout);
        }
    }, [enableParticles, particleCount, createParticle]);

    useEffect(() => {
        const el = btnRef.current; if (!el) return;
        const onEnter = () => { isHoverRef.current = true; spawnParticles(); };
        const onLeave = () => { isHoverRef.current = false; clearParticles(); };
        const onClick = (e: MouseEvent) => {
            if (!clickEffect) return;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const maxD = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );
            const ripple = document.createElement("div");
            ripple.style.cssText = `position:absolute; width:${maxD * 2}px; height:${maxD * 2}px; left:${x - maxD}px; top:${y - maxD}px; border-radius:50%; background:radial-gradient(circle, rgba(${glowColor},0.45) 0%, rgba(${glowColor},0.25) 35%, transparent 70%); pointer-events:none; z-index:30;`;
            el.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("click", onClick);
        return () => { onLeave(); el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); el.removeEventListener("click", onClick); };
    }, [spawnParticles, clearParticles, clickEffect, glowColor]);

    return (
        <button
            ref={btnRef}
            onClick={() => onOpen(index)}
            className="ui-works-card card--border-glow rounded-3xl overflow-hidden aspect-[4/5] bg-[#0F0F10] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30]/40"
        >
            <Image src={src} alt={alt} width={1200} height={1500} className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </button>
    );
}
