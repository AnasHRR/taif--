const quotes = [
  { text: "خيرُ جليسٍ في الزمانِ كتابُ", author: "المتنبي" },
  { text: "العقلُ ليس وعاءً يُملأ، بل نارٌ تُوقَد", author: "بلوتارخ" },
  { text: "القراءة للعقل مثل الرياضة للجسد", author: "ريتشارد ستيل" },
  { text: "الكتب مرايا: لا ترى فيها إلا ما بداخلك", author: "كارلوس زافون" },
  { text: "لا توجد صداقة أوفى من كتاب", author: "إرنست همنغواي" },
  { text: "الكتاب مزرعةٌ تحملها في جيبك", author: "مثل عربي" },
];

/** شريط اقتباسات متحرك عن القراءة */
export default function QuoteMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-primary py-4" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-primary to-transparent" />
      <div dir="ltr" className="flex w-max animate-marquee gap-14">
        {[...quotes, ...quotes].map((quote, index) => (
          <p key={index} dir="rtl" className="flex shrink-0 items-baseline gap-2.5 whitespace-nowrap">
            <span className="size-1.5 shrink-0 rotate-45 self-center bg-gold" />
            <span className="font-display text-sm font-bold text-cream/90">«{quote.text}»</span>
            <span className="text-xs font-semibold text-gold-light/80">— {quote.author}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
