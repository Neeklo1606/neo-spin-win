import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import cylinder5l from "@/assets/cylinder-5l.png";
import cylinder10l from "@/assets/cylinder-10l.png";

const ProductSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="products" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Наши продукты</span>
          </h2>
          <p className="text-muted-foreground text-lg">Выберите подходящий объём</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <ProductCard
            image={cylinder5l}
            title="N₂O Баллон"
            volume="5 л"
            description="Компактный баллон для небольших мероприятий. Идеальный выбор для первого заказа."
            price={3500}
            onBuy={() => setIsModalOpen(true)}
            delay={0}
          />
          <ProductCard
            image={cylinder10l}
            title="N₂O Баллон"
            volume="10 л"
            description="Увеличенный объём для крупных событий. Лучшее соотношение цена/объём."
            price={5500}
            onBuy={() => setIsModalOpen(true)}
            delay={0.12}
          />
        </div>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ProductSection;
