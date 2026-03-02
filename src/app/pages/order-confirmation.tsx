import { Link } from "react-router";
import { CheckCircle, Package, Truck, CreditCard, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mock-data";

export function OrderConfirmation() {
  // Mock order data
  const orderNumber = "MC" + Math.floor(Math.random() * 1000000);
  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const orderItems = [
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 1 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Message */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center mb-8 border border-border">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-lg">
            <span className="text-sm font-medium">Order Number:</span>
            <span className="text-lg font-bold">{orderNumber}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-6">Order Status</h2>
          <div className="relative">
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
            <div className="relative grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Order Placed</p>
                <p className="text-xs text-muted-foreground mt-1">{orderDate}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Shipped</p>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-xs text-muted-foreground mt-1">Est. {estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>

          {/* Items */}
          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            {orderItems.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-semibold text-primary">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-semibold">Total Paid</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <div className="text-muted-foreground">
            <p className="font-medium text-foreground mb-1">John Doe</p>
            <p>123 Health Street</p>
            <p>Medical District</p>
            <p>Mumbai, Maharashtra 400001</p>
            <p className="mt-2">Phone: +91 1234567890</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-muted-foreground">****  **** **** 3456</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="flex-1 gap-2">
            <Link to="/shop">
              Continue Shopping
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="flex-1 gap-2">
            <Download className="h-5 w-5" />
            Download Invoice
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Contact our customer support team for any questions about your order
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
