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

  /**
   * روابط عامة أنيقة تعيد التوجيه داخلياً إلى الصفحات الحقيقية.
   *
   * الملاحظات:
   * - هذه "rewrites" وليس "redirects": شريط العنوان يعرض الرابط العام
   *   (/library، /explore ...) بينما تُعرض الصفحة الداخلية (/books، /categories...).
   * - باراميترات الاستعلام التي يضيفها الزائر (؟q= &filter= &category= ...) تُمرَّر
   *   كما هي في العنوان، لذا يظل البحث والفلاتر يعملان بعد إعادة التوجيه.
   * - صفحات /new-arrivals و /special-offers صفحات مستقلة حقيقية (لا rewrites) لأن
   *   باراميتر filter ثابت ولا يصل عبر إعادة التوجيه أثناء الترطيب في الصفحات المُسبقة
   *   العرض — راجع src/components/BooksBrowser.tsx.
   * - الصفحات الأصلية لا تزال متاحة عبر روابطها المباشرة (/books ...) —
   *   إعادة التوجيه تخفي الوجهة أثناء التنقّل لكنها ليست حماية أو تشفيراً.
   * - إعادة التوجيه لا تعمل عند التصدير الثابت (output: "export")؛ في هذه الحالة
   *   تُبنى الروابط المباشرة كصفحات مستقلة، أما التشغيل العادي (next build/start)
   *   فيستخدمها كما هي.
   */
  async rewrites() {
    return [
      { source: "/library", destination: "/books" },
      { source: "/library/:slug", destination: "/books/:slug" },
      { source: "/explore", destination: "/categories" },
      { source: "/explore/:slug", destination: "/categories/:slug" },
      { source: "/our-story", destination: "/about" },
      { source: "/get-in-touch", destination: "/contact" },
    ];
  },
};

export default nextConfig;
