# مكتبة طيف — Taif Library

مكتبة عربية فاخرة بالكامل **بدون خادم وبدون قاعدة بيانات** — موقع ثابت (Static) لعرض الكتب واستقبال الطلبات عبر **واتساب فقط**.

A fully static, RTL Arabic bookstore built with Next.js, TypeScript and Tailwind CSS. No database, no APIs, no authentication — orders are composed client-side and sent through WhatsApp.

## التقنيات

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + Lucide React icons
- **React Server Components** افتراضياً؛ مكوّنات العميل فقط عند الحاجة (السلة، البحث، النماذج)
- خطوط **Cairo** و**Tajawal** مضمّنة محلياً عبر Fontsource (لا طلبات خارجية)
- أغلفة الكتب مرسومة برمجياً (CSS/SVG) بهوية كل تصنيف

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:3000
```

## البناء للمعاينة العادية

```bash
npm run build
npm start
```

## البناء الثابت الكامل (Static Export)

للنشر على **Netlify / Vercel Static / GitHub Pages**:

```bash
NEXT_OUTPUT=export npm run build
```

سيتم توليد الموقع بالكامل في مجلد **`out/`** — ارفعه لأي استضافة ثابتة مباشرة.

## التخصيص

| ماذا تريد أن تغيّر؟ | أين؟ |
| --- | --- |
| رقم الواتساب، الهاتف، البريد، العنوان، الروابط الاجتماعية | `src/config/store.ts` |
| روابط التنقل | `src/config/navigation.ts` |
| إضافة/تعديل الكتب | `src/data/books.ts` |
| التصنيفات وألوانها | `src/data/categories.ts` |
| صيغة رسالة الطلب | `src/lib/whatsapp.ts` |

> ⚠️ رقم الواتساب الحالي **رقم مؤقت** (`212600000000`) — استبدله بالرقم الحقيقي بالصيغة الدولية بدون `+` في `src/config/store.ts`.

## كيف يعمل الطلب؟

1. الزائر يضيف كتباً إلى السلة (تُحفظ في `localStorage` على جهازه فقط).
2. في صفحة السلة يملأ: الاسم، رقم الهاتف، المدينة، والعنوان/الملاحظات اختيارياً.
3. عند الضغط على «إرسال الطلب عبر واتساب» تُبنى رسالة عربية منسقة ويُفتح `wa.me` في نافذة جديدة.
4. **التأكيد النهائي للطلب يتم داخل واتساب** — لا تُخزَّن أي بيانات على أي خادم.

## بنية المشروع

```
src/
  app/            # الصفحات (RSC + SSG مع generateStaticParams)
  components/     # مكوّنات الواجهة
  context/        # سلة المشتريات (React Context + localStorage)
  hooks/          # useCart
  data/           # الكتب والتصنيفات (بيانات ثابتة محلية)
  config/         # إعدادات المتجر والتنقل
  lib/            # أدوات واتساب وأدوات مساعدة
public/images/    # الشعار والصور
```
