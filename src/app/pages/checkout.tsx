import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Wallet, Banknote, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import { mockProducts } from "../data/mock-data";

export function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Mock cart data
  const cartItems = [
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to order confirmation
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required className="mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required className="mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required className="mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input id="address" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" defaultValue="India" required className="mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions for delivery..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-semibold mb-6">Delivery Options</h2>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        <div>
                          <p className="font-medium">Standard Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Delivery in 3-5 business days
                          </p>
                        </div>
                      </Label>
                    </div>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer">
                        <div>
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Delivery in 1-2 business days
                          </p>
                        </div>
                      </Label>
                    </div>
                    <span className="font-semibold">₹100</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit/Debit Card */}
                  <div className="border border-border rounded-lg mb-3 overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex items-center gap-2 flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </Label>
                    </div>
                    {paymentMethod === "card" && (
                      <div className="px-4 pb-4 space-y-4 bg-muted/30">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-2" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" className="mt-2" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI */}
                  <div className="border border-border rounded-lg mb-3 overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer flex items-center gap-2 flex-1">
                        <Wallet className="h-5 w-5 text-primary" />
                        <span className="font-medium">UPI</span>
                      </Label>
                    </div>
                    {paymentMethod === "upi" && (
                      <div className="px-4 pb-4 bg-muted/30">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer flex items-center gap-2 flex-1">
                      <Banknote className="h-5 w-5 text-primary" />
                      <span className="font-medium">Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
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
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button type="submit" size="lg" className="w-full gap-2 mb-4">
                  <Lock className="h-4 w-4" />
                  Place Order
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
