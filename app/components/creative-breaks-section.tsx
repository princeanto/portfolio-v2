"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Separate component so only this part is client-side for the framer-motion animation
export default function CreativeBreaksSection() {
    // Motion component wrapping Next.js Image to animate on entering viewport
    const MotionImage = motion.create(Image);

    const [open, setOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleOpen = useCallback(() => {
        setOpen(true);
        setImageLoaded(false);
    }, []);

    useEffect(() => {
        if (open && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [open]);

    return (
        <section className="pt-40 max-[991px]:pt-20">
            <div className="container">
                <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold mb-2">Some of my Creative Breaks</h2>
                <div className="flex items-center gap-10 mt-10 max-[769px]:flex-col relative bg-black rounded-[3.5rem] max-[769px]:rounded-2xl max-[769px]:overflow-hidden">
                    {/* Background layer with its own overflow clipping so scaling element isn't cut */}
                    <div className="absolute inset-0 rounded-[3.5rem]  overflow-hidden pointer-events-none z-0 max-[769px]:rotate-180">
                        <Image
                            src="/assets/images/gold.webp"
                            alt="Creative Breaks Background"
                            width={1920}
                            height={400}
                            className="w-full h-full object-cover absolute top-0 right-0 max-w-[800px]"
                            priority
                        />
                    </div>
                    <div className="w-full max-w-[500px] max-[769px]:max-w-full h-full z-10 pl-20 max-[769px]:pl-0 py-16 max-[640px]:py-10 max-[640px]:px-2 relative">
                        <h3 className="mb-5 text-[2rem] max-[769px]:text-lg leading-[100%] font-bold">Design Experiments: Vadivelu Edition</h3>
                        <p className="text-base max-w-[28rem]">A playful concept imagining how Vadivelu’s iconic dialogues would look if turned into real digital experiences – from apps to portals.</p>
                    </div>
                    <div className="w-full h-full flex items-center justify-center relative z-10 cursor-pointer">
                        {/* Animated mobile screens (click to open popup) */}
                        <button
                            type="button"
                            onClick={handleOpen}
                            aria-label="Open Vadivelu UI full view"
                            className="relative w-full h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-3xl"
                        >
                            <MotionImage
                                src="/assets/images/mobile-screens.webp"
                                alt="Creative Breaks Mobile Screens"
                                width={1920}
                                height={400}
                                className="w-full h-full object-contain relative will-change-transform origin-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, amount: 0.4 }}
                            />
                                        {/* Hover icon indicator */}
                                        <div
                                            className="pointer-events-none absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            aria-hidden="true"
                                        >
                                            <div className="rounded-full bg-black/55 backdrop-blur-sm p-2 shadow-lg shadow-black/40 ring-1 ring-white/15">
                                                <SquareArrowOutUpRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                            <span className="sr-only">Open popup</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup dialog similar to My Work */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="min-lg:max-w-[min(90vw,1200px)] sm:max-w-[1200px] max-w-full w-full border-none bg-[#111]/90 backdrop-blur-md p-0 rounded-2xl shadow-2xl"
                    showCloseButton
                >
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between gap-4">
                            <DialogTitle className="text-2xl px-4 py-1 font-semibold ">Vadivelu UI Exploration</DialogTitle>
                        </div>
                        <div
                            ref={scrollRef}
                            className="relative w-full max-h-[90vh] overflow-auto rounded-lg scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-gutter-stable"
                            aria-busy={!imageLoaded}
                        >
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#111]/80 backdrop-blur-sm rounded-md">
                                    <div className="relative w-14 h-14">
                                        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-400 animate-spin" />
                                    </div>
                                    <p className="text-xs tracking-wider uppercase text-white/60">Loading artwork…</p>
                                </div>
                            )}
                            <Image
                                src="/assets/images/vadivelu-ui.webp"
                                alt="Vadivelu UI"
                                width={1600}
                                height={3200}
                                className={`w-full h-auto object-contain select-none will-change-transform transition-[opacity,transform] duration-600 ease-[cubic-bezier(.4,.25,.3,1)] ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'}`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
