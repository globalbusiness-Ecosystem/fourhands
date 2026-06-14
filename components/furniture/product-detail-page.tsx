"use client";

import { useState } from "react";
import {
  ArrowLeft, Heart, Share2, Star,
  Package, Ruler, Tag, MapPin, ShieldCheck,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/furniture-data";
import type { FurnitureProduct } from "@/lib/furniture-data";
import { ProductCard } from "./product-card";
import { PiPayButton } from "./pi-pay-button";

interface ProductDetailPageProps {
  product: FurnitureProduct;
  onBack: () => void;
  onBuy: (product: FurnitureProduct) => void;
  onProductClick: (product: FurnitureProduct) => void;
}

export function ProductDetailPage({ product, onBack, onBuy, onProductClick }: ProductDetailPageProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(product.inWishlist ?? false);


  const similar = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.style === product.style)
  ).slice(0, 4);

  const categoryLabel = CATEGORIES.find((c) => c.id === product.category);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "104px" }}>

      {/* ── Image Gallery ── */}
      <div className="relative" style={{ backgroundColor: "#E8E0D4" }}>
        <img
          src={product.images[activeImage]}
          alt={product.nameEn}
          className="w-full object-cover"
          style={{ aspectRatio: "4/3" }}
        />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-11 pb-4">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: "rgba(250,247,242,0.92)", boxShadow: "0 2px 8px rgba(61,43,31,0.18)" }}
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft size={18} color="#3D2B1F" />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95"
              style={{ backgroundColor: "rgba(250,247,242,0.92)", boxShadow: "0 2px 8px rgba(61,43,31,0.18)" }}
              aria-label="Share listing"
            >
              <Share2 size={16} color="#3D2B1F" />
            </button>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95"
              style={{ backgroundColor: "rgba(250,247,242,0.92)", boxShadow: "0 2px 8px rgba(61,43,31,0.18)" }}
              onClick={() => setWishlisted(!wishlisted)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={16} fill={wishlisted ? "#C4622D" : "none"} color={wishlisted ? "#C4622D" : "#3D2B1F"} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Discount badge */}
        {discount && (
          <div
            className="absolute top-14 left-4 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: "#C4622D", color: "#FAF7F2", fontFamily: "'Lato', sans-serif" }}
          >
            -{discount}% OFF
          </div>
        )}

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  width: "52px",
                  height: "52px",
                  border: `2px solid ${activeImage === idx ? "#C4622D" : "rgba(250,247,242,0.5)"}`,
                  opacity: activeImage === idx ? 1 : 0.6,
                  boxShadow: activeImage === idx ? "0 2px 8px rgba(196,98,45,0.4)" : "none",
                }}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-4 pt-5">

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {categoryLabel && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ backgroundColor: "#EDE8DE", color: "#7A5C4A", fontFamily: "'Lato', sans-serif" }}
            >
              {categoryLabel.nameEn} · {categoryLabel.nameAr}
            </span>
          )}
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: product.condition === "New" ? "#3D2B1F" : "#EDE8DE",
              color: product.condition === "New" ? "#F5F0E8" : "#7A5C4A",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {product.condition}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
            style={{ backgroundColor: "#EDE8DE", color: "#7A5C4A", fontFamily: "'Lato', sans-serif" }}
          >
            {product.style.replace("-", " ")}
          </span>
        </div>

        {/* Arabic name */}
        <p
          className="mb-1 leading-relaxed"
          style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "13px", direction: "rtl", textAlign: "right" }}
        >
          {product.nameAr}
        </p>

        {/* English name */}
        <h1
          className="text-balance mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "22px", fontWeight: 700, lineHeight: 1.25 }}
        >
          {product.nameEn}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={11} fill={i <= Math.round(product.rating) ? "#C4622D" : "none"} color="#C4622D" strokeWidth={1.5} />
          ))}
          <span style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>
            {product.rating} · {product.reviewCount} reviews
          </span>
        </div>

        {/* Price + Buy Now */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-baseline gap-3">
            <span style={{ color: "#C4622D", fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 700 }}>
              π {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="line-through" style={{ color: "#B8A99A", fontFamily: "'Lato', sans-serif", fontSize: "16px" }}>
                π {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <PiPayButton
            fullWidth={false}
            label="Buy Now"
            amount={product.price}
            productId={product.id}
            productName={product.name}
            onSuccess={() => onBuy(product)}
            style={{ padding: "10px 18px", fontSize: "13px", borderRadius: "14px", whiteSpace: "nowrap" }}
          />
        </div>

        {/* Seller card */}
        <div
          className="flex items-center gap-3 p-3.5 rounded-2xl mb-5"
          style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
            style={{ backgroundColor: "#3D2B1F", color: "#F5F0E8", fontFamily: "'Playfair Display', serif" }}
          >
            {product.seller.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-bold truncate" style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "14px" }}>
                {product.seller.name}
              </p>
              {product.seller.verified && <ShieldCheck size={14} color="#C4622D" strokeWidth={2} />}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} fill="#C4622D" color="#C4622D" />
              <span style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
                {product.seller.rating} · {product.seller.reviewCount} reviews · {product.seller.totalSales} sales
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} color="#9E8070" />
              <span style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
                {product.seller.location}
              </span>
            </div>
          </div>
        </div>

        {/* Product details card */}
        <div className="rounded-2xl p-4 mb-5 space-y-3.5" style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "15px", fontWeight: 600 }}>
            Product Details · تفاصيل المنتج
          </h3>

          {[
            { icon: Ruler, label: "Dimensions · الأبعاد", value: `W ${product.dimensions.width} × H ${product.dimensions.height} × D ${product.dimensions.depth} ${product.dimensions.unit}` },
            { icon: Package, label: "Material · المادة", value: product.material },
            { icon: Tag, label: "Style · الأسلوب", value: product.style.replace("-", " "), capitalize: true },
          ].map(({ icon: Icon, label, value, capitalize }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EDE8DE" }}>
                <Icon size={14} color="#C4622D" />
              </div>
              <div>
                <p className="font-bold" style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>{label}</p>
                <p className={capitalize ? "capitalize" : ""} style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "15px", fontWeight: 600 }}>
            Description · الوصف
          </h3>
          <p className="leading-relaxed" style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>
            {product.descriptionEn}
          </p>
          <p
            className="leading-relaxed mt-2"
            style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "13px", direction: "rtl", textAlign: "right" }}
          >
            {product.descriptionAr}
          </p>
        </div>

        {/* Pi trust badge */}
        <div
          className="flex items-center gap-3 p-3.5 rounded-2xl mb-6"
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

        {/* Similar items */}
        {similar.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "17px", fontWeight: 600 }}>
              Similar Items · قطع مشابهة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} onClick={onProductClick} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky Buy Footer ── */}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pt-3 pb-6"
        style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #D9D0C0", boxShadow: "0 -4px 20px rgba(61,43,31,0.10)" }}
      >
        <div className="flex gap-3">
          <button
            type="button"
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
            style={{ backgroundColor: "#EDE8DE", border: "1px solid #D9D0C0" }}
            onClick={() => setWishlisted(!wishlisted)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} fill={wishlisted ? "#C4622D" : "none"} color={wishlisted ? "#C4622D" : "#7A5C4A"} />
          </button>
          <PiPayButton
            fullWidth={true}
            label={`Buy Now · π ${product.price.toLocaleString()}`}
            amount={product.price}
            productId={product.id}
            productName={product.name}
            onSuccess={() => onBuy(product)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
