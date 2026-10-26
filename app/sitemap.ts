import { MetadataRoute } from 'next';
import { SITE_URL as baseUrl } from './_lib/site';
import { PROJECTS } from './_lib/data';

/* Only real, indexable URLs belong here. The old /community-works pages are
   gone and now redirect, so advertising them would point crawlers at 301s. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/platform-evolution/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    /* One case study page per project. Connect's lives at the route above, so
       it is not repeated here. */
    ...PROJECTS.filter(p => !p.route).map(p => ({
      url: `${baseUrl}/work/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...['work', 'ui', 'ai', 'about', 'community', 'contact'].map(id => ({
      url: `${baseUrl}/#${id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
