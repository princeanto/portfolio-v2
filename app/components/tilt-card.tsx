"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  glowColor?: string; // used only for ripple color
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = false,
  glowColor = "255,122,48",
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(el, { rotateX, rotateY, duration: 0.15, ease: "power2.out", transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        gsap.to(el, { x: magnetX, y: magnetY, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.35, ease: "power2.out" });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxDistance * 2}px;height:${maxDistance * 2}px;left:${x - maxDistance}px;top:${y - maxDistance}px;border-radius:50%;pointer-events:none;background:radial-gradient(circle, rgba(${glowColor},0.35) 0%, rgba(${glowColor},0.15) 30%, transparent 70%);z-index:5;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple,{scale:0,opacity:1},{scale:1,opacity:0,duration:0.8,ease:"power2.out",onComplete:()=>ripple.remove()});
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleClick);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleClick);
    };
  }, [enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default TiltCard;
