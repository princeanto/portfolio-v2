'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface SkillCard {
    title: string;
    desc: string;
    img: string;
    colSpan: string; // tailwind col span classes
}

interface WhatIDoBentoProps {
    glowColor?: string; // RGB e.g. "36, 161, 72"
    spotlightRadius?: number;
    particleCount?: number;
    enableSpotlight?: boolean;
    enableParticles?: boolean;
    enableTilt?: boolean;
    enableMagnetism?: boolean;
    clickEffect?: boolean;
    enableBorderGlow?: boolean;
}

const DEFAULT_GLOW = '36, 161, 72';
const DEFAULT_RADIUS = 300;
const DEFAULT_PARTICLE_COUNT = 12;
const MOBILE_BREAKPOINT = 768;

const DATA: SkillCard[] = [
    { title: 'Product Design', desc: 'Crafting intuitive, pixel-perfect experiences for web and mobile.', img: '/assets/images/product-design-1.png', colSpan: 'col-span-4 max-[769px]:col-span-12' },
    { title: 'UI/UX Strategy', desc: 'Solving real user problems with research-driven design thinking.', img: '/assets/images/product-design-2.png', colSpan: 'col-span-4 max-[769px]:col-span-12' },
    { title: 'Design Systems', desc: 'Building scalable, flexible systems that power consistency and speed.', img: '/assets/images/product-design-3.png', colSpan: 'col-span-4 max-[769px]:col-span-12' },
    { title: 'AI-Enhanced Design', desc: 'Leveraging AI tools like ChatGPT & Perplexity to supercharge creativity.', img: '/assets/images/product-design-4.png', colSpan: 'col-span-6 max-[769px]:col-span-12' },
    // { title: 'Community Building', desc: 'Empowering designers through events, workshops, mentorship.', img: '/assets/images/product-design-5.png', colSpan: 'col-span-6 max-[769px]:col-span-12' },
];

// Utility helpers (adapted from magic-bento)
const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
});

const updateCardGlow = (card: HTMLElement, mx: number, my: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const rx = ((mx - rect.left) / rect.width) * 100;
    const ry = ((my - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', `${rx}%`);
    card.style.setProperty('--glow-y', `${ry}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

// Spotlight component
const GlobalSpotlight: React.FC<{ gridRef: React.RefObject<HTMLDivElement | null>; glowColor: string; radius: number; enabled: boolean; disable: boolean; }> = ({ gridRef, glowColor, radius, enabled, disable }) => {
    useEffect(() => {
        if (disable || !enabled || !gridRef.current) return;
        const spotlight = document.createElement('div');
        spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;mix-blend-mode:screen;background:radial-gradient(circle,rgba(${glowColor},0.18)0%,rgba(${glowColor},0.10)20%,rgba(${glowColor},0.05)35%,rgba(${glowColor},0.02)55%,rgba(${glowColor},0.01)70%,transparent 75%);z-index:200;opacity:0;transform:translate(-50%,-50%);`;
        document.body.appendChild(spotlight);

        const move = (e: MouseEvent) => {
            const container = gridRef.current; if (!container) return;
            const section = container.closest('.what-i-do-bento-section');
            const rect = section?.getBoundingClientRect();
            const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
            if (!inside) {
                gsap.to(spotlight, { opacity: 0, duration: 0.3 });
                container.querySelectorAll('.what-card').forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
                return;
            }
            gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.12, ease: 'power2.out' });
            const { proximity, fadeDistance } = calculateSpotlightValues(radius);
            let minDist = Infinity;
            container.querySelectorAll('.what-card').forEach(cardEl => {
                const card = cardEl as HTMLElement;
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2;
                const effective = Math.max(0, dist);
                minDist = Math.min(minDist, effective);
                let intensity = 0;
                if (effective <= proximity) intensity = 1; else if (effective <= fadeDistance) intensity = (fadeDistance - effective) / (fadeDistance - proximity);
                updateCardGlow(card, e.clientX, e.clientY, intensity, radius);
            });
            const targetOpacity = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
            gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.4, ease: 'power2.out' });
        };
        document.addEventListener('mousemove', move);
        return () => { document.removeEventListener('mousemove', move); spotlight.remove(); };
    }, [gridRef, glowColor, radius, enabled, disable]);
    return null;
};

