import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  priceType: "fixed" | "request";
  image: string;
}

interface AccessoryCardProps {
  item: AccessoryItem;
  delay?: number;
}

const AccessoryCard = ({ item, delay = 0 }: AccessoryCardProps) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      volume: "",
      type: "purchase",
      price: item.price,
      image: item.image,
    });
  };

  const handleContact = () => {
    window.open("https://t.me/n2o_rostov", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-300 flex flex-col"
    >
      {/* Image area — fixed aspect ratio */}
      <div className="relative flex items-center justify-center bg-gradient-to-b from-secondary/60 to-transparent aspect-[4/3] p-4 sm:p-6">
        <motion.img
          src={item.image}
          alt={item.name}
          className="max-w-[80%] max-h-[80%] object-contain drop-shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Info area — fills remaining space */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-auto">
          {item.priceType === "fixed" ? (
            <>
              <span className="text-base sm:text-lg font-bold gold-text whitespace-nowrap">
                {item.price.toLocaleString()} ₽
              </span>
              <Button
                variant="gold"
                size="sm"
                onClick={handleAdd}
                className="gap-1 text-xs sm:text-sm px-2.5 sm:px-3 shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">В корзину</span>
                <span className="xs:hidden">+</span>
              </Button>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">По запросу</span>
              <Button
                variant="goldOutline"
                size="sm"
                onClick={handleContact}
                className="gap-1 text-xs sm:text-sm px-2.5 sm:px-3 shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Написать
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccessoryCard;
