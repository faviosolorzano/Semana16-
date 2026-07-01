import { beforeEach, describe, expect, it } from "vitest";

import { useWishlistStore } from "@/store/wishlist.store";

const mockMovie = { id: 42, title: "Oppenheimer", poster_path: "/opp.jpg" };

describe("Wishlist Store", () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
  });

  it("starts empty", () => {
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("adds a movie to the wishlist", () => {
    useWishlistStore.getState().toggle(mockMovie);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("removes a movie when toggled again", () => {
    useWishlistStore.getState().toggle(mockMovie);
    useWishlistStore.getState().toggle(mockMovie);
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("isWishlisted returns true when movie is in list", () => {
    useWishlistStore.getState().toggle(mockMovie);
    expect(useWishlistStore.getState().isWishlisted(42)).toBe(true);
  });

  it("isWishlisted returns false when movie is not in list", () => {
    expect(useWishlistStore.getState().isWishlisted(99)).toBe(false);
  });
});
