import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/agents",
    "/properties",
    "/search",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/properties" || path === "/search" ? 0.9 : 0.7,
  }));

  let listingRoutes: MetadataRoute.Sitemap = [];
  try {
    const listings = await prisma.property.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, createdAt: true },
    });
    listingRoutes = listings.map((listing) => ({
      url: `${SITE_URL}/properties/${listing.id}`,
      lastModified: listing.createdAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // Build or runtime without a live DB still ships public static routes.
  }

  return [...staticRoutes, ...listingRoutes];
}
