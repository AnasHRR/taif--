import {
  Blocks,
  BookOpenText,
  FlaskConical,
  Landmark,
  Languages,
  Lightbulb,
  MoonStar,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** أيقونة كل تصنيف حسب slug */
export const categoryIcons: Record<string, LucideIcon> = {
  novels: BookOpenText,
  "self-development": TrendingUp,
  religion: MoonStar,
  history: Landmark,
  philosophy: Lightbulb,
  science: FlaskConical,
  kids: Blocks,
  languages: Languages,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] ?? BookOpenText;
}
