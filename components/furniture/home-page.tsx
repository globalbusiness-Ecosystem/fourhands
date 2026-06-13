"use client";

import { useState } from "react";
import { Search, ChevronRight, Sparkles, TrendingUp, ArrowRight, Tag, ShieldCheck, X, Menu, Settings, Sun, Moon, Monitor, Globe, BellRing, Info } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/furniture-data";
import { ProductCard } from "./product-card";
import type { FurnitureProduct } from "@/lib/furniture-data";

type Page = "home" | "browse" | "sell" | "orders" | "profile";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onProductClick: (product: FurnitureProduct) => void;
  username?: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "living-room": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v2a2 2 0 0 0-2 2v2H4v-2a2 2 0 0 0-2-2V9Z" />
      <path d="M4 15v3M20 15v3M1 12h22" />
    </svg>
  ),
  bedroom: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M22 4v16" />
      <path d="M2 8h20" />
      <path d="M2 20h20" />
      <rect x="6" y="8" width="12" height="12" rx="1" />
    </svg>
  ),
  dining: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="20" height="5" rx="1.5" />
      <path d="M6 9V6M18 9V6M7 14v4M17 14v4M5 18h14" />
    </svg>
  ),
  office: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="11" rx="1.5" />
      <path d="M9 18v3M15 18v3M7 21h10M8 11h3M13 11h3" />
    </svg>
  ),
  outdoor: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3 9h18L12 3Z" />
      <path d="M5 9v12M19 9v12M2 21h20" />
      <path d="M9 14h6" />
    </svg>
  ),
  decor: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 5-4 8-4 8S8 11 8 6a4 4 0 0 1 4-4Z" />
      <path d="M12 14v8M9 22h6" />
    </svg>
  ),
  lighting: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2-.5.3-.5.8-.5 1.3v.5H9v-.5c0-.5 0-1-.5-1.3A7 7 0 0 1 12 2Z" />
    </svg>
  ),
};

const STATS = [
  { value: "500+",   en: "Sellers",  ar: "بائع",   icon: "👥" },
  { value: "2,400+", en: "Listings", ar: "قائمة",  icon: "🏠" },
  { value: "π Pay",  en: "Secure",   ar: "آمن",    icon: "🔒" },
];

const SIDEBAR_CATEGORIES = [
  { id: "living-room", nameEn: "Living Room",  nameAr: "غرفة المعيشة" },
  { id: "bedroom",     nameEn: "Bedroom",      nameAr: "غرفة النوم" },
  { id: "dining",      nameEn: "Dining Room",  nameAr: "غرفة الطعام" },
  { id: "office",      nameEn: "Office",       nameAr: "المكتب" },
  { id: "outdoor",     nameEn: "Outdoor",      nameAr: "الخارج" },
  { id: "lighting",    nameEn: "Lighting",     nameAr: "الإضاءة" },
  { id: "decor",       nameEn: "Décor",        nameAr: "الديكور" },
  { id: "rugs",        nameEn: "Rugs",         nameAr: "السجاد" },
];

const SIDEBAR_ICONS: Record<string, React.ReactNode> = {
  "living-room": <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v2a2 2 0 0 0-2 2v2H4v-2a2 2 0 0 0-2-2V9Z"/><path d="M4 15v3M20 15v3M1 12h22"/></svg>,
  "bedroom":     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M22 4v16"/><path d="M2 8h20"/><path d="M2 20h20"/><rect x="6" y="8" width="12" height="12" rx="1"/></svg>,
  "dining":      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="5" rx="1.5"/><path d="M6 9V6M18 9V6M7 14v4M17 14v4M5 18h14"/></svg>,
  "office":      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="11" rx="1.5"/><path d="M9 18v3M15 18v3M7 21h10M8 11h3M13 11h3"/></svg>,
  "outdoor":     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 3 9h18L12 3Z"/><path d="M5 9v12M19 9v12M2 21h20"/><path d="M9 14h6"/></svg>,
  "lighting":    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2-.5.3-.5.8-.5 1.3v.5H9v-.5c0-.5 0-1-.5-1.3A7 7 0 0 1 12 2Z"/></svg>,
  "decor":       <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 5-4 8-4 8S8 11 8 6a4 4 0 0 1 4-4Z"/><path d="M12 14v8M9 22h6"/></svg>,
  "rugs":        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M3 7h18M3 12h18M3 17h18M8 2v20M16 2v20"/></svg>,
};

