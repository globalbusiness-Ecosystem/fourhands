"use client";

import { Home, Search, PlusCircle, Package, User } from "lucide-react";

type Page = "home" | "browse" | "sell" | "orders" | "profile";

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; icon: React.ElementType; labelEn: string }[] = [
  { page: "home",    icon: Home,       labelEn: "Home" },
  { page: "browse",  icon: Search,     labelEn: "Browse" },
  { page: "sell",    icon: PlusCircle, labelEn: "Sell" },
  { page: "orders",  icon: Package,    labelEn: "Orders" },
  { page: "profile", icon: User,       labelEn: "Profile" },
];

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto"
      style={{
        backgroundColor: "#FAF7F2",
        borderTop: "1px solid #D9D0C0",
        boxShadow: "0 -4px 24px rgba(61,43,31,0.12)",
      }}
      aria-label="Main navigation"
    >
      <div
        className="flex items-end justify-around px-2"
        style={{ paddingTop: "8px", paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)" }}
      >
        {NAV_ITEMS.map(({ page, icon: Icon, labelEn }) => {
          const isActive = activePage === page;
          const isSell   = page === "sell";

          if (isSell) {
            return (
              <button
                key={page}
                type="button"
                onClick={() => onNavigate(page)}
                className="flex flex-col items-center gap-1 transition-all active:scale-95"
                style={{ marginTop: "-22px" }}
                aria-label="List an item for sale"
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "54px",
                    height: "54px",
                    backgroundColor: "#C4622D",
                    boxShadow: "0 4px 18px rgba(196,98,45,0.55)",
                    border: "3px solid #FAF7F2",
                  }}
                >
                  <Icon size={23} color="#FAF7F2" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", color: "#C4622D", fontWeight: 700 }}>
                  {labelEn}
                </span>
              </button>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              className="flex flex-col items-center gap-1 px-3 pb-1 relative transition-all active:scale-90"
              aria-label={labelEn}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? "#C4622D" : "#9E8070"} />
              <span
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "9px",
                  color: isActive ? "#C4622D" : "#9E8070",
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: "0.02em",
                }}
              >
                {labelEn}
              </span>
              {isActive && (
                <div
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-b-full"
                  style={{ backgroundColor: "#C4622D" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
