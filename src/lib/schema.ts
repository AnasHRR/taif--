import { storeConfig } from "@/config/store";
import type { Book } from "@/data/books";

/**
 * أدوات إنشاء بيانات Schema.org بصيغة JSON-LD المعيارية
 * متوافقة مع متطلبات محركات البحث واختبار النتائج الغنية من Google.
 */

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${storeConfig.siteUrl}/#website`,
    name: storeConfig.name,
    alternateName: storeConfig.nameLatin,
    url: storeConfig.siteUrl,
    description: "مكتبة لاكتشاف الكتب والروايات وتنظيم عالم القراءة.",
    inLanguage: ["ar", "en"],
    publisher: {
      "@id": `${storeConfig.siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${storeConfig.siteUrl}/books?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BookStore",
    "@id": `${storeConfig.siteUrl}/#organization`,
    name: storeConfig.name,
    alternateName: storeConfig.nameLatin,
    url: storeConfig.siteUrl,
    logo: `${storeConfig.siteUrl}/images/logo.jpeg`,
    image: `${storeConfig.siteUrl}/images/banners/hero.jpeg`,
    description: "مكتبة لاكتشاف الكتب والروايات وتنظيم عالم القراءة.",
    telephone: storeConfig.phoneDisplay,
    email: storeConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeConfig.address,
      addressLocality: "فاس",
      addressCountry: "MA",
    },
    priceRange: "DH",
    currenciesAccepted: storeConfig.currency.code,
    sameAs: [
      storeConfig.social.instagram,
      storeConfig.social.facebook,
    ].filter(Boolean),
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isAbsolute = item.url?.startsWith("http");
      const fullUrl = item.url
        ? isAbsolute
          ? item.url
          : `${storeConfig.siteUrl}${item.url.startsWith("/") ? item.url : `/${item.url}`}`
        : undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(fullUrl ? { item: fullUrl } : {}),
      };
    }),
  };
}

export function getBookSchema(book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${storeConfig.siteUrl}/books/${book.slug}#book`,
    name: book.title,
    url: `${storeConfig.siteUrl}/books/${book.slug}`,
    description: book.description,
    author: {
      "@type": "Person",
      name: book.author,
    },
    inLanguage: "ar",
    ...(book.pages && book.pages > 0 ? { numberOfPages: book.pages } : {}),
    ...(book.year && book.year > 0 ? { datePublished: String(book.year) } : {}),
    ...(book.publisher ? { publisher: { "@type": "Organization", name: book.publisher } } : {}),
    image: `${storeConfig.siteUrl}/images/banners/hero.jpeg`,
    offers: {
      "@type": "Offer",
      price: book.price,
      priceCurrency: storeConfig.currency.code,
      availability: book.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${storeConfig.siteUrl}/books/${book.slug}`,
      seller: {
        "@id": `${storeConfig.siteUrl}/#organization`,
      },
    },
    ...(book.rating && book.rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: book.rating,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 1,
          },
        }
      : {}),
  };
}
