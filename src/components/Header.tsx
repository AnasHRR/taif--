"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, Search, ShoppingBasket, Truck, X } from "lucide-react";
import { storeConfig } from "@/config/store";
import { navLinks } from "@/config/navigation";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "@/hooks/useCart";
import { cx } from "@/lib/utils";
import HeaderSearch from "@/components/HeaderSearch";

function isLinkActive(href: string, pathname: string, altPaths: string[] = []): boolean {
  if (href.includes("?")) return false;
  if (href === "/") return pathname === "/";
  // مع rewrites قد يعيد usePathname المسار الداخلي، فنفحص الرابط العام ووجهته الداخلية معاً
  const bases = [href, ...altPaths];
  return bases.some((base) => pathname === base || pathname.startsWith(`${base}/`));
}

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // إغلاق قائمة الجوال عند تغيّر الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* الشريط العلوي الرفيع */}
      <div className="relative z-50 bg-primary-deep text-cream/85">
        <div className="shell flex items-center justify-between gap-4 py-2 text-[11px] sm:text-xs">
          <a
            href={`tel:${storeConfig.phoneRaw}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-light"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            <span dir="ltr">{storeConfig.phoneDisplay}</span>
          </a>
          <p className="hidden items-center gap-1.5 sm:inline-flex">
            <Truck className="size-3.5 text-gold" aria-hidden="true" />
            توصيل لجميع المدن — تأكيد الطلب والدفع عبر واتساب
          </p>
          <a
            href={getWhatsAppUrl(buildGreetingMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold-light transition-colors hover:text-gold"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            راسلنا الآن
          </a>
        </div>
      </div>

      {/* الترويسة الرئيسية */}
      <header
        className={cx(
          "sticky top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-primary/10 bg-cream/90 shadow-card backdrop-blur-xl"
            : "border-transparent bg-cream",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          {/* الشعار */}
          <Link
            href="/"
            className="group flex items-center gap-3 outline-none"
            aria-label="مكتبة طيف (Phantom Library) — الصفحة الرئيسية"
          >
            <span className="relative block size-11 shrink-0 overflow-hidden rounded-2xl bg-primary-deep shadow-gold ring-1 ring-gold/60 transition-transform duration-300 group-hover:scale-105 sm:size-14">
              <Image
                src="/images/logo.jpeg"
                alt="شعار مكتبة طيف — Phantom Library"
                width={1070}
                height={1070}
                className="size-full object-contain"
                priority
              />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-xl font-black text-primary transition-colors group-hover:text-secondary sm:text-2xl">
                {storeConfig.name}
              </span>
              <span className="hidden text-[10px] font-medium tracking-[0.22em] text-gold-deep sm:block">
                بيــن الــنــجــوم تـــولـــد الــحــكــايــات
              </span>
            </span>
          </Link>

          {/* روابط سطح المكتب */}
          <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, pathname, link.altPaths);
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className={cx(
                        "relative rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors duration-300",
                        active ? "text-secondary" : "text-ink/75 hover:text-primary",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cx(
                          "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* الإجراءات */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full text-ink/80 transition-all duration-300 hover:bg-primary hover:text-cream sm:size-11"
              aria-label="فتح البحث"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-full text-ink/80 transition-all duration-300 hover:bg-primary hover:text-cream sm:size-11"
              aria-label={`سلة المشتريات — ${count} عناصر`}
            >
              <ShoppingBasket className="size-5" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -end-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-gold px-1 font-display text-[11px] font-black text-primary shadow-gold ring-2 ring-cream">
                  {count}
                </span>
              ) : null}
            </button>

            <a
              href={getWhatsAppUrl(buildGreetingMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 place-items-center rounded-full border border-[#25d366]/40 text-[#128050] transition-all duration-300 hover:bg-[#25d366] hover:text-white sm:grid sm:size-11"
              aria-label="تواصل عبر واتساب"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full text-ink/80 transition-all duration-300 hover:bg-primary hover:text-cream lg:hidden"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* قائمة الجوال */}
        <div
          className={cx(
            "grid overflow-hidden border-primary/10 bg-cream/95 backdrop-blur-xl transition-all duration-500 ease-out lg:hidden",
            menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
          )}
        >
          <nav aria-label="قائمة الجوال" className="min-h-0">
            <ul className="shell space-y-1 py-4">
              {navLinks.map((link, index) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cx(
                      "flex items-center justify-between rounded-2xl px-4 py-3 font-display text-base font-bold transition-colors",
                      isLinkActive(link.href, pathname, link.altPaths)
                        ? "bg-primary text-cream"
                        : "text-ink/80 hover:bg-sand hover:text-primary",
                    )}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-xs text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={getWhatsAppUrl(buildGreetingMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-4 py-3.5 font-display font-bold text-white shadow-card"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  تواصل معنا عبر واتساب
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <HeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
