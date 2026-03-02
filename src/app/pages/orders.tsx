import { Link } from "react-router";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { mockOrders, Order } from "../data/mock-orders";

export function Orders() {
  const [orders] = useState<Order[]>(mockOrders);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground">You have not placed any orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const total = order.items.reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                );
                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>₹{total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-primary hover:underline"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
