'use client';
import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TiltCard from "./components/tilt-card";
import AnimatedText from "./components/animated-text";
// import Carousel from "./components/carousel"; // (optional) legacy carousel
import CreativeBreaksSection from "./components/creative-breaks-section";
import CommunityGallerySection from "./components/community-gallery-section";
import MagicBento from "./components/magic-bento";
import UIWorksGallerySection from "./components/ui-works-gallery-section";
import WhatIDoBentoSection from "./components/what-i-do-bento-section";
import TestimonialsSection from "./components/testimonials-section";
import { Plasma } from "./components/plasma";
import { ChevronUp, SquareArrowOutUpRight } from "lucide-react";
import Aurora from "./components/aurora";

// Client components imported directly (Next.js will create boundaries automatically)
export default function Home() {
  // Modal state for work preview
  const workItems = [
    {
      id: "lulu",
      thumb: "/assets/images/lulumoney.webp",
      full: "/assets/images/Lulu-ui.png",
      alt: "Lulu Money UI"
    },
    {
      id: "alfapay",
      thumb: "/assets/images/alfapay.webp",
      full: "/assets/images/Alfapay-ui.png",
      alt: "Alfapay UI"
    },
    {
      id: "cookr",
      thumb: "/assets/images/cookr.webp",
      full: "/assets/images/Cookr-ui.png",
      alt: "Cookr UI"
    },
    {
      id: "wand",
      thumb: "/assets/images/wand.webp",
      full: "/assets/images/Wand-ui.png",
      alt: "Wand App UI"
    }
  ] as const;

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);

  const activeItem = workItems.find(w => w.id === activeId) || null;

  const handleOpen = useCallback((id: string) => {
    setActiveId(id);
    setOpen(true);
  }, []);

  useEffect(() => {
    // Reset scroll position on page load
    window.scrollTo(0, 0);

    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 0
    });
  }, []);

  // Handle scroll to hide hero border and padding
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        // Hide border when hero section top is above viewport
        const shouldScroll = rect.top < 0;
        setIsScrolled(shouldScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main className="pb-[10rem] max-[640px]:pb-10">
        <section
          ref={heroSectionRef}
          className={`relative h-screen overflow-x-hidden transition-all p-4 max-[769px]:p-2 duration-300 ease-out`}

        >
          <div className={`container-full border rounded-xl max-[769px]:rounded-lg h-full flex items-center relative transition-all duration-300 ease-out  ${isScrolled
            ? 'border-transparent'
            : ' border-white/50 '
            }`}>
            {/* <div className="bg-[#E87F31] blur-[1012px] -z-10 rounded-full w-full max-w-[420px] h-full max-h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backdropFilter: "blur(1012px)" }} /> */}
            <div className="min-w-fit w-full relative z-10 max-[769px]:pt-30 max-[769px]:min-w-full"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-offset="120"
              data-aos-duration="1200"
              data-aos-easing="ease-out-cubic"
            >
              <div className="w-full h-full flex flex-col item-center justify-center relative max-[769px]:mt-0">
                <AnimatedText
                  text="Hey, I'm Prince"
                  highlightText="I'm Prince"
                  className="text-[clamp(3rem,-0.9669rem+9.9174vw,7.5rem)] text-center"
                  delay={0.5}
                />
                {/* <p className="text-white text-center max-w-3xl mx-auto text-[clamp(1.5rem,0.6185rem+2.2039vw,2.5rem)] font-normal mb-4">I’m a product designer.</p> */}
                <p className="text-white text-center max-w-4xl mx-auto text-base px-2 min-sm:text-xl font-normal mb-8">Product Designer specialized in decoding complex workflows and executing high-impact, user-centric designs. A self-taught, fast learner who skips the fluff to build intuitive products that scale.</p>
                <Link href="/assets/pdf/Resume.pdf" download="Prince_Resume.pdf" className="mx-auto w-fit group">
                  <button className="relative mx-auto w-fit inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all duration-300">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff7a30_0%,#ff9d5c_50%,#ff7a30_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF7A30] group-hover:to-[#FEC72F] group-hover:text-black">
                      Download Resume
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-screen">
            <div className="relative flex justify-center w-full" style={{ height: '300px', position: 'relative' }}>
              <Aurora
                colorStops={["#793c1b", "#ff7a30", "#793c1b"]}
                amplitude={0.4}
                blend={0.5}
              />
            </div>
          </div>
        </section>
        <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="1200" data-aos-easing="ease-out-cubic" id="what-do-i-do">
          <WhatIDoBentoSection glowColor="36, 161, 72" spotlightRadius={300} particleCount={14} enableSpotlight enableParticles enableTilt={false} enableMagnetism={false} clickEffect enableBorderGlow />
        </div>
        {/* <section id="about-me" className=" relative z-20 pt-32 max-[769px]:pt-10" >
          <div className="container px-0" style={{ padding: "0" }} data-aos="fade-up" data-aos-delay="400" data-aos-duration="1100" data-aos-easing="ease-out-cubic">
            <div className="py-16 rounded-[48px] max-[991px]:rounded-3xl px-20 max-[991px]:px-10 max-[769px]:py-8 max-[640px]:px-4" style={{ background: "linear-gradient(90deg, #040025 0%, #2E1100 100%)" }}>
              <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold">Here’s something about me!</h2>
              <div className="flex items-center gap-5 mt-12 max-[769px]:flex-col">
                <div className="w-full h-full max-w-[23.75rem] min-h-[12.5rem] max-[640px]:min-h-[10rem] relative">
                 
                  <style jsx>{`
                    @keyframes tiltLayerA {0%,100%{transform:rotate(-6deg) translate3d(0,0,0);}50%{transform:rotate(6deg)}}
                    @keyframes tiltLayerB {0%,100%{transform:rotate(6deg) translate3d(0,0,0);}50%{transform:rotate(-6deg);}}
                    .tilt-layer {will-change: transform; animation-duration:3.2s; animation-timing-function: cubic-bezier(.65,.05,.36,1); animation-iteration-count: infinite; animation-direction: alternate;}
                    .tilt-layer.a {animation-name: tiltLayerA;}
                    .tilt-layer.b {animation-name: tiltLayerB;}
                    @media (prefers-reduced-motion: reduce){ .tilt-layer { animation: none; } }
                  `}</style>
                  <div className="tilt-layer a absolute w-full h-full top-0 left-0 rounded-[4.875rem] max-[640px]:rounded-[3rem] bg-[#74747433]" />
                  <div className="tilt-layer b absolute w-full h-full top-0 left-0 rounded-[4.875rem] max-[640px]:rounded-[3rem] bg-[#74747433]" />
                  <div className="bg-[#74747433] rounded-[4.875rem] p-6 w-full h-full min-h-[200px] max-[640px]:min-h-[10rem] max-[640px]:rounded-[3rem] flex flex-col justify-center items-center">
                    <p className="text-5xl text-right max-[991px]:text-3xl" style={{ fontFamily: "var(--font-light-airy)" }}>Product designer</p>
                    <p className="text-3xl text-right max-[991px]:text-xl">and i am <span className="line-through">ironman</span></p>
                    <ChevronUp />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-2xl max-[991px]:text-xl">
                    I'm a self-taught product designer specializing in creating user-centric solutions. I thrive at tackling challenges and swiftly understanding intricate concepts to achieve impactful design outcomes.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section id="case-studies" className="pt-40 max-[991px]:pt-20" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <div className="container">
            <h2 className="text-[3.5rem] leading-[100%] max-[991px]:text-4xl font-bold">Case Studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              {workItems.map(item => (
                <TiltCard
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(item.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(item.id); } }}
                  aria-label={`Open full view for ${item.alt}`}
                  className="group relative block w-full rounded-3xl mt-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 [perspective:1200px] transition-shadow duration-300 ease-out hover:shadow-[0_8px_40px_-4px_rgba(255,255,255,0.25)]"
                  enableTilt
                  enableMagnetism
                  clickEffect
                  glowColor="255,122,48"
                >
                  <div className="rounded-4xl max-[640px]:rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 transition-transform duration-300 group-hover:scale-[1.015]">
                    <Image
                      src={item.thumb}
                      alt={item.alt}
                      width={1920}
                      height={400}
                      className="w-full h-full object-cover rounded-3xl max-[640px]:rounded-lg select-none pointer-events-none"
                    />
                  </div>
                  {/* Top-right external/open icon indicator */}
                  <div
                    className="pointer-events-none absolute top-5 right-5 opacity-0 max-[640px]:opacity-100 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <div className="rounded-full bg-black/50 backdrop-blur-sm p-3 shadow-lg shadow-black/30 ring-1 ring-white/15">
                      <SquareArrowOutUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
        {/* Work preview dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="min-lg:max-w-[1200px] sm:max-w-[1200px] max-w-full w-full border-none bg-[#111]/90 backdrop-blur-md p-0 rounded-2xl shadow-2xl"
            showCloseButton
          >
            {activeItem && (
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between gap-4">
                  <DialogTitle className="text-2xl px-4 py-1 font-semibold ">{activeItem.alt}</DialogTitle>
                </div>
                <div
                  ref={scrollRef}
                  className="relative w-full max-h-[85vh] overflow-auto rounded-lg  scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-gutter-stable"
                  aria-busy={!imageLoaded}
                >
                  {/* Reserved spacer to reduce layout shift (approx proportion) */}
                  {/* <div className={`w-full transition-[max-height] duration-300 ease-out ${imageLoaded ? 'max-h-0' : 'max-h-[1400px]'}`}>
                    <div className="w-full aspect-[9/28] pointer-events-none select-none opacity-0" />
                  </div> */}
                  {/* Loader overlay */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#111]/80 backdrop-blur-sm rounded-md">
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-400 animate-spin" />
                      </div>
                      <p className="text-xs tracking-wider uppercase text-white/60">Loading artwork…</p>
                    </div>
                  )}
                  {/* Tall image */}
                  <Image
                    src={activeItem.full}
                    alt={activeItem.alt}
                    width={1600}
                    height={3200}
                    className={`w-full h-auto object-contain select-none will-change-transform transition-[opacity,transform] duration-600 ease-[cubic-bezier(.4,.25,.3,1)] ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                {/* <div className="flex w-full justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                    aria-label="Previous work"
                  >Prev</button>
                  <div className="flex justify-center gap-2 flex-wrap pt-2">
                    {workItems.map(w => (
                      <button
                        key={w.id}
                        onClick={() => setActiveId(w.id)}
                        className={`h-2 w-6 rounded-full transition-colors ${w.id === activeId ? 'bg-orange-500' : 'bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Show ${w.alt}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                    aria-label="Next work"
                  >Next</button>
                </div> */}
              </div>
            )}
          </DialogContent>
        </Dialog>
        <div id="ui-works" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <UIWorksGallerySection glowColor="255, 122, 48" spotlightRadius={260} enableTilt enableMagnetism enableSpotlight enableBorderGlow particleCount={30} />
        </div>
        <div id="creative-breaks" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <CreativeBreaksSection />
        </div>
        <div id="community" data-aos="fade-up" data-aos-delay="700" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <CommunityGallerySection />
        </div>

        <div data-aos="fade-up" data-aos-delay="260" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <TestimonialsSection />
        </div>
        <footer className="pt-40 max-[991px]:pt-20" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
          <div className="container">
            {/* Gradient border wrapper */}
            <div className="relative rounded-4xl p-px bg-gradient-to-b from-[#FF7A30] to-[#FEC72F]">
              {/* Inner panel */}
              <div className="flex items-center rounded-4xl bg-[#242424] backdrop-blur-sm py-20 px-14 max-[769px]:py-10 max-[640px]:px-8 gap-8 max-[640px]:flex-col">
                <div className="w-full">
                  <p className="text-[2.5rem] leading-[100%] max-[769px]:text-3xl">Every conversation starts with a <span className="text-[6rem] leading-[100%] max-[769px]:text-5xl">hello.</span></p>
                </div>
                <div className="w-full flex flex-col gap-4 items-end justify-center max-[640px]:w-full">
                  <div className="w-full max-w-[300px]">
                    <div className=" bg-[#FFFFFF1A] rounded-2xl flex w-full justify-evenly mx-auto items-center gap-4 px-4 py-2">
                      <Link href="mailto:princeladislas@gmail.com" target="_blank" className="">
                        <Image
                          src="/assets/images/gmail.png"
                          alt="Gmail Icon"
                          width={40}
                          height={40}
                          className="w-full h-auto max-w-[30px] "
                        />
                      </Link>
                      <div className="bg-[#FFFFFF40] w-[1px] h-7" />
                      <Link href="https://www.instagram.com/anto__designs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="">
                        <Image
                          src="/assets/images/instagram.png"
                          alt="Instagram Icon"
                          width={40}
                          height={40}
                          className="w-full h-auto max-w-[30px] "
                        />
                      </Link>
                      <div className="bg-[#FFFFFF40] w-[1px] h-7" />
                      <Link href="https://www.linkedin.com/in/prince-ladislas/" target="_blank" className="">
                        <Image
                          src="/assets/images/linkedin.png"
                          alt="LinkedIn Icon"
                          width={40}
                          height={40}
                          className="w-full h-auto max-w-[30px] "
                        />
                      </Link>
                    </div>
                  </div>
                  <Link href="https://forms.gle/GUYL1qWKesVqbmPi7" target='_blank' className="bg-white text-black py-2 px-4 rounded-full w-full max-w-[300px] font-semibold text-center">Let's chat</Link>

                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
