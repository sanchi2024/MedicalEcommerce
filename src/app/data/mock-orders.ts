import { mockProducts } from "./mock-data";
import { Product } from "../components/product-card";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string; // ISO or locale string
  status: "Placed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
}

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2026-02-20",
    status: "Delivered",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[3], quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    date: "2026-01-15",
    status: "Processing",
    items: [{ product: mockProducts[5], quantity: 1 }],
  },
  {
    id: "ORD003",
    date: "2025-12-01",
    status: "Shipped",
    items: [
      { product: mockProducts[2], quantity: 1 },
      { product: mockProducts[4], quantity: 3 },
    ],
  },
];
