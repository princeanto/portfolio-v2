'use client';

export default function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prince Ladislas',
    url: 'https://princeladislas1.vercel.app',
    image: 'https://princeladislas1.vercel.app/assets/images/prince.png',
    jobTitle: 'Product Designer',
    email: 'princeladislas@gmail.com',
    sameAs: [
      'https://www.instagram.com/anto__designs',
      'https://www.linkedin.com/in/prince-ladislas/',
    ],
    description: 'Product designer focused on creating intuitive and beautiful user experiences. Specializing in product design, UI/UX, and digital solutions.',
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
    url: 'https://princeladislas1.vercel.app',
    logo: 'https://princeladislas1.vercel.app/assets/images/logo.png',
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
    url: 'https://princeladislas1.vercel.app',
    description: 'Showcasing my work in product design, UI/UX design, and digital solutions.',
    image: [
      'https://princeladislas1.vercel.app/assets/images/prince.png',
      'https://princeladislas1.vercel.app/assets/images/prince-hero-image.webp',
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
