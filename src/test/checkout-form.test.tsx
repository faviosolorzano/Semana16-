import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCartStore } from "@/store/cart.store";
import CheckoutPage from "@/pages/checkout-page";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderCheckout = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("CheckoutPage", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [{ id: 1, title: "Interstellar", poster_path: null, price: 29.90 }],
    });
  });

  it("renders the payment form", () => {
    renderCheckout();
    expect(screen.getByText("Pago seguro")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("1234 5678 9012 3456")).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderCheckout();
    fireEvent.click(screen.getByRole("button", { name: /pagar/i }));
    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
      expect(screen.getByText("Número de tarjeta inválido")).toBeInTheDocument();
    });
  });

  it("formats the card number with spaces", () => {
    renderCheckout();
    const input = screen.getByPlaceholderText("1234 5678 9012 3456");
    fireEvent.change(input, { target: { value: "1234567890123456" } });
    expect((input as HTMLInputElement).value).toBe("1234 5678 9012 3456");
  });

  it("shows total amount on the pay button", () => {
    renderCheckout();
    expect(screen.getByRole("button", { name: /pagar s\/ 29\.90/i })).toBeInTheDocument();
  });
});
