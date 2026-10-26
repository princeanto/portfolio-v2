'use client';
import { SITE_URL, abs } from '../_lib/site';

export default function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prince Ladislas',
    url: SITE_URL,
    image: abs('/assets/images/prince.png'),
    jobTitle: 'Senior Product Designer',
    email: 'princeladislas@gmail.com',
    sameAs: [
      'https://www.instagram.com/anto__designs',
      'https://www.linkedin.com/in/prince-ladislas/',
    ],
    description:
      'Senior product designer, 7 years in enterprise fintech. Led design for M2P Connect, an API orchestration platform, and a design system used by 10+ product teams and 150+ engineers.',
    knowsAbout: [
      'Product Design',
      'UI Design',
      'UX Design',
      'Web Design',
      'Mobile Design',
      'User Research',
      'Prototyping',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prince Portfolio',
    url: SITE_URL,
    logo: abs('/assets/images/logo.png'),
    description: 'Portfolio showcasing product design, UI/UX design, and creative work by Prince Ladislas.',
    sameAs: [
      'https://www.instagram.com/anto__designs',
      'https://www.linkedin.com/in/prince-ladislas/',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      email: 'princeladislas@gmail.com',
    },
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Prince Ladislas Portfolio',
    url: SITE_URL,
    description: 'Showcasing my work in product design, UI/UX design, and digital solutions.',
    image: [
      abs('/assets/images/prince.png'),
      abs('/assets/images/prince-hero-image.webp'),
    ],
    creator: {
      '@type': 'Person',
      name: 'Prince Ladislas',
    },
    dateModified: '2026-02-01',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
