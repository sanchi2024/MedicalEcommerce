import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="gap-2">
              <Link to="/">
                <Home className="h-5 w-5" />
                Go to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link to="/shop">
                <Search className="h-5 w-5" />
                Browse Products
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-xl p-8 border border-border">
            <h3 className="font-semibold mb-4">Popular Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/shop?category=medicines" className="text-primary hover:underline">
                Medicines
              </Link>
              <Link to="/shop?category=wellness" className="text-primary hover:underline">
                Wellness
              </Link>
              <Link to="/shop?category=devices" className="text-primary hover:underline">
                Healthcare Devices
              </Link>
              <Link to="/cart" className="text-primary hover:underline">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
