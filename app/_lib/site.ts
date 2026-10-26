/*
  The one place the site's own address is written down.

  Every canonical signal has to agree on a single host: metadataBase, the
  canonical tag, Open Graph and Twitter URLs, the JSON-LD blocks, the sitemap
  and robots.txt. When they disagree, crawlers follow the canonical — so a
  wrong value here quietly removes the site from search.

  public/robots.txt is static and cannot import this; it is kept in step by
  hand. If this value changes, change that file too.
*/
export const SITE_URL = 'https://princeladislas.vercel.app';

/** Absolute URL for a path on this site, e.g. abs('/assets/x.png') */
export const abs = (path: string) => new URL(path, SITE_URL).toString();
