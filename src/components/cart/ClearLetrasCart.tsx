"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";

export default function ClearLetrasCart() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe ejecutarse una vez, al confirmarse el pago.
  }, []);

  return null;
}
