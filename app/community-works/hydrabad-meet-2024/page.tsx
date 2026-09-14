'use client';
import Header from "@/app/components/header";
import { ArrowBigLeft, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HyderabadMeet2024() {
    const [loaded, setLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);
    const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPScjMWExYTFhJy8+PC9zdmc+";
    return (
        <>
            <Header />
            <main className="container mx-auto pt-40 pb-0 max-[640px]:pt-32">
                <Link href="/community-works" className="text-sm text-white/70 hover:text-white flex items-center gap-2">
                    <ChevronLeft />
                    Back
                </Link>
                <h1 className="text-4xl font-bold mt-6 mb-8 max-[640px]:text-3xl">Hyderabad Meet 2024</h1>
                <div className="w-full rounded-2xl relative group bg-[#111] min-h-[60vh] max-h-[80vh] flex">
                    <div className="w-full h-full overflow-auto rounded-2xl">
                        {!loaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#111]">
                                <div className="relative w-14 h-14">
                                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-400 animate-spin" />
                                </div>
                                <p className="text-xs tracking-wider uppercase text-white/60">Loading artwork…</p>
                            </div>
                        )}
                        {isClient && (
                            <Image
                                src="/assets/images/community-works-ui-5.webp"
                                alt="Hyderabad Meet 2024"
                                width={1600}
                                height={3200}
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                                onLoadingComplete={() => setLoaded(true)}
                                className={`w-full h-auto object-contain select-none transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
                                priority
                            />
                        )}
                        <div className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-700 bg-gradient-to-b from-transparent via-transparent to-black/10 ${loaded ? 'opacity-100 group-hover:opacity-80' : 'opacity-0'}`} />
                    </div>
                </div>
            </main>
        </>
    );
}
