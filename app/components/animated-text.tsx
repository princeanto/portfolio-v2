'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;
  className?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  highlightText = '',
  highlightColor = 'from-[#FF7A30] to-[#FEC72F]',
  className = '',
  delay = 0,
}) => {
  // Split text by the highlight text
  const parts = text.split(new RegExp(`(${highlightText})`));

  // Animation variants for each character
  const charVariants: any = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: delay + i * 0.03,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // custom easing
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Split each part into individual characters
  let charIndex = 0;

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {parts.map((part, partIndex) => {
        const isHighlight = part === highlightText;
        return (
          <motion.span
            key={partIndex}
            className={isHighlight ? `font-bold bg-gradient-to-r ${highlightColor} bg-clip-text text-transparent` : ''}
            style={isHighlight ? { display: 'inline-block' } : {}}
          >
            {part.split('').map((char, charIndexInPart) => {
              const currentIndex = charIndex;
              charIndex++;

              return (
                <motion.span
                  key={`${partIndex}-${charIndexInPart}`}
                  custom={currentIndex}
                  variants={charVariants}
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

export default AnimatedText;
