"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCTS, CATEGORIES, STYLES } from "@/lib/furniture-data";
import { ProductCard } from "./product-card";
import type { FurnitureProduct } from "@/lib/furniture-data";

interface BrowsePageProps {
  onProductClick: (product: FurnitureProduct) => void;
}

const PRICE_RANGES = [
  { id: "all",      en: "All",        ar: "الكل",       min: 0,    max: Infinity },
  { id: "u500",     en: "Under π500", ar: "أقل π500",   min: 0,    max: 500 },
  { id: "500-1500", en: "π500–1,500", ar: "π500–1,500", min: 500,  max: 1500 },
  { id: "1500-3k",  en: "π1,500–3k",  ar: "π1,500–3k",  min: 1500, max: 3000 },
  { id: "o3k",      en: "Over π3k",   ar: "أكثر π3k",  min: 3000, max: Infinity },
];

const MATERIALS = ["All", "Wood", "Metal", "Marble", "Rattan", "Ceramic", "Linen", "Leather", "Fabric"];

function Chip({
  label, active, onClick, terracotta = false,
}: {
  label: string; active: boolean; onClick: () => void; terracotta?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
      style={{
        backgroundColor: active ? (terracotta ? "#C4622D" : "#3D2B1F") : "#FAF7F2",
        color: active ? "#FAF7F2" : "#3D2B1F",
        fontFamily: "'Lato', sans-serif",
        border: `1px solid ${active ? "transparent" : "#D9D0C0"}`,
      }}
    >
      {label}
    </button>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}
      >
        {title}
      </p>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </div>
  );
}

export function BrowsePage({ onProductClick }: BrowsePageProps) {
  const [query,       setQuery]       = useState("");
  const [category,    setCategory]    = useState("all");
  const [style,       setStyle]       = useState("all");
  const [priceRange,  setPriceRange]  = useState("all");
  const [material,    setMaterial]    = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCount = [
    category !== "all",
    style !== "all",
    priceRange !== "all",
    material !== "All",
  ].filter(Boolean).length;

  const clearAll = () => {
    setCategory("all");
    setStyle("all");
    setPriceRange("all");
    setMaterial("All");
  };

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    const range = PRICE_RANGES.find((r) => r.id === priceRange)!;
    return (
      (q === "" ||
        p.nameEn.toLowerCase().includes(q) ||
        p.nameAr.includes(query) ||
        p.material.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))) &&
      (category === "all" || p.category === category) &&
      (style === "all" || p.style === style) &&
      p.price >= range.min &&
      p.price < range.max &&
      (material === "All" || p.material.toLowerCase().includes(material.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "84px" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 px-4 pt-10 pb-3" style={{ backgroundColor: "#3D2B1F" }}>
        <h1
          className="mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "20px", fontWeight: 700 }}
        >
          Browse · تصفح
        </h1>

        <div className="flex gap-2">
          <div
            className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
            style={{ backgroundColor: "rgba(245,240,232,0.10)", border: "1px solid rgba(217,208,192,0.18)" }}
          >
            <Search size={14} color="#9E8070" />
            <input
              type="text"
              placeholder="Search furniture..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#F5F0E8", fontFamily: "'Lato', sans-serif" }}
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={13} color="#9E8070" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl transition-all active:scale-95"
            style={{
              backgroundColor: filtersOpen ? "#C4622D" : "rgba(245,240,232,0.12)",
              border: "1px solid rgba(217,208,192,0.18)",
            }}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label="Toggle filters"
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={16} color="#F5F0E8" />
            {filtersOpen ? <ChevronUp size={13} color="#F5F0E8" /> : <ChevronDown size={13} color="#F5F0E8" />}
            {activeCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#FAF7F2",
                  color: "#C4622D",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Active filter pills */}
        {!filtersOpen && activeCount > 0 && (
          <div className="flex gap-2 mt-2.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
            {category !== "all" && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: "rgba(196,98,45,0.25)", color: "#EAA07A", fontFamily: "'Lato', sans-serif" }}
              >
                {CATEGORIES.find((c) => c.id === category)?.nameEn}
                <button type="button" onClick={() => setCategory("all")} aria-label="Remove category filter">
                  <X size={10} color="#EAA07A" />
                </button>
              </span>
            )}
            {style !== "all" && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: "rgba(196,98,45,0.25)", color: "#EAA07A", fontFamily: "'Lato', sans-serif" }}
              >
                {STYLES.find((s) => s.id === style)?.nameEn}
                <button type="button" onClick={() => setStyle("all")} aria-label="Remove style filter">
                  <X size={10} color="#EAA07A" />
                </button>
              </span>
            )}
            {priceRange !== "all" && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: "rgba(196,98,45,0.25)", color: "#EAA07A", fontFamily: "'Lato', sans-serif" }}
              >
                {PRICE_RANGES.find((r) => r.id === priceRange)?.en}
                <button type="button" onClick={() => setPriceRange("all")} aria-label="Remove price filter">
                  <X size={10} color="#EAA07A" />
                </button>
              </span>
            )}
            {material !== "All" && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: "rgba(196,98,45,0.25)", color: "#EAA07A", fontFamily: "'Lato', sans-serif" }}
              >
                {material}
                <button type="button" onClick={() => setMaterial("All")} aria-label="Remove material filter">
                  <X size={10} color="#EAA07A" />
                </button>
              </span>
            )}
          </div>
        )}
      </header>

      {/* ── Filter Panel ── */}
      {filtersOpen && (
        <div
          className="px-4 pt-4 pb-4 space-y-4"
          style={{ backgroundColor: "#FAF7F2", borderBottom: "1px solid #D9D0C0" }}
        >
          <FilterSection title="Category · الفئة">
            <Chip label="All" active={category === "all"} onClick={() => setCategory("all")} />
            {CATEGORIES.map((c) => (
              <Chip key={c.id} label={c.nameEn} active={category === c.id} onClick={() => setCategory(c.id)} />
            ))}
          </FilterSection>
          <FilterSection title="Style · الأسلوب">
            <Chip label="All" active={style === "all"} onClick={() => setStyle("all")} />
            {STYLES.map((s) => (
              <Chip key={s.id} label={s.nameEn} active={style === s.id} onClick={() => setStyle(s.id)} />
            ))}
          </FilterSection>
          <FilterSection title="Price · السعر">
            {PRICE_RANGES.map((r) => (
              <Chip key={r.id} label={r.en} active={priceRange === r.id} onClick={() => setPriceRange(r.id)} terracotta />
            ))}
          </FilterSection>
          <FilterSection title="Material · المادة">
            {MATERIALS.map((m) => (
              <Chip key={m} label={m} active={material === m} onClick={() => setMaterial(m)} />
            ))}
          </FilterSection>
          {activeCount > 0 && (
            <button
              type="button"
              className="text-xs font-bold underline"
              style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}
              onClick={clearAll}
            >
              Clear all filters · مسح الفلاتر
            </button>
          )}
        </div>
      )}

      {/* ── Results ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif" }}>
            {filtered.length} {filtered.length === 1 ? "result" : "results"} · {filtered.length} نتيجة
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#EDE8DE" }}
            >
              <Search size={28} color="#9E8070" />
            </div>
            <div className="text-center">
              <p
                style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "16px", fontWeight: 600 }}
              >
                No results found
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif" }}
              >
                Try adjusting your filters or search term
              </p>
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                className="px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95"
                style={{ backgroundColor: "#C4622D", color: "#FAF7F2", fontFamily: "'Lato', sans-serif" }}
                onClick={clearAll}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
