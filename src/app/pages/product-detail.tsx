import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { isInWishlist, toggleWishlist } from "../utils/wishlist";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/product-card";
import { mockProducts } from "../data/mock-data";

export function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    if (product) {
      setWished(isInWishlist(product.id));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2 -ml-4">
            <Link to="/shop">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl p-6 lg:p-8 mb-8 border border-border">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden mb-4">
                <ImageWithFallback
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>

              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-lg">
                  <span className="font-semibold text-green-700">{product.rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-6">
                {discountPercent > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {discountPercent}% OFF
                  </Badge>
                )}
                {product.prescription && (
                  <Badge variant="secondary">Prescription Required</Badge>
                )}
                {product.inStock && (
                  <Badge className="bg-green-500 text-white">In Stock</Badge>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <Label className="mb-3 block">Quantity</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Max 10 items per order
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-4"
                  onClick={() => {
                    if (product) {
                      toggleWishlist(product.id);
                      setWished((p) => !p);
                    }
                  }}
                >
                  <Heart className={`h-5 w-5 ${wished ? "text-destructive" : ""}`} />
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">100% Genuine Product</p>
                    <p className="text-sm text-muted-foreground">Sourced from authorized distributors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Specifications */}
        <div className="bg-white rounded-xl p-6 lg:p-8 mb-8 border border-border">
          <Tabs defaultValue="description">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">About this product</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This is a high-quality healthcare product manufactured under strict quality control measures. 
                  It has been tested and approved by relevant healthcare authorities. Please read the label carefully 
                  before use and follow the recommended dosage.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Benefits:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Effective and fast-acting formula</li>
                  <li>Manufactured by a trusted brand</li>
                  <li>Quality tested and certified</li>
                  <li>Safe for regular use as directed</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Brand</span>
                  <span className="font-medium">Generic Brand</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Manufacturer</span>
                  <span className="font-medium">Healthcare Ltd.</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Country of Origin</span>
                  <span className="font-medium">India</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Prescription Required</span>
                  <span className="font-medium">{product.prescription ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Return Policy</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center gap-8 pb-6 border-b border-border">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{product.rating}</div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">Customer {i}</p>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${
                                j < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-muted-foreground">
                      Great product! Works exactly as described. Fast delivery and genuine quality. 
                      Highly recommended for anyone looking for quality healthcare products.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
