import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MoviesPageHeader = () => {
  return (
    <section className="py-10">
      <div className="max-w-3xl">
        <Badge variant="secondary" className="mb-4">
          En cartelera
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-balance">
          Explorar películas
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Descubre las películas más populares y compra tu entrada desde aquí.
        </p>
      </div>
      <Separator className="mt-8" />
    </section>
  );
};

export default MoviesPageHeader;
