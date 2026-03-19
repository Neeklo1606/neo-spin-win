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
      className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-300"
    >
      <div className="relative p-6 flex justify-center bg-gradient-to-b from-secondary/60 to-transparent aspect-square">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain drop-shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-base font-bold text-foreground">{item.name}</h3>
        <div className="flex items-center justify-between">
          {item.priceType === "fixed" ? (
            <>
              <span className="text-lg font-bold gold-text">{item.price.toLocaleString()} ₽</span>
              <Button variant="gold" size="sm" onClick={handleAdd} className="gap-1.5">
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground font-medium">По запросу</span>
              <Button variant="goldOutline" size="sm" onClick={handleContact} className="gap-1.5">
                <MessageCircle className="w-4 h-4" />
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