export function HomePage({ onNavigate, onProductClick, username }: HomePageProps) {
  const featured    = PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = PRODUCTS.filter((p) => p.isNew && !p.isFeatured).slice(0, 4);

  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme]               = useState<"light" | "dark" | "auto">("auto");
  const [language, setLanguage]         = useState<"en" | "ar">("en");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "84px" }}>

      {/* ── Sidebar Drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(30,15,8,0.55)" }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <aside
            className="relative flex flex-col z-10"
            style={{
              width: "280px",
              maxWidth: "80vw",
              backgroundColor: "#FAF7F2",
              height: "100%",
              boxShadow: "4px 0 32px rgba(61,43,31,0.18)",
            }}
            aria-label="Category navigation"
          >
            {/* Sidebar header */}
            <div
              className="flex items-center justify-between px-5 pt-12 pb-5"
              style={{ borderBottom: "1px solid #E5DDD0" }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#3D2B1F",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  Four Hands
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", color: "#C4622D", fontSize: "11px", marginTop: "3px" }}>
                  fourhands.pi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#EDE8DE" }}
                aria-label="Close menu"
              >
                <X size={16} color="#3D2B1F" />
              </button>
            </div>

            {/* Category list */}
            <nav className="flex-1 overflow-y-auto py-3" aria-label="Browse by category">
              <p
                className="px-5 pb-2 pt-1"
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", fontWeight: 700, color: "#9E8070", letterSpacing: "0.13em", textTransform: "uppercase" }}
              >
                Browse Categories · تصفح الفئات
              </p>
              {SIDEBAR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="w-full flex items-center gap-3 px-5 py-3.5 transition-all active:bg-amber-50 text-left"
                  style={{ borderBottom: "1px solid rgba(229,221,208,0.5)" }}
                  onClick={() => { setSidebarOpen(false); onNavigate("browse"); }}
                  aria-label={cat.nameEn}
                >
                  <span style={{ color: "#C4622D" }}>{SIDEBAR_ICONS[cat.id]}</span>
                  <div className="flex-1">
                    <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D2B1F", fontSize: "14px", fontWeight: 600 }}>
                      {cat.nameEn}
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", color: "#9E8070", fontSize: "11px" }}>
                      {cat.nameAr}
                    </p>
                  </div>
                  <ChevronRight size={14} color="#C8BEB5" />
                </button>
              ))}
            </nav>

            {/* Sidebar footer */}
            <div className="px-5 py-4" style={{ borderTop: "1px solid #E5DDD0" }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: "#9E8070" }}>
                500+ Sellers · 2,400+ Listings · π Pay
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* ── Settings Panel ── */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(30,15,8,0.55)" }}
            onClick={() => setSettingsOpen(false)}
            aria-hidden="true"
          />
          {/* Sheet */}
          <div
            className="relative w-full max-w-md z-10 rounded-t-3xl overflow-hidden"
            style={{ backgroundColor: "#FAF7F2", boxShadow: "0 -8px 40px rgba(61,43,31,0.18)", maxHeight: "88vh", overflowY: "auto" }}
            role="dialog"
            aria-label="Settings"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#D9D0C0" }} />
            </div>

            {/* Settings header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E5DDD0" }}>
              <div className="flex items-center gap-2">
                <Settings size={16} color="#C4622D" />
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "18px", fontWeight: 700 }}>
                  Settings
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#EDE8DE" }}
                aria-label="Close settings"
              >
                <X size={16} color="#3D2B1F" />
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-6 pb-10">

              {/* Theme */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Sun size={14} color="#C4622D" />
                  <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D2B1F", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Theme · المظهر
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "light", label: "Light",  labelAr: "فاتح",  Icon: Sun },
                    { value: "dark",  label: "Dark",   labelAr: "داكن",  Icon: Moon },
                    { value: "auto",  label: "Auto",   labelAr: "تلقائي", Icon: Monitor },
                  ] as const).map(({ value, label, labelAr, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setTheme(value)}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all active:scale-95"
                      style={{
                        backgroundColor: theme === value ? "rgba(196,98,45,0.12)" : "#EDE8DE",
                        border: theme === value ? "1.5px solid #C4622D" : "1.5px solid transparent",
                      }}
                    >
                      <Icon size={18} color={theme === value ? "#C4622D" : "#7A5C4A"} />
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 600, color: theme === value ? "#C4622D" : "#3D2B1F" }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", color: "#9E8070" }}>
                        {labelAr}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Globe size={14} color="#C4622D" />
                  <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D2B1F", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Language · اللغة
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "en", label: "English", sub: "English" },
                    { value: "ar", label: "العربية",  sub: "Arabic" },
                  ] as const).map(({ value, label, sub }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLanguage(value)}
                      className="flex flex-col items-center gap-0.5 py-3 rounded-2xl transition-all active:scale-95"
                      style={{
                        backgroundColor: language === value ? "rgba(196,98,45,0.12)" : "#EDE8DE",
                        border: language === value ? "1.5px solid #C4622D" : "1.5px solid transparent",
                      }}
                    >
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", fontWeight: 700, color: language === value ? "#C4622D" : "#3D2B1F" }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: "#9E8070" }}>
                        {sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                style={{ backgroundColor: "#EDE8DE" }}
              >
                <div>
                  <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D2B1F", fontSize: "13px", fontWeight: 700 }}>
                    Currency · العملة
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", color: "#9E8070", fontSize: "11px", marginTop: "2px" }}>
                    Pi Network (π)
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(196,98,45,0.15)", color: "#C4622D", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700 }}
                >
                  π
                </span>
              </div>

              {/* Notifications */}
              <div
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                style={{ backgroundColor: "#EDE8DE" }}
              >
                <div className="flex items-center gap-2">
                  <BellRing size={16} color="#C4622D" />
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D2B1F", fontSize: "13px", fontWeight: 700 }}>
                      Notifications · الإشعارات
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", color: "#9E8070", fontSize: "11px", marginTop: "2px" }}>
                      {notifications ? "Enabled · مفعّل" : "Disabled · معطّل"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications}
                  onClick={() => setNotifications((v) => !v)}
                  className="relative flex-shrink-0 transition-all"
                  style={{
                    width: "44px",
                    height: "26px",
                    borderRadius: "100px",
                    backgroundColor: notifications ? "#C4622D" : "#C8BEB5",
                    padding: "3px",
                  }}
                  aria-label="Toggle notifications"
                >
                  <div
                    className="absolute top-0.5 w-[22px] h-[22px] rounded-full transition-all"
                    style={{
                      backgroundColor: "#FAF7F2",
                      left: notifications ? "calc(100% - 24px)" : "2px",
                      boxShadow: "0 1px 4px rgba(61,43,31,0.2)",
                    }}
                  />
                </button>
              </div>

              {/* About */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                style={{ backgroundColor: "#EDE8DE" }}
              >
                <Info size={16} color="#C4622D" />
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "14px", fontWeight: 700 }}>
                    About Four Hands
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", color: "#9E8070", fontSize: "11px", marginTop: "2px" }}>
                    Premium furniture marketplace on Pi Network · v1.0
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 px-4 pt-10 pb-4" style={{ backgroundColor: "#3D2B1F" }}>
        <div className="flex items-center justify-between mb-4">

          {/* Left: Hamburger */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
            style={{ backgroundColor: "rgba(245,240,232,0.10)" }}
            aria-label="Open category menu"
          >
            <Menu size={18} color="#D9D0C0" />
          </button>

          {/* Center: Logo */}
          <div className="flex flex-col items-center">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F5F0E8",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Four Hands
            </h1>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "#C4622D",
                fontSize: "10px",
                letterSpacing: "0.08em",
                marginTop: "3px",
              }}
            >
              fourhands.pi
            </p>
          </div>

          {/* Right: Settings gear */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90"
            style={{ backgroundColor: "rgba(245,240,232,0.10)" }}
            aria-label="Open settings"
          >
            <Settings size={18} color="#D9D0C0" />
          </button>

        </div>

        {/* Search bar */}
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:opacity-80"
          style={{ backgroundColor: "rgba(245,240,232,0.09)", border: "1px solid rgba(217,208,192,0.18)" }}
          onClick={() => onNavigate("browse")}
          aria-label="Search furniture and décor"
        >
          <Search size={14} color="#7A6558" />
          <span style={{ color: "#6A5850", fontFamily: "'Lato', sans-serif", fontSize: "13.5px" }}>
            Search furniture & décor...
          </span>
          <span
            className="ml-auto px-2 py-0.5 rounded-lg text-xs"
            style={{ backgroundColor: "rgba(196,98,45,0.18)", color: "#E8956A", fontFamily: "'Lato', sans-serif", fontSize: "9px", fontWeight: 700 }}
          >
            SEARCH
          </span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">

        {/* ── Hero Banner ── */}
        <div className="mx-4 mt-4 rounded-3xl overflow-hidden relative" style={{ minHeight: "230px", backgroundColor: "#2E1F16" }}>
          {/* Background photo */}
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: "inherit" }}
          />
          {/* Dark overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(30,15,8,0.82) 0%, rgba(61,43,31,0.60) 55%, rgba(30,15,8,0.30) 100%)",
            }}
          />

          <div className="relative px-5 pt-7 pb-7 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: "rgba(196,98,45,0.30)",
                  color: "#EAA07A",
                  fontFamily: "'Lato', sans-serif",
                  border: "1px solid rgba(196,98,45,0.45)",
                  borderRadius: "100px",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "4px 10px",
                }}
              >
                أثاث فاخر · PREMIUM
              </span>
              <span
                style={{
                  backgroundColor: "rgba(245,240,232,0.10)",
                  color: "#B8A99A",
                  fontFamily: "'Lato', sans-serif",
                  border: "1px solid rgba(245,240,232,0.12)",
                  borderRadius: "100px",
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "4px 10px",
                }}
              >
                <ShieldCheck
                  size={8}
                  style={{ display: "inline", marginRight: "3px", verticalAlign: "middle" }}
                />
                Pi Verified
              </span>
            </div>

            <h2
              className="text-balance"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F5F0E8",
                fontSize: "27px",
                fontWeight: 700,
                lineHeight: 1.18,
                maxWidth: "230px",
              }}
            >
              Premium Furniture, Pay with Pi
            </h2>

            <p style={{ color: "#8A7060", fontFamily: "'Lato', sans-serif", fontSize: "12.5px" }}>
              اكتشف قطع الأثاث الفاخرة المختارة
            </p>

            <div className="flex items-center gap-2.5 mt-1">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: "#C4622D",
                  color: "#FAF7F2",
                  fontFamily: "'Lato', sans-serif",
                  boxShadow: "0 4px 16px rgba(196,98,45,0.5)",
                }}
                onClick={() => onNavigate("browse")}
              >
                Shop Now
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: "rgba(245,240,232,0.10)",
                  color: "#D9D0C0",
                  fontFamily: "'Lato', sans-serif",
                  border: "1px solid rgba(245,240,232,0.14)",
                }}
                onClick={() => onNavigate("sell")}
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-2.5 mx-4 mt-4">
          {STATS.map((s) => (
            <div
              key={s.en}
              className="flex flex-col items-center py-3.5 px-2 rounded-2xl"
              style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}
            >
              <span
                style={{
                  color: "#C4622D",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "17px",
                  fontWeight: 700,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  color: "#3D2B1F",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  marginTop: "2px",
                }}
              >
                {s.en}
              </span>
              <span style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "9.5px" }}>
                {s.ar}
              </span>
            </div>
          ))}
        </div>

        {/* ── Categories ── */}
        <section className="mt-7">
          <div className="flex items-center justify-between px-4 mb-4">
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#3D2B1F",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Categories
              </h2>
              <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
                تصفح حسب الفئة
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs font-bold"
              style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}
              onClick={() => onNavigate("browse")}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="flex flex-col items-center gap-2 flex-shrink-0 transition-all active:scale-95"
                onClick={() => onNavigate("browse")}
                aria-label={cat.nameEn}
              >
                <div
                  className="w-[68px] h-[68px] rounded-[20px] flex items-center justify-center"
                  style={{
                    backgroundColor: cat.bgColor,
                    color: cat.accentColor,
                    boxShadow: `0 2px 8px ${cat.bgColor}`,
                  }}
                >
                  {CATEGORY_ICONS[cat.id]}
                </div>
                <div className="text-center">
                  <p
                    style={{
                      color: "#3D2B1F",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.nameEn}
                  </p>
                  <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "9px" }}>
                    {cat.count}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Featured Pieces ── */}
        <section className="mt-7 px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} color="#C4622D" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#3D2B1F",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Featured Pieces
                </h2>
              </div>
              <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
                قطع مختارة بعناية
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs font-bold"
              style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}
              onClick={() => onNavigate("browse")}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </section>

        {/* ── Sell Banner ── */}
        <div
          className="mx-4 mt-7 rounded-2xl px-5 py-5 flex items-center justify-between overflow-hidden relative"
          style={{ backgroundColor: "#3D2B1F" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(ellipse at 90% 50%, #C4622D 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Tag size={12} color="#E8956A" />
              <p
                style={{
                  color: "#E8956A",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Earn Pi · اكسب Pi
              </p>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F5F0E8",
                fontSize: "17px",
                fontWeight: 700,
              }}
            >
              Sell Your Furniture
            </h3>
            <p style={{ color: "#6A5040", fontFamily: "'Lato', sans-serif", fontSize: "12px", marginTop: "2px" }}>
              هل تريد البيع؟ ابدأ الآن
            </p>
          </div>
          <button
            type="button"
            className="px-4 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 flex-shrink-0 relative"
            style={{
              backgroundColor: "#C4622D",
              color: "#FAF7F2",
              fontFamily: "'Lato', sans-serif",
              boxShadow: "0 4px 14px rgba(196,98,45,0.5)",
            }}
            onClick={() => onNavigate("sell")}
          >
            Start Selling
          </button>
        </div>

        {/* ── New Arrivals ── */}
        <section className="mt-7 px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <TrendingUp size={14} color="#C4622D" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#3D2B1F",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  New Arrivals
                </h2>
              </div>
              <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
                وصل حديثاً
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs font-bold"
              style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}
              onClick={() => onNavigate("browse")}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
