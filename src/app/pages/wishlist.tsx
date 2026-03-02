import { useEffect, useState } from "react";
import { ProductCard, Product } from "../components/product-card";
import { mockProducts } from "../data/mock-data";
import { getWishlistIds, toggleWishlist } from "../utils/wishlist";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export function Wishlist() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const ids = getWishlistIds();
    setItems(mockProducts.filter((p) => ids.includes(p.id)));
  }, []);

  const removeItem = (id: string) => {
    toggleWishlist(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">You haven’t added any products to your wishlist yet.</p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  className="absolute top-2 right-2 text-sm text-destructive underline"
                  onClick={() => removeItem(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
