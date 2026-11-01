/**
 * الإعدادات المركزية للمكتبة — عدّل هذه القيم لتحديث الموقع بالكامل.
 * Central store configuration — single source of truth.
 */
export const storeConfig = {
  /** اسم المكتبة */
  name: "مكتبة طيف",
  nameLatin: "Taif Library",
  tagline: "بين صفحات الكتب تبدأ الحكايات",

  /**
   * رقم الواتساب بالصيغة الدولية بدون علامة «+» أو مسافات.
   * ⚠️ هذا رقم مؤقت — استبدله بالرقم الحقيقي للمكتبة (مثال: "212612345678").
   */
  whatsappNumber: "212600000000",

  /** رقم هاتف المعروض للزوار */
  phoneDisplay: "+212 600 000 000",
  phoneRaw: "+212600000000",

  email: "contact@taif-library.ma",
  address: "شارع محمد الخامس، وسط المدينة",
  city: "الدار البيضاء، المغرب",
  workingHours: "الاثنين – السبت: 9 صباحاً إلى 9 مساءً",
  workingDays: "طوال أيام الأسبوع عبر واتساب",

  /** روابط التواصل الاجتماعي */
  social: {
    instagram: "https://instagram.com/taif.library",
    facebook: "https://facebook.com/taif.library",
    x: "https://x.com/taif_library",
    youtube: "https://youtube.com/@taif-library",
  },

  /** العملة */
  currency: { code: "MAD", label: "درهم" },

  /** رابط الموقع (يُستخدم في بيانات Open Graph) */
  siteUrl: "https://taif-library.ma",
} as const;

export type StoreConfig = typeof storeConfig;
