import Link from "next/link";

type HeaderProps = {
  active?: "home" | "about" | "expertise" | "impact" | "collaborate";
};

export default function Header({ active }: HeaderProps) {
  const linkClass = (page: string) =>
    active === page
      ? "text-pink-500 font-semibold"
      : "hover:text-pink-500 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-blue-700">
          ComInnoCenter
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <Link href="/about" className={linkClass("about")}>
            เกี่ยวกับเรา
          </Link>
          <Link href="/expertise" className={linkClass("expertise")}>
            ความเชี่ยวชาญ
          </Link>
          <Link href="/impact" className={linkClass("impact")}>
            ผลงาน
          </Link>
          <Link href="/collaborate" className={linkClass("collaborate")}>
            ร่วมงานกับเรา
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-700">
            EN
          </button>
          <Link
            href="/collaborate"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            ร่วมงานกับเรา
          </Link>
        </div>
      </div>
    </header>
  );
}
