import { Home, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

const MobileNav = () => {
  const { toggleCart, totalItems } = useCart();
  const [activeTab, setActiveTab] = useState("home");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("home");
  };

  const handleCart = () => {
    toggleCart();
    setActiveTab("cart");
  };

  const tabs = [
    { id: "home", icon: Home, label: "Главная", action: scrollToTop },
    { id: "cart", icon: ShoppingCart, label: "Корзина", action: handleCart, badge: totalItems },
    { id: "profile", icon: User, label: "Профиль", action: () => setActiveTab("profile") },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl safe-area-bottom"
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={tab.action}
              whileTap={{ scale: 0.85 }}
              className={`flex flex-col items-center gap-1 relative px-6 py-2 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <tab.icon className="w-5 h-5" />
                {tab.badge && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-3 w-5 h-5 rounded-full gold-gradient text-[10px] font-bold text-primary-foreground flex items-center justify-center"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="absolute -bottom-0.5 w-8 h-0.5 rounded-full gold-gradient"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileNav;
