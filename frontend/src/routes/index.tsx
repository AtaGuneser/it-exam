import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz 👋</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Hasta yönetim sistemine hoş geldiniz. Buradan hasta bilgilerini
        görüntüleyebilir, ekleyebilir veya düzenleyebilirsiniz.
      </p>

      <Button asChild size="lg" className="px-8">
        <Link to="/patients">Hasta Tablosuna Git</Link>
      </Button>
    </div>
  );
}
