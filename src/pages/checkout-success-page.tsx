import { Film, Home, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { tmdbImage } from "@/lib/tmdb-image";
import type { CartItem } from "@/store/cart.store";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderState {
  items: CartItem[];
  total: number;
}

const CONFETTI_COLORS = [
  "#3b82f6", "#22c55e", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
];

const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => (
  <div
    className="pointer-events-none fixed top-0 w-2 rounded-sm"
    style={{
      left: `${Math.random() * 100}%`,
      height: `${8 + Math.random() * 8}px`,
      backgroundColor: color,
      animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
      animationDelay: `${delay}ms`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  />
);

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const order = location.state as OrderState | null;

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setStep(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const confettiPieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: i * 40,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));

  return (
    <>
      {/* Animación confeti global */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(5deg); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 20px rgba(34,197,94,0); }
        }
      `}</style>

      {/* Confeti */}
      {step >= 1 &&
        confettiPieces.map((p) => (
          <ConfettiPiece key={p.id} delay={p.delay} color={p.color} />
        ))}

      <PageContainer>
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-16">

          {/* Ícono de éxito */}
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full bg-green-500 shadow-2xl"
            style={{
              animation: step >= 1 ? "checkPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards, pulseGlow 2s ease-in-out 0.8s infinite" : "none",
              opacity: step >= 1 ? undefined : 0,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-14 w-14"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Texto principal */}
          <div
            className="mt-8 text-center"
            style={{
              animation: step >= 2 ? "fadeSlideUp 0.5s ease-out forwards" : "none",
              opacity: step >= 2 ? undefined : 0,
            }}
          >
            <h1 className="text-4xl font-bold md:text-5xl">¡Pago exitoso!</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Tu compra ha sido confirmada en CineSpoilerS
            </p>
          </div>

          {/* Tarjeta del pedido */}
          {order && order.items.length > 0 && (
            <div
              className="mt-10 w-full max-w-lg"
              style={{
                animation: step >= 3 ? "fadeSlideUp 0.5s ease-out forwards" : "none",
                opacity: step >= 3 ? undefined : 0,
              }}
            >
              <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
                {/* Header de la tarjeta */}
                <div className="flex items-center gap-3 bg-green-500/10 px-6 py-4">
                  <Ticket className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">
                      Orden confirmada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      #{Math.random().toString(36).slice(2, 10).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Lista de películas compradas */}
                <div className="divide-y px-6">
                  {order.items.map((item) => {
                    const posterUrl = tmdbImage.poster(item.poster_path, "w185");
                    return (
                      <div key={item.id} className="flex items-center gap-4 py-4">
                        <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-muted shadow">
                          {posterUrl ? (
                            <img
                              src={posterUrl}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                              ?
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Entrada digital</p>
                        </div>
                        <p className="shrink-0 font-semibold">S/ {item.price.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>

                <Separator />
                <div className="flex justify-between px-6 py-4 font-bold">
                  <span>Total pagado</span>
                  <span className="text-green-600">S/ {order.total.toFixed(2)}</span>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Recibirás tu entrada digital en tu correo electrónico
              </p>
            </div>
          )}

          {/* Botones */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-4"
            style={{
              animation: step >= 4 ? "fadeSlideUp 0.5s ease-out forwards" : "none",
              opacity: step >= 4 ? undefined : 0,
            }}
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/movies">
                <Film className="mr-2 h-4 w-4" />
                Explorar más películas
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Ir al inicio
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default CheckoutSuccessPage;
