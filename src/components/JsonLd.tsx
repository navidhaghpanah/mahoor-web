import { SITE, SITE_URL } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: SITE.name,
    alternateName: SITE.legalName,
    description: SITE.description,
    url: SITE_URL,
    image: `${SITE_URL}${SITE.logoPath}`,
    logo: `${SITE_URL}${SITE.logoPath}`,
    telephone: SITE.telephoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان امام، بعد از نسیم ۶۹/۱",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: SITE.hoursOpens,
      closes: SITE.hoursCloses,
    },
    areaServed: {
      "@type": "City",
      name: "محمودآباد",
    },
    sameAs: [SITE.instagram, SITE.telegram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
