import type { NextConfig } from "next";

/**
 * مكتبة طيف — Taif Library
 * ---------------------------------------------
 * This project is a 100% static frontend. There is no database,
 * no API and no server runtime dependency.
 *
 * To generate a fully static site (deployable to Netlify / Vercel /
 * GitHub Pages), run:
 *
 *     NEXT_OUTPUT=export npm run build
 *
 * The static files will be emitted to the `out/` directory.
 *
 * During local preview the app builds as a regular Next.js build so the
 * platform health checks keep working — all pages are still pre-rendered
 * at build time (SSG) and no dynamic server feature is used anywhere.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  // Enable `output: "export"` for static hosting builds.
  output: isStaticExport ? "export" : undefined,
  // Static hosts (e.g. GitHub Pages) resolve directories better with trailing slashes.
  trailingSlash: isStaticExport,
  // `next/image` without the optimization server — required for static export.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
