"use client";

import {
  Star, Settings, Heart, Package, LogOut, ChevronRight,
  ShieldCheck, BarChart3, MapPin, Camera, Bell, HelpCircle,
  FileText, Wallet,
} from "lucide-react";

type Page = "home" | "browse" | "sell" | "orders" | "profile";

const MOCK_USER = {
  name:        "Ahmed Al-Rashid",
  nameAr:      "أحمد الراشد",
  username:    "@ahmed_pi",
  location:    "Riyadh, Saudi Arabia · الرياض",
  rating:      4.9,
  reviewCount: 47,
  totalSales:  23,
  piBalance:   1842,
  memberSince: "March 2021",
  verified:    true,
};

const USER_STATS = [
  { label: "Sales",   labelAr: "مبيعات",  value: MOCK_USER.totalSales.toString() },
  { label: "Rating",  labelAr: "التقييم", value: MOCK_USER.rating.toString() },
  { label: "Reviews", labelAr: "مراجعة",  value: MOCK_USER.reviewCount.toString() },
];

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-4 mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}>
        {title}
      </p>
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}>
        {children}
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, labelEn, labelAr, value, badge, destructive, onClick }: {
  icon: React.ElementType; labelEn: string; labelAr: string;
  value?: string; badge?: string; destructive?: boolean; onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left border-b last:border-b-0 transition-all active:opacity-70"
      style={{ borderColor: "#EDE8DE" }}
      onClick={onClick}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: destructive ? "rgba(155,44,44,0.08)" : "#EDE8DE" }}
      >
        <Icon size={17} color={destructive ? "#9B2C2C" : "#3D2B1F"} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: destructive ? "#9B2C2C" : "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "14px", fontWeight: 600 }}>
          {labelEn}
        </p>
        <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>{labelAr}</p>
      </div>
      {badge && (
        <span className="px-1.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: "#C4622D", color: "#FAF7F2", fontFamily: "'Lato', sans-serif", fontSize: "9px" }}>
          {badge}
        </span>
      )}
      {value && (
        <span className="flex-shrink-0" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>{value}</span>
      )}
      {!badge && !value && (
        <ChevronRight size={16} color="#C8BEB5" className="flex-shrink-0" />
      )}
    </button>
  );
}

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  userData?: { username?: string; uid?: string } | null;
  onProductClick?: (product: unknown) => void;
}

export function ProfilePage({ onNavigate, userData }: ProfilePageProps) {
  const displayName   = userData?.username || MOCK_USER.name;
  const displayAvatar = displayName[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "84px" }}>

      {/* ── Header ── */}
      <header className="px-4 pt-10 pb-5" style={{ background: "linear-gradient(180deg, #3D2B1F 0%, #4E3325 100%)" }}>
        <div className="flex items-center justify-between mb-5">
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "20px", fontWeight: 700 }}>
            My Profile · حسابي
          </h1>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: "rgba(245,240,232,0.12)" }}
            aria-label="Settings"
          >
            <Settings size={17} color="#D9D0C0" />
          </button>
        </div>

        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: "70px", height: "70px", backgroundColor: "#C4622D", boxShadow: "0 4px 16px rgba(196,98,45,0.45)" }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#FAF7F2", fontSize: "28px", fontWeight: 700 }}>
                {displayAvatar}
              </span>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FAF7F2", boxShadow: "0 1px 4px rgba(61,43,31,0.2)" }}
              aria-label="Change profile photo"
            >
              <Camera size={11} color="#3D2B1F" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "18px", fontWeight: 700 }}>
                {displayName}
              </h2>
              {MOCK_USER.verified && <ShieldCheck size={16} color="#E8956A" strokeWidth={2} />}
            </div>
            <p style={{ color: "#B8B0A8", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>
              {MOCK_USER.nameAr} · {MOCK_USER.username}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} color="#7A6558" />
              <p style={{ color: "#7A6558", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>{MOCK_USER.location}</p>
            </div>
            <p style={{ color: "#5A4840", fontFamily: "'Lato', sans-serif", fontSize: "11px", marginTop: "2px" }}>
              Member since {MOCK_USER.memberSince}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {USER_STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-3 px-2 rounded-xl"
              style={{ backgroundColor: "rgba(245,240,232,0.08)", border: "1px solid rgba(245,240,232,0.10)" }}
            >
              <span style={{ color: "#F5F0E8", fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700 }}>
                {s.value}
              </span>
              <span style={{ color: "#C8BEB5", fontFamily: "'Lato', sans-serif", fontSize: "10px", fontWeight: 700, marginTop: "1px" }}>
                {s.label}
              </span>
              <span style={{ color: "#6A5850", fontFamily: "'Lato', sans-serif", fontSize: "9px" }}>{s.labelAr}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Pi Balance Card ── */}
      <div className="px-4 -mt-3">
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #C4622D 0%, #9E4820 100%)", boxShadow: "0 4px 20px rgba(196,98,45,0.35)" }}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Wallet size={13} color="rgba(250,247,242,0.7)" />
              <p style={{ color: "rgba(250,247,242,0.7)", fontFamily: "'Lato', sans-serif", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Pi Balance · رصيد Pi
              </p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span style={{ color: "#FAF7F2", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>π</span>
              <span style={{ color: "#FAF7F2", fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700 }}>
                {MOCK_USER.piBalance.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Star size={11} fill="#FAF7F2" color="#FAF7F2" />
              <span style={{ color: "#FAF7F2", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700 }}>
                {MOCK_USER.rating}
              </span>
            </div>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
              style={{ backgroundColor: "rgba(250,247,242,0.2)", color: "#FAF7F2", fontFamily: "'Lato', sans-serif", border: "1px solid rgba(250,247,242,0.3)" }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* ── Menu ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 space-y-4 pb-4">

        <MenuSection title="Activity · النشاط">
          <MenuItem icon={Package}    labelEn="My Listings"       labelAr="قوائمي"               value="3 active" onClick={() => onNavigate("sell")} />
          <MenuItem icon={Heart}      labelEn="Wishlist"           labelAr="المفضلة"               badge="12" />
          <MenuItem icon={BarChart3}  labelEn="Sales Analytics"   labelAr="تحليلات المبيعات"      onClick={() => onNavigate("orders")} />
        </MenuSection>

        <MenuSection title="Settings · الإعدادات">
          <MenuItem icon={Bell}       labelEn="Notifications"     labelAr="الإشعارات"             badge="3" />
          <MenuItem icon={ShieldCheck} labelEn="Verification"     labelAr="التحقق والأمان"        value={MOCK_USER.verified ? "Verified" : undefined} />
          <MenuItem icon={Settings}   labelEn="Account Settings"  labelAr="إعدادات الحساب" />
        </MenuSection>

        <MenuSection title="Support · الدعم">
          <MenuItem icon={HelpCircle} labelEn="Help Center"       labelAr="مركز المساعدة" />
          <MenuItem icon={FileText}   labelEn="Terms & Privacy"   labelAr="الشروط والخصوصية" />
        </MenuSection>

        <MenuSection title="Session">
          <MenuItem icon={LogOut} labelEn="Sign Out" labelAr="تسجيل الخروج" destructive />
        </MenuSection>

        <p className="text-center text-xs pb-2" style={{ color: "#B8A99A", fontFamily: "'Lato', sans-serif" }}>
          Four Hands Market · v1.0.0 · Built on Pi Network
        </p>
      </div>
    </div>
  );
}
