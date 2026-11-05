import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = storeConfig.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/api/",
          "/admin",
          "/dashboard",
          "/private",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/cart",
          "/api/",
          "/admin",
          "/dashboard",
          "/private",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
