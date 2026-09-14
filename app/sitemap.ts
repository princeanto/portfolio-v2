import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://princeladislas.vercel.app'

  const communityWorks = [
    { slug: 'mad-desgin-2023', title: 'MAD Design 2023' },
    { slug: 'chennai-meet-2022', title: 'Chennai Meet 2022' },
    { slug: 'hydrabad-meet', title: 'Hyderabad Meet' },
    { slug: 'kalaiyugam-2023', title: 'Kalaiyugam 2023' },
    { slug: 'hydrabad-meet-2024', title: 'Hyderabad Meet 2024' },
    { slug: 'design-system-workshop', title: 'Design System Workshop' },
  ]

  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#about-me`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#my-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#ui-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#creative-breaks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#community`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Community Works pages
    {
      url: `${baseUrl}/community-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Community Works sub-pages
    ...communityWorks.map((work) => ({
      url: `${baseUrl}/community-works/${work.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
