import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/crm/", "/backend/"],
    },
    sitemap: `${process.env.BACKEND_URL}/sitemap.xml`,
  };
}
