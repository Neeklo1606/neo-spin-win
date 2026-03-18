import { motion } from "framer-motion";
import { ShoppingCart, ClipboardCheck, Truck } from "lucide-react";

const steps = [
  { icon: ShoppingCart, title: "Выберите товар", desc: "Подберите подходящий объём и тип заказа" },
  { icon: ClipboardCheck, title: "Подтвердите заказ", desc: "Укажите адрес и контактные данные" },
  { icon: Truck, title: "Получите доставку", desc: "Курьер доставит заказ за 30–60 минут" },
];

const ease = [0.4, 0, 0.2, 1] as const;

const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gold-text">Как это работает</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="text-center glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-colors duration-300"
            style={{ boxShadow: "inset 0 1px 0 0 hsla(0,0%,100%,0.06)" }}
          >
            <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
              <step.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-sm font-bold gold-text mb-2">Шаг {i + 1}</div>
            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
