/** روابط التنقل الرئيسية المشتركة بين الترويسة والتذييل */
export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/books", label: "جميع الكتب" },
  { href: "/categories", label: "التصنيفات" },
  { href: "/books?filter=new", label: "الكتب الجديدة" },
  { href: "/books?filter=offers", label: "العروض" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];
