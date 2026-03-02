import { useParams, Link } from "react-router";
import { mockOrders, Order } from "../data/mock-orders";
import { Button } from "../components/ui/button";
import { CheckCircle, Package, Truck, CreditCard, Download } from "lucide-react";

export function OrderDetail() {
  const { id } = useParams();
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Order not found.</p>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center mb-8 border border-border">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Details</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Order Number: <strong>{order.id}</strong>
          </p>
          <p className="text-lg text-muted-foreground">
            Placed on {formatDate(order.date)}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-6">Items in Your Order</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
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
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-6">Price Summary</h2>
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

        {/* Back / Actions */}
        <div className="flex gap-4">
          <Button size="lg" asChild className="flex-1 gap-2">
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
