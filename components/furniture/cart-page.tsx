"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package } from "lucide-react";
import type { FurnitureProduct } from "@/lib/furniture-data";
import { PiPayButton } from "./pi-pay-button";

interface CartPageProps {
  cartItems: FurnitureProduct[];
  onBack: () => void;
  onRemoveItem: (id: string) => void;
  onOrderComplete: () => void;
}

export function CartPage({ cartItems, onBack, onRemoveItem, onOrderComplete }: CartPageProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(cartItems.map((p) => [p.id, 1]))
  );

  const updateQty = (id: string, delta: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));

  const total = cartItems.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 1), 0);

  if (cartItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 pb-24"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        {/* Back */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-11 pb-4 flex items-center" style={{ backgroundColor: "#3D2B1F" }}>
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: "rgba(245,240,232,0.12)" }}
            aria-label="Go back"
          >
            <ArrowLeft size={18} color="#F5F0E8" />
          </button>
          <h1 className="ml-3" style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "18px", fontWeight: 700 }}>
            Cart · السلة
          </h1>
        </div>

        <div className="w-20 h-20 rounded-full flex items-center justify-center mt-24" style={{ backgroundColor: "#EDE8DE" }}>
          <ShoppingCart size={36} color="#C4622D" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h2 className="text-balance" style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "22px", fontWeight: 700 }}>
            Your cart is empty
          </h2>
          <p className="mt-1" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>
            سلتك فارغة · Start browsing to add items
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ backgroundColor: "#C4622D", color: "#FAF7F2", fontFamily: "'Lato', sans-serif", boxShadow: "0 4px 14px rgba(196,98,45,0.35)" }}
        >
          Browse Items · تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "160px" }}>

      {/* Header */}
      <header className="sticky top-0 z-40 px-4 pt-10 pb-4 flex items-center gap-3" style={{ backgroundColor: "#3D2B1F" }}>
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-95"
          style={{ backgroundColor: "rgba(245,240,232,0.12)" }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} color="#F5F0E8" />
        </button>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "18px", fontWeight: 700 }}>
            Cart · السلة
          </h1>
          <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>
      </header>

      {/* Items */}
      <div className="flex-1 px-4 pt-5 space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-3.5 rounded-2xl"
            style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}
          >
            <img
              src={item.images[0]}
              alt={item.nameEn}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              style={{ backgroundColor: "#E8E0D4" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="font-bold truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "14px" }}
              >
                {item.nameEn}
              </p>
              <p
                className="truncate mt-0.5"
                style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px", direction: "rtl", textAlign: "right" }}
              >
                {item.nameAr}
              </p>
              <p className="mt-1" style={{ color: "#C4622D", fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700 }}>
                π {(item.price * (quantities[item.id] ?? 1)).toLocaleString()}
              </p>

              <div className="flex items-center justify-between mt-2">
                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-90"
                    style={{ backgroundColor: "#EDE8DE" }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} color="#3D2B1F" />
                  </button>
                  <span style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700, minWidth: "16px", textAlign: "center" }}>
                    {quantities[item.id] ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-90"
                    style={{ backgroundColor: "#EDE8DE" }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} color="#3D2B1F" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-90"
                  style={{ backgroundColor: "rgba(196,98,45,0.1)" }}
                  aria-label={`Remove ${item.nameEn} from cart`}
                >
                  <Trash2 size={12} color="#C4622D" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Order summary */}
        <div className="rounded-2xl p-4 space-y-2.5" style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "15px", fontWeight: 600 }}>
            Order Summary · ملخص الطلب
          </h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="truncate mr-2" style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "12px", maxWidth: "70%" }}>
                {item.nameEn} ×{quantities[item.id] ?? 1}
              </span>
              <span style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "12px", fontWeight: 600 }}>
                π {(item.price * (quantities[item.id] ?? 1)).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="pt-2.5" style={{ borderTop: "1px dashed #D9D0C0" }}>
            <div className="flex justify-between items-center">
              <span style={{ color: "#3D2B1F", fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700 }}>Total</span>
              <span style={{ color: "#C4622D", fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>
                π {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Pi trust badge */}
        <div
          className="flex items-center gap-3 p-3.5 rounded-2xl"
          style={{ backgroundColor: "#EDE8DE", border: "1px solid #D9D0C0" }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#3D2B1F" }}>
            <span style={{ color: "#F5F0E8", fontWeight: 700, fontSize: "15px", fontFamily: "'Playfair Display', serif" }}>π</span>
          </div>
          <div>
            <p style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700 }}>Secure Pi Payment</p>
            <p style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
              Protected by Pi Network · محمي بشبكة Pi
            </p>
          </div>
        </div>
      </div>

      {/* Sticky checkout footer */}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pt-3 pb-6 space-y-2"
        style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #D9D0C0", boxShadow: "0 -4px 20px rgba(61,43,31,0.10)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>Total · الإجمالي</span>
          <span style={{ color: "#C4622D", fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700 }}>
            π {total.toLocaleString()}
          </span>
        </div>
        <PiPayButton
          label={`Checkout · π ${total.toLocaleString()}`}
          fullWidth={true}
          onSuccess={onOrderComplete}
        />
        <div className="flex items-center justify-center gap-1.5">
          <Package size={12} color="#9E8070" />
          <span style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "10px" }}>
            Secure checkout via Pi Network
          </span>
        </div>
      </div>
    </div>
  );
}
