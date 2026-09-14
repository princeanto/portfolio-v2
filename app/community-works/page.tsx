"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import TiltCard from "../components/tilt-card";
import Header from "../components/header";

interface CommunityWorkItem {
    id: number;
    slug: string;
    title: string;
    thumb: string; // community-works-#.webp
    full: string;  // community-ui-works-#.webp
}

const communityWorks: CommunityWorkItem[] = [
    { id: 1, slug: "mad-desgin-2023", title: "MAD Design 2023", thumb: "/assets/images/community-works-1.webp", full: "/assets/images/community-ui-works-1.webp" },
    { id: 2, slug: "chennai-meet-2022", title: "Chennai Meet 2022", thumb: "/assets/images/community-works-2.webp", full: "/assets/images/community-ui-works-2.webp" },
    { id: 3, slug: "hydrabad-meet", title: "Hyderabad Meet", thumb: "/assets/images/community-works-3.webp", full: "/assets/images/community-ui-works-3.webp" },
    { id: 4, slug: "kalaiyugam-2023", title: "Kalaiyugam 2023", thumb: "/assets/images/community-works-4.webp", full: "/assets/images/community-ui-works-4.webp" },
    { id: 5, slug: "hydrabad-meet-2024", title: "Hyderabad Meet 2024", thumb: "/assets/images/community-works-5.webp", full: "/assets/images/community-ui-works-5.webp" },
    { id: 6, slug: "design-system-workshop", title: "Design System Workshop", thumb: "/assets/images/community-works-6.webp", full: "/assets/images/community-ui-works-6.webp" },
];

export default function CommunityWorks() {
    return (
        <>
            <Header />
            <main className="container mx-auto pt-40 pb-32 max-[640px]:pt-32">
                <h1 className="text-5xl font-bold mb-12 max-[640px]:text-3xl">Community Works</h1>
                <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                    {communityWorks.map(item => (
                        <TiltCard
                            key={item.id}
                            className="group rounded-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 [perspective:1200px]"
                            enableTilt
                            enableMagnetism
                            clickEffect
                            glowColor="255,122,48"
                        >
                            <Link href={`/community-works/${item.slug}`} className="block rounded-3xl overflow-hidden">
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#1b1b1b]">
                                    <Image
                                        src={item.thumb}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <p className="text-white font-semibold text-lg drop-shadow">{item.title}</p>
                                        <span className="text-xs uppercase tracking-wide bg-white/10 backdrop-blur px-3 py-1 rounded-full">View</span>
                                    </div>
                                </div>
                            </Link>
                        </TiltCard>
                    ))}
                </div>
            </main>
        </>
    );
}
