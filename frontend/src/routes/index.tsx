import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-10 right-10 text-primary/30 hidden sm:block"
      >
        <HeartPulse size={100} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          Hoş Geldiniz 👋
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
          Hasta yönetim sistemine hoş geldiniz. Buradan hasta bilgilerini
          görüntüleyebilir, ekleyebilir veya düzenleyebilirsiniz.
        </p>

        <Button asChild size="lg" className="px-8">
          <Link to="/patients">Hasta Tablosuna Git</Link>
        </Button>
      </motion.div>

    </div>
  );
}
