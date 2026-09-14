'use client';
import Link from 'next/link'
import React from 'react'
import GlassSurface from './glass-effect'
import Image from 'next/image';
import AnimatedMenu from './animated-menu';

export default function Header() {
    const menuItems = [
        { label: 'What do i do', ariaLabel: 'View my work portfolio', link: '#what-do-i-do' },
        { label: 'Case studies', ariaLabel: 'View my work portfolio', link: '#case-studies' },
        { label: 'UI Works', ariaLabel: 'View UI design works', link: '#ui-works' },
        { label: 'Creative Breaks', ariaLabel: 'Explore creative breaks', link: '#creative-breaks' },
        { label: 'Community Works', ariaLabel: 'View community works', link: '/community-works' }
    ];



    return (
        <AnimatedMenu
            position="right"
            items={menuItems}
            displaySocials={false}
            logoUrl="/assets/images/logo.png"
            accentColor="#FF7A30"
            isFixed={true}
            closeOnClickAway={true}
        />
    )
}
