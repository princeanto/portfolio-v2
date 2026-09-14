'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export interface AnimatedMenuProps {
  position?: 'left' | 'right';
  items?: Array<{ label: string; ariaLabel: string; link: string }>;
  socialItems?: Array<{ label: string; link: string }>;
  displaySocials?: boolean;
  logoUrl?: string;
  accentColor?: string;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const AnimatedMenu: React.FC<AnimatedMenuProps> = ({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  logoUrl = '/assets/images/logo.png',
  accentColor = '#FF7A30',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isOpen) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    onMenuClose?.();
  };

  // Handle scroll to add/remove background
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!closeOnClickAway || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, isOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants: Variants = {
    hidden: {
      x: position === 'right' ? 500 : -500,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
    exit: {
      x: position === 'right' ? 500 : -500,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hamburgerVariants: Variants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 0,
    },
  };

  const topLineVariants: Variants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 2,
    },
  };

  const bottomLineVariants: Variants = {
    closed: {
      rotate: 0,
      y: 8,
    },
    open: {
      rotate: -45,
      y: 0,
    },
  };

  return (
    <div
      className={`animated-menu-scope z-[999] h-22 ${
        isFixed ? 'fixed top-0 left-0 w-screen overflow-hidden' : 'relative w-full h-full'
      }`}
    >
      {/* Header with Logo and Menu Toggle */}
      <motion.header 
        className={`absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-5 max-[769px]:p-2 z-[999] pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'bg-black/60 backdrop-blur-2xl' : 'bg-transparent'
        }`}
        animate={isScrolled ? { backdropFilter: 'blur(16px)' } : { backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            width={60}
            height={60}
            src={logoUrl}
            alt="Logo"
            loading='eager'
            className="h-auto w-full max-w-[60px] max-[769px]:p-2"
          />
        </Link>

        {/* Menu Toggle Button */}
        <motion.button
          ref={menuRef}
          onClick={handleToggle}
          className="flex flex-col items-center justify-center w-20 mr-5 max-[769px]:mr-2 max-[769px]:w-10 h-10 bg-transparent border-0 cursor-pointer p-0 relative z-[999] pointer-events-auto"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {/* Top Line */}
          <motion.span
            className="block w-10 max-[769px]:w-5 h-0.5 bg-white rounded-full"
            style={{ originX: 0.5, originY: 0.5 }}
            variants={topLineVariants}
            animate={isOpen ? 'open' : 'closed'}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom Line */}
          <motion.span
            className="block w-10 max-[769px]:w-5 h-0.5 bg-white rounded-full"
            style={{ originX: 0.5, originY: 0.5 }}
            variants={bottomLineVariants}
            animate={isOpen ? 'open' : 'closed'}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.header>

      {/* Menu Panel with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[997]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.aside
              ref={panelRef}
              className={`fixed top-0 ${
                position === 'right' ? 'right-0' : 'left-0'
              } h-screen w-full max-w-md bg-black/90 backdrop-blur-xl z-[998] flex flex-col p-6 pt-24 overflow-y-auto`}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Menu Items */}
              {items && items.length > 0 && (
                <motion.nav
                  className="flex-1 flex flex-col gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      transition={{ duration: 0.4 }}
                    >
                      <a
                        href={item.link}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClose();
                          
                          // Check if it's an anchor link or a page link
                          if (item.link.startsWith('#')) {
                            // Anchor link - scroll to element
                            const targetId = item.link.replace('#', '');
                            const element = document.getElementById(targetId);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            // Page link - navigate using window.location
                            window.location.href = item.link;
                          }
                        }}
                        className="text-4xl font-bold uppercase tracking-tight hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                        style={{
                          color: accentColor,
                          textDecoration: 'none',
                        }}
                        aria-label={item.ariaLabel}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                </motion.nav>
              )}

              {/* Social Links */}
              {displaySocials && socialItems && socialItems.length > 0 && (
                <motion.div
                  className="flex flex-col gap-4 mt-auto pt-8 border-t border-white/10"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3,
                        duration: 0.4,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <h3
                    className="text-sm font-semibold uppercase tracking-wide opacity-60"
                    style={{ color: accentColor }}
                  >
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {socialItems.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:opacity-70 transition-opacity duration-200"
                        style={{ color: accentColor }}
                        variants={itemVariants}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {social.label}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedMenu;
