/** روابط التنقل الرئيسية المشتركة بين الترويسة والتذييل */
export interface NavLink {
  href: string;
  label: string;
  /**
   * المسارات الداخلية التي يعاد توجيه الروابط العامة إليها عبر rewrites في next.config.ts.
   * تُستخدم لتحديد الرابط النشط لأن usePathname قد يعيد بعد التنقّل مسار الوجهة الداخلية.
   */
  altPaths?: string[];
}

export const navLinks: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/library", label: "جميع الكتب", altPaths: ["/books"] },
  { href: "/explore", label: "التصنيفات", altPaths: ["/categories"] },
  { href: "/new-arrivals", label: "الكتب الجديدة" },
  { href: "/special-offers", label: "العروض" },
  { href: "/our-story", label: "من نحن", altPaths: ["/about"] },
  { href: "/get-in-touch", label: "اتصل بنا", altPaths: ["/contact"] },
];
