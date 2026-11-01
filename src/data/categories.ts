/**
 * تصنيفات الكتب — بيانات ثابتة محلية.
 */
export interface CategoryPalette {
  /** لون بداية التدرج لغلاف الكتاب وبطاقة التصنيف */
  from: string;
  /** لون نهاية التدرج */
  to: string;
}

export interface Category {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  palette: CategoryPalette;
}

export const categories: Category[] = [
  {
    slug: "novels",
    name: "الروايات والقصص",
    shortDescription: "أعمال أدبية عربية وعالمية تأخذك إلى عوالم لا تنتهي.",
    description:
      "من كلاسيكيات الأدب العربي إلى أجمل الروايات المعاصرة الحائزة على الجوائز، مختارات قصصية تأسر القلب والعقل.",
    palette: { from: "#3b1748", to: "#6a2b63" },
  },
  {
    slug: "self-development",
    name: "التنمية البشرية",
    shortDescription: "كتب تطوير الذات وبناء العادات وتنظيم الحياة.",
    description:
      "أشهر كتب تطوير الذات وبناء العادات الإيجابية، بترجمات عربية دقيقة تساعدك على صناعة نسخة أفضل منك كل يوم.",
    palette: { from: "#5b3a17", to: "#8a5a2b" },
  },
  {
    slug: "religion",
    name: "الكتب الدينية",
    shortDescription: "سيرة نبوية، إيمانيات، وكتب روحانية نافعة.",
    description:
      "مكتبة من الكتب الدينية النقية: السيرة النبوية العطرة، الإيمانيات المعاصرة، وكتب تربي الروح والوجدان.",
    palette: { from: "#0e3a32", to: "#1c5a4c" },
  },
  {
    slug: "history",
    name: "التاريخ والحضارة",
    shortDescription: "حضارات الأمم وقصص التاريخ كما لم تقرأها من قبل.",
    description:
      "رحلات عبر الزمن مع أمهات كتب التاريخ: من مقدمة ابن خلدون إلى حضارات العرب والأندلس وقصص الأمم الغابرة.",
    palette: { from: "#472a17", to: "#7a4e2b" },
  },
  {
    slug: "philosophy",
    name: "الفلسفة والفكر",
    shortDescription: "أسئلة الوجود والمعنى عند أعظم الفلاسفة.",
    description:
      "مداخل إلى الفلسفة وأعمق نصوصها: أفلاطون وكانط ونيتشه وغيرهم، بترجمات عربية موثوقة تفتح نوافذ التفكير.",
    palette: { from: "#1a2140", to: "#37427a" },
  },
  {
    slug: "science",
    name: "العلوم والمعرفة",
    shortDescription: "الكون والفيزياء والحياة بلغة يفهمها الجميع.",
    description:
      "كتب التبسيط العلمي الأشهر عالمياً: الكون والزمن والتطور، ترجمات سلسة تجعل العلم متعة لا تُقاوَم.",
    palette: { from: "#0d2b3e", to: "#155e75" },
  },
  {
    slug: "kids",
    name: "كتب الأطفال",
    shortDescription: "حكايات ممتعة وقيم جميلة تناسب الصغار.",
    description:
      "حكايات وقصص مصورة تحبّب أطفالك في القراءة، وتزرع فيهم القيم الجميلة وحب المعرفة منذ الصغر.",
    palette: { from: "#5e1f4b", to: "#a23e77" },
  },
  {
    slug: "languages",
    name: "اللغات",
    shortDescription: "تعلّم اللغات الأجنبية خطوة بخطوة وبأسلوب مبسط.",
    description:
      "كتب وقواعد مبسطة لتعلّم الإنجليزية والفرنسية وغيرها، مناهج عملية تأخذ بيدك من الصفر حتى الطلاقة.",
    palette: { from: "#2b3a22", to: "#4c6442" },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
