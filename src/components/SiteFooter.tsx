import logo from "@/assets/logo.webp";
import { useContent } from "@/hooks/useContent";

const DEFAULT_LAW_URL = "https://www.consultant.ru/document/cons_doc_LAW_372637/";
const DEFAULT_LAW_TEXT =
  "Федеральный закон «Об ограничении оборота закиси азота в РФ» от 29.12.2020 N 472-ФЗ";

function isAllowedExternalUrl(href: string): boolean {
  try {
    const u = new URL(href);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const SiteFooter = () => {
  const { get } = useContent();

  const lawUrlRaw = get("footer_law_link_url", DEFAULT_LAW_URL).trim();
  const lawText = get("footer_law_link_text", DEFAULT_LAW_TEXT).trim() || DEFAULT_LAW_TEXT;
  const lawHref = isAllowedExternalUrl(lawUrlRaw) ? lawUrlRaw : DEFAULT_LAW_URL;

  return (
  <footer className="border-t border-border/50 bg-background py-6">
    <div className="container mx-auto px-4 flex flex-col items-center gap-2 text-xs text-muted-foreground text-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="N2O" className="w-8 h-8 object-contain" />
        <span className="gold-text font-bold text-sm">{get('footer_logo_text', 'N₂O ROSTOV')}</span>
      </div>
      {get('footer_city') && <span>{get('footer_city', 'Ростов-на-Дону')}</span>}
      {get('footer_warning') && <span>{get('footer_warning', '⚠️ 18+ Продажа лицам младше 18 лет запрещена')}</span>}
      {get('footer_legal') && (
        <span className="leading-relaxed">
          {get('footer_legal', 'Использовать строго в рамках законодательства РФ')}
        </span>
      )}
      {lawHref && (
        <a
          href={lawHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/70 hover:text-primary underline transition-colors"
        >
          {lawText}
        </a>
      )}
      {get('footer_phone') && (
        <span>📞 {get('footer_phone')}</span>
      )}
      {get('footer_telegram') && (
        <span>💬 {get('footer_telegram')}</span>
      )}
      {get('footer_copyright') && <span>{get('footer_copyright', '© 2026 Все права защищены')}</span>}
      {get('footer_dev') && (
        <a
          href="https://neeklo.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-muted-foreground/60 hover:text-primary transition-colors duration-300"
        >
          {get('footer_dev', 'Разработка neeklo.studio')}
        </a>
      )}
    </div>
  </footer>
  );
};

export default SiteFooter;
