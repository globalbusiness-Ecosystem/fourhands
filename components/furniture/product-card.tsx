"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { FurnitureProduct } from "@/lib/furniture-data";

interface ProductCardProps {
  product: FurnitureProduct;
  onClick: (product: FurnitureProduct) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(product.inWishlist ?? false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <button
      type="button"
      className="flex flex-col rounded-2xl overflow-hidden text-left w-full transition-all active:scale-[0.97]"
      style={{
        backgroundColor: "#FAF7F2",
        border: "1px solid #E5DDD0",
        boxShadow: "0 2px 12px rgba(61,43,31,0.07)",
      }}
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3", backgroundColor: "#EDE8DE" }}
      >
        <img
          src={product.images[0]}
          alt={product.nameEn}
          className="w-full h-full object-cover"
        />

        {/* Top-left badge */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount ? (
            <span
              style={{
                backgroundColor: "#C4622D",
                color: "#FAF7F2",
                fontFamily: "'Lato', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                borderRadius: "100px",
                padding: "2px 7px",
              }}
            >
              -{discount}%
            </span>
          ) : product.isNew ? (
            <span
              style={{
                backgroundColor: "#3D2B1F",
                color: "#F5F0E8",
                fontFamily: "'Lato', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                borderRadius: "100px",
                padding: "2px 7px",
              }}
            >
              NEW
            </span>
          ) : null}
        </div>

        {/* Condition badge */}
        <span
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full"
          style={{
            backgroundColor:
              product.condition === "New"
                ? "rgba(61,43,31,0.82)"
                : "rgba(250,247,242,0.88)",
            color: product.condition === "New" ? "#FAF7F2" : "#7A5C4A",
            fontFamily: "'Lato', sans-serif",
            fontSize: "9px",
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        >
          {product.condition}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{
            backgroundColor: "rgba(250,247,242,0.92)",
            boxShadow: "0 1px 4px rgba(61,43,31,0.18)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={13}
            fill={wishlisted ? "#C4622D" : "none"}
            color={wishlisted ? "#C4622D" : "#7A5C4A"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1">
        {/* Arabic name */}
        <p
          className="text-right leading-snug line-clamp-1"
          style={{
            color: "#A8927E",
            fontFamily: "'Lato', sans-serif",
            fontSize: "9px",
            direction: "rtl",
          }}
        >
          {product.nameAr}
        </p>

        {/* English name */}
        <h3
          className="leading-snug line-clamp-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#3D2B1F",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {product.nameEn}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={9} fill="#C4622D" color="#C4622D" />
          <span style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "10px" }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-0.5">
          <span
            className="font-bold"
            style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif", fontSize: "14px" }}
          >
            π {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              className="line-through"
              style={{ color: "#B8A99A", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}
            >
              π {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center gap-1.5 mt-1 pt-2" style={{ borderTop: "1px solid #EDE8DE" }}>
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
            style={{ backgroundColor: "#3D2B1F", color: "#F5F0E8", fontFamily: "'Lato', sans-serif", fontSize: "8px" }}
          >
            {product.seller.name[0]}
          </div>
          <span
            className="truncate"
            style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "9.5px" }}
          >
            {product.seller.name}
          </span>
          {product.seller.verified && (
            <span
              className="flex-shrink-0 ml-auto px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(196,98,45,0.10)",
                color: "#C4622D",
                fontFamily: "'Lato', sans-serif",
                fontSize: "8px",
                fontWeight: 700,
              }}
            >
              ✓
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
