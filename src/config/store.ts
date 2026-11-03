/**
 * الإعدادات المركزية للمكتبة — عدّل هذه القيم لتحديث الموقع بالكامل.
 * Central store configuration — single source of truth.
 */
export const storeConfig = {
  /** اسم المكتبة */
  name: "مكتبة طيف",
  nameLatin: "phantom Library",
  tagline: "بين صفحات الكتب تبدأ الحكايات",

  /**
   * رقم الواتساب بالصيغة الدولية بدون علامة «+» أو مسافات.
   * ⚠️ هذا رقم مؤقت — استبدله بالرقم الحقيقي للمكتبة (مثال: "212612345678").
   */
  whatsappNumber: "212681295714",

  /** رقم هاتف المعروض للزوار */
  phoneDisplay: "+212 681295714",
  phoneRaw: "+212681295714",

  email: "contact@taif-library.ma",
  address: "حي المسيرة، أمام محطة الطاكسيات الكبيرة",
  city: "فاس، المغرب",
  workingHours: "الاثنين – السبت: 9 صباحاً إلى 9 مساءً",
  workingDays: "طوال أيام الأسبوع عبر واتساب",

  /** روابط التواصل الاجتماعي */
  social: {
    instagram: "https://www.instagram.com/o_phantom_librery?mdxt=MWVlaXByMm1sZW1vbA==",
    facebook: "https://www.facebook.com/profile.php?id=61592810347060&mibextid=ZbWKwL",
    // x: "https://x.com/taif_library",
    // youtube: "https://youtube.com/@taif-library",
  },

  /** العملة */
  currency: { code: "DH", label: "درهم" },

  /** رابط الموقع (يُستخدم في بيانات Open Graph) */
  siteUrl: "https://pahntomlibrary.netlify.app",
} as const;

export type StoreConfig = typeof storeConfig;
