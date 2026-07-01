import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/cart.store";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface CardForm {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (v: string) => {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();

  const [form, setForm] = useState<CardForm>({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CardForm>>({});

  const validate = () => {
    const e: Partial<CardForm> = {};
    if (!form.name.trim()) e.name = "El nombre es requerido";
    if (form.number.replace(/\s/g, "").length < 16) e.number = "Número de tarjeta inválido";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Fecha inválida (MM/AA)";
    if (form.cvv.length < 3) e.cvv = "CVV inválido";
    return e;
  };

  const handleChange = (field: keyof CardForm, raw: string) => {
    let value = raw;
    if (field === "number") value = formatCardNumber(raw);
    if (field === "expiry") value = formatExpiry(raw);
    if (field === "cvv") value = raw.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const orderItems = [...items];
    const orderTotal = total();
    setTimeout(() => {
      clearCart();
      navigate("/checkout/success", { state: { items: orderItems, total: orderTotal } });
    }, 2000);
  };

  if (items.length === 0) {
    navigate("/movies");
    return null;
  }

  return (
    <PageContainer>
      <div className="py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Pago seguro</h1>
            <p className="mt-1 text-muted-foreground">
              Simulación de pasarela de pagos
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Payment form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Datos de la tarjeta</h2>
                  <Badge variant="secondary" className="ml-auto">
                    <Lock className="mr-1 h-3 w-3" />
                    Simulación segura
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Nombre en la tarjeta
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={form.number}
                        onChange={(e) => handleChange("number", e.target.value)}
                        className={`pr-12 font-mono ${errors.number ? "border-destructive" : ""}`}
                      />
                      <CreditCard className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    {errors.number && (
                      <p className="mt-1 text-xs text-destructive">{errors.number}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Vencimiento
                      </label>
                      <Input
                        placeholder="MM/AA"
                        value={form.expiry}
                        onChange={(e) => handleChange("expiry", e.target.value)}
                        className={`font-mono ${errors.expiry ? "border-destructive" : ""}`}
                      />
                      {errors.expiry && (
                        <p className="mt-1 text-xs text-destructive">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">CVV</label>
                      <Input
                        placeholder="123"
                        value={form.cvv}
                        onChange={(e) => handleChange("cvv", e.target.value)}
                        className={`font-mono ${errors.cvv ? "border-destructive" : ""}`}
                        type="password"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-destructive">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
                <strong>Modo simulación:</strong> no se realizará ningún cargo real.
                Usa cualquier número de tarjeta de 16 dígitos para continuar.
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Procesando pago...
                  </span>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pagar S/ {total().toFixed(2)}
                  </>
                )}
              </Button>
            </form>

            {/* Order summary */}
            <div className="h-fit rounded-xl border bg-card p-6">
              <h2 className="text-lg font-bold">Tu pedido</h2>
              <Separator className="my-4" />
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate max-w-[180px] text-muted-foreground">
                      {item.title}
                    </span>
                    <span>S/ {item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>S/ {total().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
