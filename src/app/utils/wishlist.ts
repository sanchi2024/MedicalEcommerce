// utilities for managing wishlist items in localStorage

export function getWishlistIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWishlistIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("wishlist", JSON.stringify(ids));
}

export function toggleWishlist(id: string) {
  const ids = getWishlistIds();
  if (ids.includes(id)) {
    saveWishlistIds(ids.filter((i) => i !== id));
  } else {
    saveWishlistIds([...ids, id]);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("wishlist-changed"));
  }
}

export function isInWishlist(id: string) {
  return getWishlistIds().includes(id);
}
