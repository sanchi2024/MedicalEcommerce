import { Link } from "react-router";
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown, Package } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { getWishlistIds } from "../utils/wishlist";

export function Navbar() {
  const [cartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const update = () => setWishlistCount(getWishlistIds().length);
    update();
    window.addEventListener("wishlist-changed", update);
    return () => window.removeEventListener("wishlist-changed", update);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <p>Free Delivery on orders above ₹500</p>
            <div className="flex gap-4">
              <Link to="/track-order" className="hover:underline">Track Order</Link>
              <Link to="/help" className="hover:underline">Help Center</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="white"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-primary">MediCare</span>
              <span className="text-xs text-muted-foreground">Your Health Partner</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for medicines, wellness products, and more..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  <Menu className="h-5 w-5" />
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=medicines">Medicines</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=wellness">Wellness</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=devices">Healthcare Devices</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=personal-care">Personal Care</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=baby-care">Baby Care</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop?category=nutrition">Nutrition & Supplements</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Orders */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/orders">
                <Package className="h-5 w-5" />
              </Link>
            </Button>

            {/* Login */}
            <Button variant="ghost" asChild>
              <Link to="/login" className="gap-2">
                <User className="h-5 w-5" />
                Login
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-6 py-3 text-sm">
            <Link to="/shop" className="hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/shop?category=medicines" className="hover:text-primary transition-colors">
              Medicines
            </Link>
            <Link to="/shop?category=wellness" className="hover:text-primary transition-colors">
              Wellness
            </Link>
            <Link to="/shop?category=devices" className="hover:text-primary transition-colors">
              Healthcare Devices
            </Link>
            <Link to="/shop?offer=true" className="text-destructive hover:text-destructive/80 transition-colors">
              Special Offers
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
