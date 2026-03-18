import { motion } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ease = [0.4, 0, 0.2, 1] as const;

const ContactSection = () => (
  <section id="contacts" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center border border-border/50"
        style={{ boxShadow: "inset 0 1px 0 0 hsla(0,0%,100%,0.06)" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gold-text">Свяжитесь с нами</span>
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">Мы на связи 24/7. Ответим на любые вопросы.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" className="gap-2 shadow-lg shadow-primary/20">
            <Phone className="w-5 h-5" />
            Позвонить
          </Button>
          <Button variant="goldOutline" size="lg" className="gap-2">
            <Send className="w-5 h-5" />
            Telegram
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
