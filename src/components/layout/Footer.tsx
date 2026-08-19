import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BackToTop } from "@/components/ui/BackToTop";
import { SOCIAL_LINKS } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer-shell relative overflow-hidden text-fg">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-12 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-fg/40">{t("nav_title")}</p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link href="/" className="nav-link w-fit pb-0.5 hover:text-accent">
                {tNav("home")}
              </Link>
              <Link href="/#work" className="nav-link w-fit pb-0.5 hover:text-accent">
                {tNav("projects")}
              </Link>
              <Link href="/#about" className="nav-link w-fit pb-0.5 hover:text-accent">
                {tNav("about")}
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-fg/40">{t("social_title")}</p>
            <div className="mt-5 flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link w-fit pb-0.5 hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex items-end justify-between gap-4 md:col-span-1 md:flex-col md:items-end">
            <p className="text-sm text-fg/40">© {currentYear} Nicolas Thibault</p>
            <BackToTop label={t("back_to_top")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
