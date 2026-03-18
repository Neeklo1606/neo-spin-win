import { Home, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("home");
    } else if (location.pathname === "/profile") {
      setActiveTab("profile");
    }
  }, [location.pathname]);

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActiveTab("home");
  };

  const handleCart = () => {
    toggleCart();
    setActiveTab("cart");
  };

  const handleProfile = () => {
    navigate("/profile");
    setActiveTab("profile");
  };

  const tabs = [
    { id: "home", icon: Home, label: "Главная", action: scrollToTop },
    { id: "cart", icon: ShoppingCart, label: "Корзина", action: handleCart, badge: totalItems },
    { id: "profile", icon: User, label: "Профиль", action: handleProfile },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl safe-area-bottom"
    >
      <div className="flex items-center justify-around h-14 pb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={tab.action}
              whileTap={{ scale: 0.85 }}
              className={`flex-1 flex flex-col items-center gap-1 relative py-2 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <tab.icon className="w-6 h-6" />
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
              <span className="text-xs font-medium">{tab.label}</span>
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
