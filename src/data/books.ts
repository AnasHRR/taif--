/**
 * كتالوج الكتب — بيانات ثابتة محلية (بدون أي قاعدة بيانات أو خدمات خارجية).
 * أغلفة الكتب تُرسم برمجياً عبر مكوّن <BookCover /> بألوان مستوحاة من كل تصنيف.
 */
export interface Book {
  id: string;
  /** معرّف لاتيني نظيف لاستخدامه في روابط الصفحات */
  slug: string;
  title: string;
  author: string;
  /** slug التصنيف من src/data/categories.ts */
  category: string;
  /** السعر الحالي بالدرهم المغربي */
  price: number;
  /** السعر قبل الخصم (اختياري) */
  oldPrice?: number;
  description: string;
  pages: number;
  publisher: string;
  year: number;
  language: string;
  /** تقييم من 5 */
  rating: number;
  featured: boolean;
  isNew: boolean;
  available: boolean;
}

export const books: Book[] = [
  // ─── الروايات والقصص ─────────────────────────────────────────────
  {
    id: "book-001",
    slug: "mawsim-al-hijra",
    title: "موسم الهجرة إلى الشمال",
    author: "الطيب صالح",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description:
      "تحفة الطيب صالح الخالدة؛ حكاية مصطفى سعيد الذي عاد من الغربة إلى قرية سودانية على ضفاف النيل ليدفن سرّه بين أهله. رواية تتأمل صدام الشرق والغرب بلغة شعرية آسرة جعلتها من أهم مئة رواية في التاريخ.",
    pages: 171,
    publisher: "المركز الثقافي العربي",
    year: 2019,
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-002",
    slug: "azazeel",
    title: "عزازيل",
    author: "يوسف زيدان",
    category: "novels",
    price: 95,
    oldPrice: 115,
    description:
      "رحلة الراهب «هيبا» عبر أديرة مصر والشام يتأمل خلالها الإيمان والشك والرغبة. الرواية الفائزة بالجائزة العالمية للرواية العربية (البوكر)، نص يفتن القارئ من أول مخطوطة حتى آخر لفافة.",
    pages: 380,
    publisher: "دار الشروق",
    year: 2020,
    language: "العربية",
    rating: 4.7,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-003",
    slug: "khawf",
    title: "خوف",
    author: "أسامة المسلم",
    category: "novels",
    price: 120,
    description:
      "الجزء الأول من سلسلة أسامة المسلم الأشهر في أدب الغموض العربي؛ حكاية يمتزج فيها التشويق بالرعب حين تُفتح أبواب كان يجب أن تبقى مغلقة إلى الأبد. نسخة فاخرة بغلاف مقوى.",
    pages: 320,
    publisher: "دار الشروق",
    year: 2019,
    language: "العربية",
    rating: 4.6,
    featured: false,
    isNew: true,
    available: true,
  },
  {
    id: "book-004",
    slug: "saq-al-bamboo",
    title: "ساق البامبو",
    author: "سعود السنعوسي",
    category: "novels",
    price: 80,
    description:
      "بين الكويت والفلبين يبحث «هوزة» عن هويته الضائعة بين وطنين لا ينتمي كاملاً لأي منهما. الرواية الفائزة بالجائزة العالمية للرواية العربية، مرثية مؤثرة عن الأحلام التي لا تنمو في أي تربة.",
    pages: 392,
    publisher: "الدار العربية للعلوم ناشرون",
    year: 2016,
    language: "العربية",
    rating: 4.7,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-005",
    slug: "rijal-fil-shams",
    title: "رجال في الشمس",
    author: "غسان كنفاني",
    category: "novels",
    price: 45,
    oldPrice: 60,
    description:
      "ثلاثة رجال يهربون من فلسطين إلى الكويت مختبئين في خزان ماء فارغ عبر صحراء حارقة. أيقونة غسان كنفاني التي كتبت معنى القضية والإنسان في أقل من مئة صفحة خالدة.",
    pages: 112,
    publisher: "دار الآداب",
    year: 2015,
    language: "العربية",
    rating: 4.8,
    featured: false,
    isNew: false,
    available: true,
  },

  // ─── التنمية البشرية ─────────────────────────────────────────────
  {
    id: "book-006",
    slug: "al-adat-al-dharriyya",
    title: "العادات الذرية",
    author: "جيمس كلير",
    category: "self-development",
    price: 110,
    description:
      "الكتاب الأشهر عالمياً في بناء العادات؛ يشرح جيمس كلير كيف تصنع التحسينات الصغيرة نتائج مذهلة عبر منهج عملي من أربع قواعد بسيطة. الترجمة العربية الكاملة الأكثر مبيعاً.",
    pages: 320,
    publisher: "مكتبة جرير",
    year: 2021,
    language: "مترجم إلى العربية",
    rating: 4.7,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-007",
    slug: "fann-al-lamubalat",
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    category: "self-development",
    price: 75,
    oldPrice: 95,
    description:
      "لعيش حياة أفضل، توقف عن الاكتراث بكل شيء. مارك مانسون بأسلوبه الصريح الممتع يقدم فلسفة جديدة: قوة التركيز على ما يهم حقاً. من أكثر كتب تطوير الذات مبيعاً في العالم العربي.",
    pages: 224,
    publisher: "دار التنوير",
    year: 2019,
    language: "مترجم إلى العربية",
    rating: 4.4,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-008",
    slug: "quwwat-aqlik-al-batin",
    title: "قوة عقلك الباطن",
    author: "جوزيف ميرفي",
    category: "self-development",
    price: 65,
    description:
      "المحاضرات التي غيّرت حياة الملايين؛ جوزيف ميرفي يكشف كيف يعمل العقل الباطن وكيف توظّف قوته في تحقيق أهدافك وشفاء علاقاتك. كلاسيكية التنمية البشرية التي لا يغيب أثرها.",
    pages: 302,
    publisher: "مكتبة جرير",
    year: 2018,
    language: "مترجم إلى العربية",
    rating: 4.5,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-009",
    slug: "da-al-qalaq",
    title: "دع القلق وابدأ الحياة",
    author: "ديل كارنيجي",
    category: "self-development",
    price: 70,
    description:
      "وصفات كارنيجي العملية للتخلص من القلق والتوتر: قواعد ذهبية لتعيش يومك بسلام، وقصص حقيقية لأناس انتصروا على همومهم. رفيقك اليومي نحو حياة أكثر هدوءاً وثقة.",
    pages: 384,
    publisher: "مكتبة جرير",
    year: 2017,
    language: "مترجم إلى العربية",
    rating: 4.6,
    featured: false,
    isNew: false,
    available: true,
  },

  // ─── الكتب الدينية ───────────────────────────────────────────────
  {
    id: "book-010",
    slug: "li-annaka-allah",
    title: "لأنك الله",
    author: "علي بن جابر الفيفي",
    category: "religion",
    price: 40,
    description:
      "كتاب إيماني بأسلوب أدبي رقيق يعيد تقديم أسماء الله الحسنى ورحمته وعفوه بصياغة معاصرة دافئة تلامس القلب. من أكثر الكتب الدينية تأثيراً وانتشاراً في السنوات الأخيرة.",
    pages: 144,
    publisher: "دار الحضارة",
    year: 2019,
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-011",
    slug: "al-rahiq-al-makhtum",
    title: "الرحيق المختوم",
    author: "صفي الرحمن المباركفوري",
    category: "religion",
    price: 90,
    description:
      "المرجع الأشهر في السيرة النبوية الشريفة؛ بحث شامل دقيق الفائز بالجائزة الأولى من رابطة العالم الإسلامي. طبعة مُحكّمة بخريطة وهوامش توثيقية كاملة.",
    pages: 504,
    publisher: "دار السلام",
    year: 2014,
    language: "العربية",
    rating: 4.9,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-012",
    slug: "fiqh-al-sira",
    title: "فقه السيرة النبوية",
    author: "محمد سعيد رمضان البوطي",
    category: "religion",
    price: 85,
    description:
      "الشيخ البوطي يستخرج من أحداث السيرة العطرة الأحكام والدروس العملية للحياة المعاصرة؛ ليست سيرة تُروى فحسب، بل منهج حياة يُعاش. طبعة دار الفكر المعاصرة المُدققة.",
    pages: 440,
    publisher: "دار الفكر المعاصر",
    year: 2016,
    language: "العربية",
    rating: 4.8,
    featured: false,
    isNew: true,
    available: true,
  },

  // ─── التاريخ والحضارة ────────────────────────────────────────────
  {
    id: "book-013",
    slug: "muqaddimat-ibn-khaldun",
    title: "مقدمة ابن خلدون",
    author: "عبد الرحمن بن خلدون",
    category: "history",
    price: 130,
    description:
      "الكتاب الذي أسّس علم الاجتماع قبل أوروبا بقرون؛ تأملات ابن خلدون الخالدة في قيام الدول وسقوطها وطبائع العمران البشري. نسخة فاخرة بتحقيق وتعليقات على الحواشي.",
    pages: 720,
    publisher: "دار الفكر",
    year: 2013,
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-014",
    slug: "hadarat-al-arab",
    title: "حضارة العرب",
    author: "غوستاف لوبون",
    category: "history",
    price: 95,
    oldPrice: 120,
    description:
      "المستشرق الفرنسي الشهير يقدم بانوراما مدهشة لنهضة العرب الحضارية وأثرها في أوروبا والعالم، من الفتوحات إلى العلوم والفنون. ترجمة عادل زعيتر الشهيرة.",
    pages: 608,
    publisher: "دار التنوير",
    year: 2015,
    language: "مترجم إلى العربية",
    rating: 4.5,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-015",
    slug: "al-bidaya-wa-al-nihaya",
    title: "مختصر البداية والنهاية",
    author: "ابن كثير",
    category: "history",
    price: 150,
    description:
      "تاريخ العالم من بدء الخليقة برواية الحافظ ابن كثير، في نسخة مختصرة سهلة الإمساك تحفظ روح الأصل وتختصر حجمه. طبعة مخرَّجة الأحاديث بالفهارس الكاملة.",
    pages: 640,
    publisher: "دار ابن كثير",
    year: 2012,
    language: "العربية",
    rating: 4.9,
    featured: false,
    isNew: false,
    available: false,
  },

  // ─── الفلسفة والفكر ──────────────────────────────────────────────
  {
    id: "book-016",
    slug: "hakadha-takallama-zaradusht",
    title: "هكذا تكلم زرادشت",
    author: "فريدريك نيتشه",
    category: "philosophy",
    price: 70,
    description:
      "قصيدة نيتشه الفلسفية الكبرى عن الإنسان المتجاوز وإرادة القوة وموت المعاني القديمة؛ «كتاباً للجميع ولا لأحد». ترجمة فليكس فارس الكلاسيكية بغلاف فاخر.",
    pages: 352,
    publisher: "منشورات الجمل",
    year: 2018,
    language: "مترجم إلى العربية",
    rating: 4.3,
    featured: true,
    isNew: false,
    available: true,
  },
  {
    id: "book-017",
    slug: "al-jumhuriyya",
    title: "الجمهورية",
    author: "أفلاطون",
    category: "philosophy",
    price: 65,
    description:
      "حوارات سقراط التي لا تشيخ عن العدالة والمدينة الفاضلة وتربية المواطن؛ حجر الأساس الذي بُنيت عليه الفلسفة السياسية كلها. ترجمة عربية محققة بمقدمة تحليلية موسعة.",
    pages: 416,
    publisher: "منشورات الجمل",
    year: 2017,
    language: "مترجم إلى العربية",
    rating: 4.4,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-018",
    slug: "naqd-al-aql-al-mahd",
    title: "نقد العقل المحض",
    author: "إيمانويل كانط",
    category: "philosophy",
    price: 110,
    oldPrice: 130,
    description:
      "العمل الذي قلب الفلسفة الحديثة رأساً على عقب؛ كانط يرسم حدود العقل البشري وإمكاناته في أعظم نص معرفي في التاريخ. ترجمة المركز الثقافي العربي المعتمدة.",
    pages: 768,
    publisher: "المركز الثقافي العربي",
    year: 2019,
    language: "مترجم إلى العربية",
    rating: 4.6,
    featured: false,
    isNew: true,
    available: true,
  },

  // ─── العلوم والمعرفة ─────────────────────────────────────────────
  {
    id: "book-019",
    slug: "tarikh-mawjaz-lil-zaman",
    title: "موجز تاريخ الزمن",
    author: "ستيفن هوكينغ",
    category: "science",
    price: 105,
    description:
      "من الانفجار العظيم إلى الثقوب السوداء؛ هوكينغ يقرّب أعمق أسئلة الكون بلغة يفهمها الجميع بلا معادلة واحدة معقدة. الكتاب العلمي الأكثر مبيعاً في التاريخ بترجمته العربية الأنيقة.",
    pages: 232,
    publisher: "دار التنوير",
    year: 2020,
    language: "مترجم إلى العربية",
    rating: 4.7,
    featured: true,
    isNew: true,
    available: true,
  },
  {
    id: "book-020",
    slug: "al-kawn-al-aniq",
    title: "الكون الأنيق",
    author: "بريان غرين",
    category: "science",
    price: 115,
    description:
      "رحلة مبهرة مع نظرية الأوتار والأبعاد الخفية؛ بريان غرين يصوغ أحدث ما توصلت إليه الفيزياء النظرية في نص يقرأ كأنه رواية، فاز بجائزة بوليتزر عن فئته.",
    pages: 472,
    publisher: "دار الساقي",
    year: 2018,
    language: "مترجم إلى العربية",
    rating: 4.6,
    featured: false,
    isNew: false,
    available: true,
  },
  {
    id: "book-021",
    slug: "asl-al-anwa",
    title: "أصل الأنواع",
    author: "تشارلز داروين",
    category: "science",
    price: 90,
    description:
      "النص العلمي الذي غيّر نظرة البشرية للحياة إلى الأبد؛ نظرية الانتقاء الطبيعي بقلم صاحبها مع الشواهد الأصلية من رحلة البيغل. طبعة علمية محققة بأطلس التوضيحات.",
    pages: 568,
    publisher: "دار الفارابي",
    year: 2016,
    language: "مترجم إلى العربية",
    rating: 4.5,
    featured: false,
    isNew: false,
    available: false,
  },

  // ─── كتب الأطفال ─────────────────────────────────────────────────
  {
    id: "book-022",
    slug: "kalila-wa-dimna",
    title: "كليلة ودمنة",
    author: "عبد الله بن المقفع",
    category: "kids",
    price: 55,
    oldPrice: 70,
    description:
      "حكمة الشرق على لسان الحيوان؛ حكايات بيدبا الخالدة في طبعة مصورة فاخرة للناشئة تحفظ التراث وتقدمه بلغة محببة ورسوم ملونة مبهجة.",
    pages: 192,
    publisher: "دار المعارف",
    year: 2019,
    language: "العربية",
    rating: 4.6,
    featured: true,
    isNew: true,
    available: true,
  },
  {
    id: "book-023",
    slug: "mughamarat-sindibad",
    title: "مغامرات سندباد البحري",
    author: "من التراث العربي",
    category: "kids",
    price: 45,
    description:
      "أشهر الرحلات البحرية في التراث العربي تعود للأطفال في سلسلة مصورة شيقة؛ سبع رحلات مليئة بالعجائب والجزر السحرية والوحوش اللطيفة، بطباعة فاخرة مقاومة لأيدي الصغار.",
    pages: 96,
    publisher: "مكتبة لبنان ناشرون",
    year: 2021,
    language: "العربية",
    rating: 4.5,
    featured: false,
    isNew: true,
    available: true,
  },

  // ─── اللغات ──────────────────────────────────────────────────────
  {
    id: "book-024",
    slug: "taallam-al-injliziyya",
    title: "الإنجليزية خطوة بخطوة للمبتدئين",
    author: "فريق مكتبة طيف",
    category: "languages",
    price: 60,
    description:
      "منهج مبسط لتأسيس الإنجليزية من الصفر: القواعد الأساسية، 1500 مفردة شائعة، وحوارات يومية جاهزة، مع تمارين وحلول بعد كل درس. إصدار مكتبة طيف التعليمي.",
    pages: 210,
    publisher: "إصدارات مكتبة طيف",
    year: 2024,
    language: "العربية والإنجليزية",
    rating: 4.4,
    featured: false,
    isNew: true,
    available: true,
  },
  {
    id: "book-025",
    slug: "qawaid-al-faransiyya",
    title: "قواعد اللغة الفرنسية المبسطة",
    author: "فريق مكتبة طيف",
    category: "languages",
    price: 50,
    oldPrice: 65,
    description:
      "مدخل سهل وواضح لقواعد الفرنسية: التصريفات، أدوات التعريف والنكرة، وبناء الجمل، مع جداول ملخصة وتطبيقات عملية تناسب طلبة المدارس والجامعات.",
    pages: 186,
    publisher: "إصدارات مكتبة طيف",
    year: 2023,
    language: "العربية والفرنسية",
    rating: 4.3,
    featured: false,
    isNew: false,
    available: true,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getBooksByCategory(categorySlug: string): Book[] {
  return books.filter((book) => book.category === categorySlug);
}

export function getFeaturedBooks(limit?: number): Book[] {
  const list = books.filter((book) => book.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getNewBooks(limit?: number): Book[] {
  const list = books.filter((book) => book.isNew);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getOfferBooks(limit?: number): Book[] {
  const list = books.filter((book) => book.oldPrice !== undefined && book.oldPrice > book.price);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getRelatedBooks(book: Book, limit = 4): Book[] {
  const sameCategory = books.filter((candidate) => candidate.category === book.category && candidate.id !== book.id);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = books.filter(
    (candidate) => candidate.category !== book.category && candidate.id !== book.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** عدد الكتب في كل تصنيف: { novels: 5, ... } */
export function getCategoryCounts(): Record<string, number> {
  return books.reduce<Record<string, number>>((acc, book) => {
    acc[book.category] = (acc[book.category] ?? 0) + 1;
    return acc;
  }, {});
}
