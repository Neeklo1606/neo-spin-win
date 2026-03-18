import { AlertTriangle } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const SiteFooter = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <img src={logoIcon} alt="N2O" className="w-6 h-6 object-contain" />
          <span className="gold-text font-bold">N₂O</span>
          <span>© 2025 Все права защищены</span>
        </div>
        <div className="text-center">Москва и Московская область</div>
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-semibold">18+</span>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
