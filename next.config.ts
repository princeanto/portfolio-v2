import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,

  /* The redesign used to live at /v2, and the community works had their own
     pages. Both are gone now, so keep the old URLs alive rather than 404ing
     anything already shared. */
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/community-works", destination: "/", permanent: true },
      { source: "/community-works/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
