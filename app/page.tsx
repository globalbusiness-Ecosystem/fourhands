"use client";

import { useState } from "react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { BottomNav } from "@/components/furniture/bottom-nav";
import { HomePage } from "@/components/furniture/home-page";
import { BrowsePage } from "@/components/furniture/browse-page";
import { ProductDetailPage } from "@/components/furniture/product-detail-page";
import { SellPage } from "@/components/furniture/sell-page";
import { OrdersPage } from "@/components/furniture/orders-page";
import { ProfilePage } from "@/components/furniture/profile-page";
import { CartPage } from "@/components/furniture/cart-page";
import { PRODUCTS } from "@/lib/furniture-data";
import type { FurnitureProduct } from "@/lib/furniture-data";

type Page = "home" | "browse" | "sell" | "orders" | "profile";

export default function FourHandsApp() {
  const { userData } = usePiAuth();
  const [activePage, setActivePage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<FurnitureProduct[]>([]);

  const handleNavigate = (page: Page, productId?: string) => {
    if (productId) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        return;
      }
    }
    setSelectedProduct(null);
    setShowCart(false);
    setActivePage(page);
  };

  const handleProductClick = (product: FurnitureProduct) => {
    setSelectedProduct(product);
    setShowCart(false);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleBuy = (product: FurnitureProduct) => {
    // Add to cart and show cart if not already there
    setCartItems((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    );
    setSelectedProduct(null);
    setShowCart(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setShowCart(false);
    setActivePage("orders");
  };

  // Cart overlay
  if (showCart) {
    return (
      <div className="max-w-md mx-auto min-h-screen overflow-hidden">
        <CartPage
          cartItems={cartItems}
          onBack={() => setShowCart(false)}
          onRemoveItem={handleRemoveCartItem}
          onOrderComplete={handleOrderComplete}
        />
      </div>
    );
  }

  // Product detail overlay
  if (selectedProduct) {
    return (
      <div className="max-w-md mx-auto min-h-screen overflow-hidden">
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBack}
          onBuy={handleBuy}
          onProductClick={handleProductClick}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen overflow-hidden relative">
      {activePage === "home" && (
        <HomePage
          onNavigate={handleNavigate}
          onProductClick={handleProductClick}
          username={userData?.username}
        />
      )}
      {activePage === "browse" && (
        <BrowsePage onProductClick={handleProductClick} />
      )}
      {activePage === "sell" && <SellPage />}
      {activePage === "orders" && <OrdersPage />}
      {activePage === "profile" && (
        <ProfilePage
          userData={userData}
          onNavigate={handleNavigate}
          onProductClick={handleProductClick}
        />
      )}

      <BottomNav
        activePage={activePage}
        onNavigate={(page) => {
          setSelectedProduct(null);
          setShowCart(false);
          setActivePage(page);
        }}
      />
    </div>
  );
}
