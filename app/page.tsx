'use client';
import React from 'react';
import './v2.css';
import { ThemeProvider } from './_components/theme';
import Header from './_components/header';
import Hero from './_components/hero';
import Work from './_components/work';
import { UiWorks, Play, Community, CommunityWorks } from './_components/galleries';
import AiPlayground from './_components/ai-playground';
import About from './_components/about';
import Testimonials from './_components/testimonials';
import Contact from './_components/contact';

export default function V2Page() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Work />
        <UiWorks />
        <AiPlayground />
        <Play />
        <About />
        <Community />
        <CommunityWorks />
        <Testimonials />
        <Contact />
      </main>
    </ThemeProvider>
  );
}
