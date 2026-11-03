import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { storeConfig } from "@/config/store";
import { navLinks } from "@/config/navigation";
import { categories } from "@/data/categories";
import { buildGreetingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import Stars from "@/components/Stars";
import { FacebookIcon, InstagramIcon} from "@/components/SocialIcons";

const socials = [
  { href: storeConfig.social.instagram, label: "إنستغرام", icon: InstagramIcon },
  { href: storeConfig.social.facebook, label: "فيسبوك", icon: FacebookIcon },
  // { href: storeConfig.social.x, label: "إكس", icon: XIcon },
  // { href: storeConfig.social.youtube, label: "يوتيوب", icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-deep text-cream/75">
      <Stars count={18} className="opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/60 to-transparent"
      />

      <div className="shell relative grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* نبذة */}
        <div>
          <div className="flex items-center gap-3">
            <span className="relative block size-14 shrink-0 overflow-hidden rounded-2xl bg-primary-deep shadow-gold ring-1 ring-gold/60">
              <Image
                src="/images/logo.jpeg"
                alt="شعار مكتبة طيف"
                width={1070}
                height={1070}
                className="size-full object-contain"
                loading="lazy"
              />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-cream">{storeConfig.name}</p>
              <p className="text-[11px] tracking-[0.24em] text-gold">{storeConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-cream/60">
            مكتبة عربية مستقلة نختار لكم أجمل الإصدارات في الأدب والفكر والعلم،
            ونوصلها إلى باب بيتكم بطلب بسيط عبر واتساب.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-primary"
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* روابط سريعة */}
        <nav aria-label="روابط سريعة">
          <h3 className="font-display text-base font-extrabold text-cream">روابط سريعة</h3>
          <span aria-hidden="true" className="mt-2.5 block h-px w-10 bg-gold/70" />
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm lg:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-gold-light"
                >
                  <span aria-hidden="true" className="size-1 rotate-45 bg-gold/70" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* التصنيفات */}
        <nav aria-label="تصنيفات الكتب">
          <h3 className="font-display text-base font-extrabold text-cream">تصنيفات الكتب</h3>
          <span aria-hidden="true" className="mt-2.5 block h-px w-10 bg-gold/70" />
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm lg:grid-cols-1">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/explore/${category.slug}`}
                  className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-gold-light"
                >
                  <span aria-hidden="true" className="size-1 rotate-45 bg-gold/70" />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* تواصل معنا */}
        <div>
          <h3 className="font-display text-base font-extrabold text-cream">تواصل معنا</h3>
          <span aria-hidden="true" className="mt-2.5 block h-px w-10 bg-gold/70" />
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={`tel:${storeConfig.phoneRaw}`}
                className="flex items-start gap-3 transition-colors hover:text-gold-light"
              >
                <Phone className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
                <span dir="ltr">{storeConfig.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl(buildGreetingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-gold-light"
              >
                <MessageCircle className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
                اطلب أو استفسر عبر واتساب
              </a>
            </li>
            <li>
              <a
                href={`mailto:${storeConfig.email}`}
                className="flex items-start gap-3 transition-colors hover:text-gold-light"
              >
                <Mail className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
                <span dir="ltr">{storeConfig.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
              {storeConfig.address} — {storeConfig.city}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
              {storeConfig.workingHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-cream/50 sm:flex-row">
          <p>© {new Date(2025, 0, 1).getFullYear()} {storeConfig.name} — جميع الحقوق محفوظة.</p>
          <p className="inline-flex items-center gap-1.5">
            <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
            الطلب والتأكيد النهائي يتمان حصرياً عبر واتساب — لا حاجة لأي حساب أو تسجيل
          </p>
        </div>
      </div>
    </footer>
  );
}
