import { Link } from "react-router";
import { ArrowRight, Shield, Truck, CreditCard, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/product-card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { mockProducts, categories, testimonials } from "../data/mock-data";

export function Home() {
  const bestSellers = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                💊 100% Genuine Medicines
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Order medicines, wellness products, and healthcare devices online. 
                Get fast, reliable delivery with the best prices guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/upload-prescription">
                    Upload Prescription
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-primary">500K+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                  alt="Healthcare professional"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Verified Products</p>
                    <p className="text-sm text-muted-foreground">100% Genuine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our wide range of healthcare and wellness products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Best Selling Products</h2>
              <p className="text-muted-foreground">
                Most popular items trusted by our customers
              </p>
            </div>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/shop">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Banner 1 */}
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-12 relative z-10">
                <div className="max-w-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Flat 25% OFF on First Order
                  </h3>
                  <p className="text-white/90 mb-6">
                    Use code: FIRST25 at checkout
                  </p>
                  <Button variant="secondary" asChild>
                    <Link to="/shop">Shop Now</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80"
                  alt="Medicines"
                  className="w-64 h-64 object-cover"
                />
              </div>
            </div>

            {/* Banner 2 */}
            <div className="relative bg-gradient-to-br from-accent to-accent/80 rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-12 relative z-10">
                <div className="max-w-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Free Home Delivery
                  </h3>
                  <p className="text-white/90 mb-6">
                    On orders above ₹500
                  </p>
                  <Button variant="secondary" asChild>
                    <Link to="/shop">Order Now</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80"
                  alt="Healthcare"
                  className="w-64 h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MediCare?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best healthcare experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Genuine Products</h3>
              <p className="text-muted-foreground">
                All medicines and healthcare products are sourced directly from manufacturers and certified distributors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your orders delivered within 24-48 hours. Express delivery available in select cities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-muted-foreground">
                Multiple payment options with 100% secure checkout. Your data is encrypted and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands of happy customers across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{testimonial.comment}</p>
                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
