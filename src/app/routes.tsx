import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Shop } from "./pages/shop";
import { ProductDetail } from "./pages/product-detail";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { Login } from "./pages/login";
import { OrderConfirmation } from "./pages/order-confirmation";
import { Wishlist } from "./pages/wishlist";
import { Orders } from "./pages/orders";
import { OrderDetail } from "./pages/order-detail";
import { Contact } from "./pages/contact";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "login", Component: Login },
      { path: "wishlist", Component: Wishlist },
      { path: "orders", Component: Orders },
      { path: "order/:id", Component: OrderDetail },
      { path: "order-confirmation", Component: OrderConfirmation },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
