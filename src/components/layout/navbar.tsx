import { Film, Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useCartStore } from "@/store/cart.store";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { label: "Inicio", href: "/" },
  { label: "Películas", href: "/movies" },
];

export function Navbar() {
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Film className="h-5 w-5 text-blue-600" />
          <span className="text-lg">CineSpoilerS</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) => `
                rounded-md px-3 py-2 text-sm font-medium transition-colors
                hover:bg-accent hover:text-accent-foreground
                ${isActive ? "text-blue-600" : "text-muted-foreground"}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) => `
                      rounded-md px-3 py-2 text-sm font-medium transition-colors
                      hover:bg-accent hover:text-accent-foreground
                      ${isActive ? "text-blue-600" : "text-muted-foreground"}
                    `}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `
                    rounded-md px-3 py-2 text-sm font-medium transition-colors
                    hover:bg-accent hover:text-accent-foreground
                    ${isActive ? "text-blue-600" : "text-muted-foreground"}
                  `}
                >
                  Carrito {cartCount > 0 && `(${cartCount})`}
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
