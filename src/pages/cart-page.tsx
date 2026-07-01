import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { tmdbImage } from "@/lib/tmdb-image";
import { useCartStore } from "@/store/cart.store";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const { items, removeItem, total } = useCartStore();

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="py-24 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Agrega películas desde el catálogo para comprar tu entrada.
          </p>
          <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
            <Link to="/movies">Explorar películas</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="py-10">
        <h1 className="text-3xl font-bold">Tu carrito</h1>
        <p className="mt-1 text-muted-foreground">
          {items.length} {items.length === 1 ? "película" : "películas"} seleccionadas
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Items list */}
          <div className="space-y-4">
            {items.map((item) => {
              const posterUrl = tmdbImage.poster(item.poster_path, "w185");
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border bg-card p-4"
                >
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Entrada digital
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-bold text-lg">S/ {item.price.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-xl border bg-card p-6">
            <h2 className="text-xl font-bold">Resumen del pedido</h2>
            <Separator className="my-4" />

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate max-w-[200px] text-muted-foreground">
                    {item.title}
                  </span>
                  <span>S/ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>S/ {total().toFixed(2)}</span>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link to="/checkout">Proceder al pago</Link>
            </Button>

            <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
              <Link to="/movies">Seguir comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CartPage;
