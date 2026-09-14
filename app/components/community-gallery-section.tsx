"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // (still imported if used elsewhere, can remove later)
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { ArrowUpRight, SquareArrowOutUpRight, SquareArrowRightIcon } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const COMMUNITY_IMAGES = [
    { src: "/assets/images/community-1.webp", alt: "Community workshop" },
    { src: "/assets/images/community-2.webp", alt: "Collaboration session" },
    { src: "/assets/images/community-3.webp", alt: "Design feedback" },
    { src: "/assets/images/community-4.webp", alt: "Critique session" },
    { src: "/assets/images/community-5.webp", alt: "Networking" },
    { src: "/assets/images/community-6.webp", alt: "Sketch sprint" },
    { src: "/assets/images/community-7.webp", alt: "Panel discussion" }
];

export default function CommunityGallerySection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleOpen = useCallback((i: number) => setOpenIndex(i), []);
    const handleClose = useCallback(() => setOpenIndex(null), []);
    const handleNavigate = useCallback((i: number) => setOpenIndex(i), []);

    // Inline gallery overlay now rendered within DialogContent to preserve UI
    function ImageGalleryInline({ index, onClose, onNavigate }: { index: number; onClose: () => void; onNavigate: (i: number) => void }) {
        const total = COMMUNITY_IMAGES.length;
        const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
        const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);
        // Lock scroll & keyboard nav
        useEffect(() => {
            const handler = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
                else if (e.key === 'ArrowLeft') goPrev();
                else if (e.key === 'ArrowRight') goNext();
            };
            document.addEventListener('keydown', handler);
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = prev; };
        }, [goPrev, goNext, onClose]);

        // Preload adjacent images to avoid flash
        useEffect(() => {
            const toPreload = [(index + 1) % total, (index - 1 + total) % total];
            toPreload.forEach(i => {
                const img = new window.Image();
                img.src = COMMUNITY_IMAGES[i].src;
            });
        }, [index, total]);

        // Crossfade logic: keep previous image visible until new fully loaded
        const [displayIndex, setDisplayIndex] = useState(index);
        const [isFading, setIsFading] = useState(false);
        useEffect(() => {
            if (index === displayIndex) return; // same
            setIsFading(true);
            const nextSrc = COMMUNITY_IMAGES[index].src;
            const preImg = new window.Image();
            preImg.src = nextSrc;
            preImg.onload = () => {
                setDisplayIndex(index);
                // small timeout to ensure opacity transition completes
                setTimeout(() => setIsFading(false), 200);
            };
        }, [index, displayIndex]);

        const current = COMMUNITY_IMAGES[index];
        if (!current) return null;
        return (
            <div className="flex items-center justify-center w-full">
                <DialogClose asChild>
                    <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                        <FiX className="w-5 h-5  max-[640px]:w-3 max-[640px]:h-3" />
                    </button>
                </DialogClose>

                {/* Side arrows hidden on small screens */}
                <button onClick={goPrev} aria-label="Previous" className="hidden z-50 sm:flex absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                    <FiChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={goNext} aria-label="Next" className="hidden z-50 sm:flex absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                    <FiChevronRight className="w-6 h-6" />
                </button>
                <div className="w-full relative max-w-[80%]">
                    <div className="relative w-full aspect-video max-[640px]:aspect-[3/4] rounded-2xl overflow-hidden">
                        {/* Previous (displayIndex) */}
                        <Image
                            key={COMMUNITY_IMAGES[displayIndex].src + '-base'}
                            src={COMMUNITY_IMAGES[displayIndex].src}
                            alt={COMMUNITY_IMAGES[displayIndex].alt || 'Gallery image'}
                            fill
                            sizes="100vw"
                            priority
                            className="aspect-video object-contain w-full select-none transition-opacity duration-200"
                            style={{ opacity: isFading ? 0 : 1 }}
                        />
                        {/* Incoming target (index) layered above during fade */}
                        {isFading && (
                            <Image
                                key={current.src + '-incoming'}
                                src={current.src}
                                alt={current.alt || 'Gallery image'}
                                fill
                                sizes="100vw"
                                priority
                                className="object-contain select-none opacity-0 animate-[fadeIn_0.2s_forwards]"
                            />
                        )}
                    </div>
                    <div className="mt-4 text-center text-sm text-white/70">{index + 1} / {total}</div>
                    {/* Mobile bottom controls */}
                    <div className="sm:hidden mt-6 flex items-center justify-center gap-8">
                        <button onClick={goPrev} aria-label="Previous" className="w-14 h-14 max-[640px]:w-9 max-[640px]:h-9 flex items-center justify-center rounded-full bg-white/10 active:scale-95 hover:bg-white/20 text-white transition">
                            <FiChevronLeft className="w-7 h-7 max-[640px]:w-5 max-[640px]:h-5" />
                        </button>
                        <button onClick={goNext} aria-label="Next" className="w-14 h-14 max-[640px]:w-9 max-[640px]:h-9 flex items-center justify-center rounded-full bg-white/10 active:scale-95 hover:bg-white/20 text-white transition">
                            <FiChevronRight className="w-7 h-7 max-[640px]:w-5 max-[640px]:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="pt-40 max-[991px]:pt-20">
            <div className="container">
                <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold mb-4">Designing with the Community, for the Community</h2>
                <p className="text-2xl text-[#696969] max-[991px]:text-xl">Design changed my life — so I give back where I can. <br className="max-[640px]:hidden" />I run workshops, mentor designers, and jam with the Madrasters fam to keep the creative energy flowing.</p>
                <div className="w-full mt-10 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-3 lg:col-span-4 flex flex-col gap-6">
                        {COMMUNITY_IMAGES.slice(0, 2).map((img, i) => (
                            <button key={img.src} onClick={() => handleOpen(i)} className="relative group rounded-3xl h-full overflow-hidden">
                                <Image src={img.src} alt={img.alt || ''} width={1920} height={400} className="w-full h-full object-cover rounded-3xl max-[769px]:rounded-xl group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </button>
                        ))}
                    </div>
                    <div className="col-span-12 sm:col-span-3 lg:col-span-3 flex flex-col gap-6">
                        {COMMUNITY_IMAGES.slice(2, 4).map((img, i) => (
                            <button key={img.src} onClick={() => handleOpen(i + 2)} className="relative group rounded-3xl h-full overflow-hidden">
                                <Image src={img.src} alt={img.alt || ''} width={1920} height={400} className="w-full h-full object-cover rounded-3xl max-[769px]:rounded-xl group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </button>
                        ))}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-6">
                            {COMMUNITY_IMAGES.slice(4, 6).map((img, i) => (
                                <button key={img.src} onClick={() => handleOpen(i + 4)} className="relative group rounded-3xl overflow-hidden h-full flex-1">
                                    <Image src={img.src} alt={img.alt || ''} width={1920} height={400} className="w-full h-full object-cover rounded-3xl max-[769px]:rounded-xl group-hover:scale-105 transition-transform duration-500" />
                                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </button>
                            ))}
                        </div>
                        <div className="w-full">
                            <button onClick={() => handleOpen(6)} className="relative group rounded-3xl overflow-hidden w-full block">
                                <Image src={COMMUNITY_IMAGES[6].src} alt={COMMUNITY_IMAGES[6].alt || ''} width={1920} height={400} className="w-full object-cover rounded-3xl max-[769px]:rounded-xl group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </button>
                        </div>
                    </div>
                    <Link href={'/community-works'} className="mt-10 col-span-12 flex gap-6 items-center text-center mx-auto bg-[radial-gradient(70.6%_120.81%_at_70.6%_77.72%,#F3F3F3_0%,#E6E7EC_30.67%,#C7CDDB_100%)] text-black px-4 py-4 rounded-full text-lg font-medium hover:scale-[0.98] active:scale-95 transition">
                        Explore Community Works
                        <div className="rounded-full bg-black/10 p-2 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-black " />
                        </div>
                    </Link>
                </div>
            </div>
            <Dialog open={openIndex !== null} onOpenChange={(open) => { if (!open) handleClose(); }}>
                <DialogContent
                    showCloseButton={false}
                    className="bg-black/80 backdrop-blur-sm border-none shadow-none p-0 w-full sm:max-w-[1200px] h-[90vh] flex items-center justify-center max-[769px]:h-[80vh] max-[640px]:max-w-full"
                >
                    {openIndex !== null && (
                        <div className="w-full h-full flex items-center justify-center relative">
                            {/* Maintain original overlay visual layering by wrapping with an absolute fill for click outside if needed (handled by DialogOverlay) */}
                            <ImageGalleryInline index={openIndex} onClose={handleClose} onNavigate={handleNavigate} />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