// Particle Card
const ParticleCard: React.FC<{ children: React.ReactNode; glowColor: string; particleCount: number; enableTilt: boolean; enableMagnetism: boolean; clickEffect: boolean; enableParticles: boolean; disable: boolean; className?: string; style?: React.CSSProperties; }>
    = ({ children, glowColor, particleCount, enableTilt, enableMagnetism, clickEffect, enableParticles, disable, className = '', style }) => {
        const ref = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<number[]>([]);
        const isHover = useRef(false);
        const initialized = useRef(false);
        const memoParticles = useRef<HTMLDivElement[]>([]);

        const createParticle = useCallback(() => {
            const el = document.createElement('div');
            el.className = 'wi-particle';
            const size = 4 + Math.random() * 4;
            el.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(${glowColor},1);box-shadow:0 0 6px rgba(${glowColor},0.6);pointer-events:none;left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:0;`;
            return el;
        }, [glowColor]);

        const init = useCallback(() => {
            if (initialized.current || !ref.current) return;
            memoParticles.current = Array.from({ length: particleCount }, createParticle);
            initialized.current = true;
        }, [particleCount, createParticle]);

        const clearParticles = useCallback(() => {
            timeoutsRef.current.forEach(t => window.clearTimeout(t));
            timeoutsRef.current = [];
            particlesRef.current.forEach(p => gsap.to(p, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.remove() }));
            particlesRef.current = [];
        }, []);

        const spawn = useCallback(() => {
            if (!ref.current || !isHover.current || !enableParticles) return;
            if (!initialized.current) init();
            memoParticles.current.forEach((proto, idx) => {
                const id = window.setTimeout(() => {
                    if (!ref.current || !isHover.current) return;
                    const clone = proto.cloneNode(true) as HTMLDivElement;
                    ref.current!.appendChild(clone);
                    particlesRef.current.push(clone);
                    gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
                    gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
                    gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                }, idx * 110);
                timeoutsRef.current.push(id);
            });
        }, [enableParticles, init]);

        useEffect(() => {
            if (disable) return;
            const el = ref.current; if (!el) return;
            const enter = () => { isHover.current = true; spawn(); if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 }); };
            const leave = () => { isHover.current = false; clearParticles(); if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' }); if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3 }); };
            const move = (e: MouseEvent) => {
                if (disable) return; if (!enableTilt && !enableMagnetism) return;
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left; const y = e.clientY - r.top;
                const cx = r.width / 2; const cy = r.height / 2;
                if (enableTilt) {
                    const rotateX = ((y - cy) / cy) * -10; const rotateY = ((x - cx) / cx) * 10;
                    gsap.to(el, { rotateX, rotateY, duration: 0.12, ease: 'power2.out', transformPerspective: 1000 });
                }
                if (enableMagnetism) {
                    gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
                }
            };
            const click = (e: MouseEvent) => {
                if (!clickEffect) return;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const maxD = Math.max(
                    Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
                );
                const ripple = document.createElement('div');
                ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;left:${x - maxD}px;top:${y - maxD}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.45)0%,rgba(${glowColor},0.25)35%,transparent 70%);pointer-events:none;z-index:40;`;
                el.appendChild(ripple);
                gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
            };
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', leave);
            el.addEventListener('mousemove', move);
            el.addEventListener('click', click);
            return () => { isHover.current = false; el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); el.removeEventListener('mousemove', move); el.removeEventListener('click', click); clearParticles(); };
        }, [disable, enableTilt, enableMagnetism, clickEffect, glowColor, spawn, clearParticles]);

        return <div ref={ref} className={className} style={style}>{children}</div>;
    };

const useIsMobile = () => {
    const [m, setM] = useState(false);
    useEffect(() => { const h = () => setM(window.innerWidth <= MOBILE_BREAKPOINT); h(); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
    return m;
};

const WhatIDoBentoSection: React.FC<WhatIDoBentoProps> = ({
    glowColor = DEFAULT_GLOW,
    spotlightRadius = DEFAULT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableSpotlight = true,
    enableParticles = true,
    enableTilt = true,
    enableMagnetism = true,
    clickEffect = true,
    enableBorderGlow = true,
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const disable = isMobile; // disable heavy effects on mobile

    return (
        <section className="pt-40 max-[991px]:pt-20 what-i-do-bento-section">
            <div className="container">
                <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold mb-2 text-center">What do I do?</h2>
                <style>{`
          .what-i-do-bento-section { --glow-color: ${glowColor}; }
          .what-card { position:relative; --glow-x:50%; --glow-y:50%; --glow-intensity:0; --glow-radius:${spotlightRadius}px; }
          .what-card${enableBorderGlow ? '.card--border-glow' : ''}::after { content:''; position:absolute; inset:0; padding:2px; border-radius:inherit; pointer-events:none; background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity)*0.85)) 0%, rgba(${glowColor}, calc(var(--glow-intensity)*0.45)) 35%, transparent 65%); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; transition: opacity .3s ease; }
          .what-card:hover { box-shadow:0 6px 30px rgba(0,0,0,0.35), 0 0 32px rgba(${glowColor},0.25); }
          .wi-particle:before { content:''; position:absolute; inset:-2px; background:rgba(${glowColor},0.25); border-radius:50%; }
        `}</style>
                {enableSpotlight && (
                    <GlobalSpotlight gridRef={gridRef} glowColor={glowColor} radius={spotlightRadius} enabled={enableSpotlight} disable={disable} />
                )}
                <div ref={gridRef} className=" mt-12 select-none max-[1025px]:max-w-[800px] mx-auto">
                    <ParticleCard

                        glowColor={glowColor}
                        particleCount={particleCount}
                        enableTilt={enableTilt}
                        enableMagnetism={enableMagnetism}
                        clickEffect={clickEffect}
                        enableParticles={enableParticles}
                        disable={disable}
                        className={`what-card ${enableBorderGlow ? 'card--border-glow' : ''} bg-[#242424] rounded-3xl p-10 max-[991px]:p-6 flex flex-col gap-4 overflow-hidden border border-[#252525]`}
                    >
                        <div className='grid grid-cols-12 gap-6'>
                            {DATA.map((card, i) => (
                                <div key={i} className="flex flex-col items-center justify-center gap-4 col-span-3 max-[1025px]:col-span-6 max-[641px]:col-span-12">
                                    <div className="relative overflow-hidden flex-shrink-0">
                                        <Image src={card.img} alt={card.title} width={68} height={68} sizes="128px" className="object-contain p-2 w-full h-full max-w-[68px] max-h-[68px]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold mb-2 text-center">{card.title}</h3>
                                        <p className="text-base text-white/70 text-center leading-relaxed">{card.desc}</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </ParticleCard>
                </div>
            </div>
        </section>
    );
};

export default WhatIDoBentoSection;
