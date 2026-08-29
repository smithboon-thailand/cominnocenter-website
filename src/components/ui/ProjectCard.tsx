import Image from "next/image";
import Link from "next/link";
import { SDG, type SdgId } from "@/data/sdg";
import SdgBadge from "./SdgBadge";

type ProjectCardProps = {
  href: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** เป้าหมายแรกคือสีหลักของการ์ด (แถบบน + border hover) */
  sdgIds: readonly SdgId[];
  locale?: "th" | "en";
  /**
   * โหลดภาพทันทีแทนการรอ lazy — ใช้กับการ์ดแรกๆ ที่อยู่เหนือ fold เท่านั้น
   * บน /impact การ์ดแรกคือ LCP ของหน้า ปล่อยให้ lazy แล้ว LCP ยืดเป็น ~3 วินาที
   */
  priority?: boolean;
};

/**
 * Project Card ตาม BRAND.md G3
 * พื้นขาว · border ink-300 · radius 8px · แถบบน 4px สี pure ของ SDG แรก
 * ภาพ 16:10 → SDG badge → h3 → คำอธิบาย 2 บรรทัด
 * hover: border เป็น pure ของ SDG นั้น + ยกขึ้น 2px
 */
export default function ProjectCard({
  href,
  title,
  description,
  image,
  alt,
  sdgIds,
  locale = "th",
  priority = false,
}: ProjectCardProps) {
  const primary = sdgIds[0];
  const pure = primary ? SDG[primary].pure : "var(--ink-300)";

  return (
    <Link
      href={href}
      style={{ "--card-sdg": pure } as React.CSSProperties}
      className="group block overflow-hidden rounded-lg border border-ink-300 bg-white
        transition-[border-color,transform] duration-150 ease-brand
        hover:-translate-y-0.5 hover:border-[var(--card-sdg)]
        focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
        motion-reduce:hover:translate-y-0"
    >
      <span aria-hidden className="block h-1" style={{ backgroundColor: pure }} />
      <span className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
        />
      </span>
      <span className="block space-y-2 p-6">
        <span className="flex flex-wrap gap-1.5">
          {primary && <SdgBadge id={primary} locale={locale} />}
          {sdgIds.slice(1).map((id) => (
            <SdgBadge key={id} id={id} variant="compact" locale={locale} />
          ))}
        </span>
        <span className="block text-xl font-medium leading-[1.4] text-ink-900">{title}</span>
        <span className="line-clamp-2 block text-[15px] leading-[1.6] text-ink-700">
          {description}
        </span>
      </span>
    </Link>
  );
}
