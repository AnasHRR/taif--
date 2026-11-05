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
};
export const books: Book[] = [
  // ─── الروايات والقصص ─────────────────────────────────────────
  {
    id: "book-001",
    slug: "silsilat-005",
    title: "سلسلة 005",
    author: "شهد قربان",
    category: "novels",
    price: 70,
    oldPrice: 110,
    description: "سلسلة أدبية تجمع بين الغموض والتشويق والدراما المظلمة، تأخذ القارئ في عالم مليء بالأسرار والاضطرابات النفسية. تضم: ستوكهولم، بافيليون، بارانويا.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 392,
    publisher: "",
    year: 2024
  },
  {
    id: "book-002",
    slug: "silsilat-ababil",
    title: "سلسلة أبابيل",
    author: "أحمد آل حمدان",
    category: "novels",
    price: 120,
    oldPrice: 140,
    description: "رحلة فنتازية استثنائية تمزج بين الحب والأساطير والصراعات الخيالية، في عالم مليء بالمفاجآت والأسرار. تضم: أبابيل، الجساسة، جومانا، سقيفة حواء.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-003",
    slug: "silsilat-alteen",
    title: "سلسلة الطين",
    author: "أحمد آل حمدان",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description: "سلسلة تجمع بين الفنتازيا والغموض، وتفتح أبواب عالم مليء بالأحداث الغريبة والأسرار التي تتكشف تدريجياً. تضم: أرسس، أرسس 2.",
    language: "العربية",
    rating: 4.7,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-004",
    slug: "silsilat-khawf",
    title: "سلسلة خوف",
    author: "أسامة المسلم",
    category: "novels",
    price: 110,
    oldPrice: 130,
    description: "ثلاثية رعب نفسي وفنتازيا تأخذ القارئ إلى عوالم مظلمة ومخيفة، حيث تختلط الحقيقة بالخيال والخوف بالمجهول. تضم: خوف 1، خوف 2، خوف 3.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-005",
    slug: "basateen-arabistan",
    title: "سلسلة بساتين عربستان",
    author: "أسامة المسلم",
    category: "novels",
    price: 180,
    oldPrice: 210,
    description: "ملحمة فنتازية عربية ضخمة تدور في عالم السحر والجن والصراعات القديمة، مليئة بالمغامرات والشخصيات الغامضة. تضم: بساتين عربستان، عصبة الشياطين، رياح الهجر، العرجاء، الساحرة الهجينة، عرش الشباط.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-006",
    slug: "silsilat-luj",
    title: "سلسلة لج",
    author: "أسامة المسلم",
    category: "novels",
    price: 165,
    oldPrice: 190,
    description: "مغامرة فنتازية بحرية تنقل القارئ إلى عالم البحار والمخلوقات الأسطورية والصراعات بين الممالك. تضم: لج، ملكة الغرانيق، ثورة الحور، صراع الملكات، فجر السايرينات.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  // ─── التاريخ والحضارة ─────────────────────────────────────────
  {
    id: "book-007",
    slug: "kharbousha",
    title: "خربوشة",
    author: "أسامة المسلم",
    category: "history",
    price: 65,
    oldPrice: 75,
    description: "عمل أدبي يستلهم التاريخ والتراث، ويقدم تجربة درامية تستحضر أجواء الماضي والشخصيات والأحداث بأسلوب سردي مشوق.",
    language: "العربية",
    rating: 4.5,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  // ─── الروايات والقصص ─────────────────────────────────────────
  {
    id: "book-008",
    slug: "ani-ataaffan-ruban",
    title: "أني أتعفن رعباً",
    author: "أسامة المسلم",
    category: "novels",
    price: 65,
    oldPrice: 75,
    description: "مجموعة قصصية مرعبة تأخذ القارئ إلى عوالم من الخوف والغموض، حيث تتشابك الأحداث الغريبة مع المجهول في أجواء مليئة بالتوتر.",
    language: "العربية",
    rating: 4.6,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-009",
    slug: "beachini",
    title: "بيتشيني",
    author: "أسامة المسلم",
    category: "novels",
    price: 65,
    oldPrice: 75,
    description: "رواية تأخذ القارئ في رحلة من الرعب والغموض، حيث تتصاعد الأحداث وتظهر أسرار غير متوقعة في أجواء مليئة بالتشويق.",
    language: "العربية",
    rating: 4.5,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-010",
    slug: "lanat-adimon",
    title: "لعنة أديمون",
    author: "أسامة المسلم",
    category: "novels",
    price: 70,
    oldPrice: 85,
    description: "عمل يمزج بين الفنتازيا والرعب، ويأخذ القارئ إلى عالم غامض تحكمه الأسرار واللعنات والأحداث الخارقة للطبيعة.",
    language: "العربية",
    rating: 4.7,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-011",
    slug: "jamra",
    title: "جمرة",
    author: "أسامة المسلم",
    category: "novels",
    price: 65,
    oldPrice: 80,
    description: "رواية تجمع بين الفنتازيا والغموض، وتقدم تجربة سردية مليئة بالأحداث المثيرة والأسرار التي تشد القارئ حتى النهاية.",
    language: "العربية",
    rating: 4.6,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-012",
    slug: "11-11",
    title: "11:11",
    author: "يوسف جاسم رمضان",
    category: "novels",
    price: 70,
    oldPrice: 85,
    description: "رواية تمزج بين الرومانسية والدراما النفسية، وتتناول المشاعر الإنسانية والعلاقات والتفاصيل التي تترك أثراً عميقاً في النفس.",
    language: "العربية",
    rating: 4.6,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-013",
    slug: "nafthat-alshaytan",
    title: "نفثة الشيطان",
    author: "يحيى خان",
    category: "novels",
    price: 70,
    oldPrice: 85,
    description: "رواية رعب وغموض مليئة بالإثارة والأحداث غير المتوقعة، تأخذ القارئ إلى أجواء مظلمة حيث تتداخل الأسرار مع الخوف.",
    language: "العربية",
    rating: 4.5,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-014",
    slug: "majdoline",
    title: "مجدولين",
    author: "مصطفى لطفي المنفلوطي",
    category: "novels",
    price: 55,
    oldPrice: 65,
    description: "رواية كلاسيكية رومانسية مؤثرة، تصور الحب والوفاء والفراق والتضحيات الإنسانية بأسلوب أدبي عربي جميل وعاطفي.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-015",
    slug: "ard-zikola",
    title: "سلسلة أرض زيكولا",
    author: "عمرو عبد الحميد",
    category: "novels",
    price: 110,
    oldPrice: 130,
    description: "رحلة إلى عالم خيالي مختلف، حيث لا تُقاس قيمة الأشياء بالمال بل بوحدات الذكاء. سلسلة تجمع بين المغامرة والفنتازيا والخيال العلمي. تضم: أرض زيكولا، أماريتا، فتاة ياقة أزرق.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-016",
    slug: "qawaed-jartain",
    title: "سلسلة قواعد جارتين",
    author: "عمرو عبد الحميد",
    category: "novels",
    price: 115,
    oldPrice: 135,
    description: "عالم فنتازي تحكمه قوانين غريبة وصراعات إنسانية معقدة، حيث تتشابك المغامرات والأسرار في رحلة مليئة بالتشويق. تضم: قواعد جارتين، دقات الشاموس، أمواج أكما.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-017",
    slug: "sane-tarot",
    title: "صانع تاروت",
    author: "أحمد خالد توفيق",
    category: "novels",
    price: 65,
    oldPrice: 80,
    description: "عمل أدبي في عالم الغموض والتشويق، يستكشف الأسرار والأحداث الغامضة في أجواء مليئة بالإثارة والتساؤلات.",
    language: "العربية",
    rating: 4.6,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-018",
    slug: "firan-omi-hissa",
    title: "فئران أمي حصة",
    author: "سعود السنعوسي",
    category: "novels",
    price: 75,
    oldPrice: 90,
    description: "رواية اجتماعية وسياسية تتناول التحولات والصراعات داخل المجتمع، وتسلط الضوء على الطائفية والذاكرة والواقع الإنساني.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-019",
    slug: "saq-albamboo",
    title: "ساق البامبو",
    author: "سعود السنعوسي",
    category: "novels",
    price: 75,
    oldPrice: 90,
    description: "رواية إنسانية مؤثرة تناقش الهوية والانتماء والاختلاف الاجتماعي من خلال حكاية شاب يبحث عن مكانه بين عالمين وثقافتين.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-020",
    slug: "the-housemaid-series",
    title: "سلسلة الخادمة The Housemaid",
    author: "فريدا مكفادين",
    category: "novels",
    price: 120,
    oldPrice: 145,
    description: "سلسلة إثارة نفسية مليئة بالأسرار والتلاعب والمفاجآت، حيث لا تكون الحقيقة دائماً كما تبدو. تضم: الخادمة، سر الخادمة، الخادمة تراقب.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-021",
    slug: "five-survive",
    title: "Five Survive",
    author: "هولي جاكسون",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description: "رواية تشويق وجريمة تدور حول مجموعة من الأصدقاء يجدون أنفسهم في موقف خطير، حيث تتصاعد الشكوك والأسرار ويصبح البقاء هو التحدي الأكبر. ومن أعمال الكاتبة أيضاً سلسلة A Good Girl's Guide to Murder.",
    language: "الإنجليزية",
    rating: 4.7,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-022",
    slug: "bad-bishop",
    title: "Bad Bishop",
    author: "L.J. Shen",
    category: "novels",
    price: 90,
    oldPrice: 105,
    description: "رواية رومانسية مظلمة تجمع بين العلاقات المعقدة والدراما والمشاعر المتضاربة، في قصة مليئة بالتوتر والتشويق.",
    language: "الإنجليزية",
    rating: 4.5,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-023",
    slug: "scythe-and-sparrow",
    title: "سلسلة Scythe & Sparrow",
    author: "Brynne Weaver",
    category: "novels",
    price: 110,
    oldPrice: 130,
    description: "سلسلة تمزج بين الرومانسية المظلمة والجريمة والتشويق، وتقدم شخصيات وعلاقات غير تقليدية داخل عالم مليء بالأحداث والمفاجآت.",
    language: "الإنجليزية",
    rating: 4.7,
    featured: false,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-024",
    slug: "this-woven-kingdom",
    title: "سلسلة This Woven Kingdom",
    author: "Tahereh Mafi",
    category: "novels",
    price: 125,
    oldPrice: 150,
    description: "ملحمة فنتازية رومانسية تستلهم الأساطير والقصور والصراعات الملكية، وتجمع بين السحر والحب والقدر. تضم: مملكة منسوجة، هذا الخيط الإلهي، جلالة الفناء.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-025",
    slug: "1984-george-orwell",
    title: "1984",
    author: "جورج أورويل",
    category: "novels",
    price: 70,
    oldPrice: 85,
    description: "رواية ديستوبية شهيرة تصور مجتمعاً يخضع للمراقبة والسيطرة الشاملة، وتطرح أسئلة عميقة حول الحرية والحقيقة والسلطة.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-026",
    slug: "animal-farm",
    title: "مزرعة الحيوان",
    author: "جورج أورويل",
    category: "novels",
    price: 55,
    oldPrice: 65,
    description: "رواية رمزية سياسية تستخدم عالم الحيوانات لتصوير الثورة والسلطة والاستبداد، وتقدم نقداً عميقاً للتحولات السياسية والاجتماعية.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  // ─── الفلسفة والفكر ─────────────────────────────────────────
  {
    id: "book-027",
    slug: "al-maskh",
    title: "المسخ",
    author: "فرانتس كافكا",
    category: "philosophy",
    price: 50,
    oldPrice: 60,
    description: "عمل أدبي فلسفي ونفسي شهير يحكي قصة تحول غريغور سامسا إلى مخلوق غريب، ويطرح أسئلة عميقة حول الاغتراب والهوية والعزلة الإنسانية.",
    language: "العربية",
    rating: 4.8,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  // ─── الروايات والقصص ─────────────────────────────────────────
  {
    id: "book-028",
    slug: "al-layali-al-bayda",
    title: "الليالي البيضاء",
    author: "فيودور دوستويفسكي",
    category: "novels",
    price: 55,
    oldPrice: 65,
    description: "رواية رومانسية كلاسيكية مؤثرة تصور لقاءً استثنائياً بين شخصين وحيدين، وتستكشف الحب والأحلام والوحدة والأمل.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-029",
    slug: "lam-aud-insanan",
    title: "لم أعد إنساناً",
    author: "أوسامو دازاي",
    category: "novels",
    price: 65,
    oldPrice: 80,
    description: "رواية نفسية عميقة تستكشف العزلة والاغتراب والصراع الداخلي، وتقدم نظرة مؤثرة إلى مشاعر الإنسان وعلاقته بالمجتمع.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-030",
    slug: "murder-on-orient-express",
    title: "جريمة في قطار الشرق السريع",
    author: "أجاثا كريستي",
    category: "novels",
    price: 65,
    oldPrice: 80,
    description: "واحدة من أشهر روايات التحقيق والغموض، يجد فيها المحقق هيركيول بوارو نفسه أمام جريمة قتل غامضة داخل قطار فاخر، حيث يصبح كل راكب موضع اشتباه.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-031",
    slug: "and-then-there-were-none",
    title: "ثم لم يبق أحد",
    author: "أجاثا كريستي",
    category: "novels",
    price: 65,
    oldPrice: 80,
    description: "رواية بوليسية مشوقة تجمع عشرة أشخاص في جزيرة معزولة، حيث تبدأ سلسلة من الأحداث الغامضة التي تحول الرحلة إلى كابوس مليء بالأسرار.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-032",
    slug: "the-da-vinci-code",
    title: "شفرة دافنشي",
    author: "دان براون",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description: "رواية إثارة وغموض تجمع بين الفن والتاريخ والرموز والألغاز، في مغامرة مثيرة يحاول خلالها روبرت لانغدون كشف أسرار تقود إلى حقائق غير متوقعة.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-033",
    slug: "angels-and-demons",
    title: "الملائكة والشياطين",
    author: "دان براون",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description: "رواية إثارة وتشويق تجمع بين الألغاز العلمية والرموز التاريخية والصراعات الفكرية، في سباق مثير لكشف مؤامرة تهدد العالم.",
    language: "العربية",
    rating: 4.8,
    featured: false,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-034",
    slug: "one-hundred-years-of-solitude",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    category: "novels",
    price: 90,
    oldPrice: 110,
    description: "تحفة أدبية من أدب الواقعية السحرية، تروي تاريخ عائلة بوينديا عبر أجيال متعددة في قرية ماكوندو، حيث تمتزج الحياة اليومية بالخيال والأساطير.",
    language: "العربية",
    rating: 4.9,
    featured: true,
    isNew: false,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
  },
  {
    id: "book-035",
    slug: "ababil-al-awda",
    title: "أبابيل: العودة",
    author: "أحمد آل حمدان",
    category: "novels",
    price: 85,
    oldPrice: 100,
    description: "عمل ينتمي إلى عالم أبابيل الفنتازي، ويعيد القارئ إلى أجواء الخيال والأسرار والمغامرات المرتبطة بهذا العالم الأدبي.",
    language: "العربية",
    rating: 4.8,
    featured: true,
    isNew: true,
    available: true,
    pages: 0,
    publisher: "",
    year: 0
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
