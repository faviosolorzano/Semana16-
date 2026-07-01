import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "@/store/cart.store";

const mockMovie = {
  id: 1,
  title: "Interstellar",
  poster_path: "/poster.jpg",
  price: 29.90,
};

const mockMovie2 = {
  id: 2,
  title: "Dune",
  poster_path: "/dune.jpg",
  price: 29.90,
};

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("starts with an empty cart", () => {
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("adds an item to the cart", () => {
    useCartStore.getState().addItem(mockMovie);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].title).toBe("Interstellar");
  });

  it("does not add the same item twice", () => {
    useCartStore.getState().addItem(mockMovie);
    useCartStore.getState().addItem(mockMovie);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("removes an item from the cart", () => {
    useCartStore.getState().addItem(mockMovie);
    useCartStore.getState().removeItem(mockMovie.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates the total correctly", () => {
    useCartStore.getState().addItem(mockMovie);
    useCartStore.getState().addItem(mockMovie2);
    expect(useCartStore.getState().total()).toBeCloseTo(59.80);
  });

  it("clears the cart", () => {
    useCartStore.getState().addItem(mockMovie);
    useCartStore.getState().addItem(mockMovie2);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
