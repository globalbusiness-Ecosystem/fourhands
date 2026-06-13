"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/furniture-data";
import type { Order } from "@/lib/furniture-data";

const STATUS_CONFIG = {
  pending: {
    labelEn: "Pending",   labelAr: "قيد الانتظار",
    icon: Clock,          color: "#7A5C4A", bg: "#EDE8DE",
  },
  confirmed: {
    labelEn: "Confirmed", labelAr: "مؤكد",
    icon: CheckCircle,    color: "#5C3D2A", bg: "#E8DDD4",
  },
  shipped: {
    labelEn: "Shipped",   labelAr: "تم الشحن",
    icon: Truck,          color: "#C4622D", bg: "rgba(196,98,45,0.12)",
  },
  delivered: {
    labelEn: "Delivered", labelAr: "تم التسليم",
    icon: CheckCircle,    color: "#2A6B3C", bg: "rgba(42,107,60,0.10)",
  },
  cancelled: {
    labelEn: "Cancelled", labelAr: "ملغى",
    icon: XCircle,        color: "#9B2C2C", bg: "rgba(155,44,44,0.10)",
  },
};

const PROGRESS_STEPS: (keyof typeof STATUS_CONFIG)[] = ["pending", "confirmed", "shipped", "delivered"];

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const config  = STATUS_CONFIG[order.status];
  const StatusIcon = config.icon;
  const stepIdx = PROGRESS_STEPS.indexOf(order.status);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0", boxShadow: "0 2px 10px rgba(61,43,31,0.06)" }}
    >
      {/* Summary row */}
      <button
        type="button"
        className="w-full flex items-center gap-3 p-3.5 text-left transition-all active:opacity-80"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ backgroundColor: "#EDE8DE" }}>
          <img src={order.product.images[0]} alt={order.product.nameEn} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate" style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "14px", fontWeight: 600 }}>
            {order.product.nameEn}
          </p>
          <p className="truncate" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px", direction: "rtl", textAlign: "left" }}>
            {order.product.nameAr}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <span style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700 }}>
              π {order.amount.toLocaleString()}
            </span>
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: config.bg, color: config.color, fontFamily: "'Lato', sans-serif", fontSize: "10px", fontWeight: 700 }}
            >
              <StatusIcon size={10} />
              {config.labelEn}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {expanded ? <ChevronUp size={16} color="#9E8070" /> : <ChevronDown size={16} color="#9E8070" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t px-4 pb-5 pt-4" style={{ borderColor: "#E5DDD0" }}>

          {/* Order meta */}
          <div className="rounded-xl p-3 space-y-2 mb-4" style={{ backgroundColor: "#F5F0E8" }}>
            {[
              { label: "Order ID",    value: order.id },
              { label: "Ordered",     value: order.createdAt },
              { label: "Last update", value: order.updatedAt },
              ...(order.trackingNumber ? [{ label: "Tracking No.", value: order.trackingNumber }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>{label}</span>
                <span style={{ color: label === "Tracking No." ? "#C4622D" : "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Progress tracker */}
          {order.status !== "cancelled" ? (
            <div>
              <p className="mb-3" style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Order Progress · تتبع الطلب
              </p>
              <div className="relative flex items-start justify-between mb-2">
                {/* Connector lines */}
                <div className="absolute left-0 right-0 top-3.5 flex mx-4" style={{ zIndex: 0 }}>
                  {PROGRESS_STEPS.slice(0, -1).map((_, idx) => (
                    <div key={idx} className="flex-1 h-0.5" style={{ backgroundColor: idx < stepIdx ? "#C4622D" : "#D9D0C0" }} />
                  ))}
                </div>
                {PROGRESS_STEPS.map((step, idx) => {
                  const conf = STATUS_CONFIG[step];
                  const StepIcon = conf.icon;
                  const isActive  = idx <= stepIdx;
                  const isCurrent = idx === stepIdx;
                  return (
                    <div key={step} className="flex flex-col items-center gap-1.5" style={{ zIndex: 1 }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: isActive ? "#C4622D" : "#EDE8DE", boxShadow: isCurrent ? "0 0 0 3px rgba(196,98,45,0.2)" : "none" }}
                      >
                        <StepIcon size={12} color={isActive ? "#FAF7F2" : "#9E8070"} />
                      </div>
                      <p className="text-center" style={{ fontSize: "9px", fontFamily: "'Lato', sans-serif", color: isActive ? "#C4622D" : "#9E8070", fontWeight: isActive ? 700 : 400, whiteSpace: "nowrap" }}>
                        {conf.labelEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: "rgba(155,44,44,0.08)", border: "1px solid rgba(155,44,44,0.15)" }}>
              <XCircle size={16} color="#9B2C2C" />
              <p style={{ color: "#9B2C2C", fontFamily: "'Lato', sans-serif", fontSize: "12px", fontWeight: 700 }}>
                Order Cancelled · تم إلغاء الطلب
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function OrdersPage() {
  const [tab, setTab] = useState<"active" | "past">("active");

  const activeOrders = MOCK_ORDERS.filter((o) => !["delivered", "cancelled"].includes(o.status));
  const pastOrders   = MOCK_ORDERS.filter((o) => ["delivered", "cancelled"].includes(o.status));
  const displayed    = tab === "active" ? activeOrders : pastOrders;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F0E8", paddingBottom: "84px" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 px-4 pt-10 pb-4" style={{ backgroundColor: "#3D2B1F" }}>
        <h1 className="mb-3.5" style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "20px", fontWeight: 700 }}>
          My Orders · طلباتي
        </h1>
        {/* Tab switcher */}
        <div className="flex rounded-xl p-1" style={{ backgroundColor: "rgba(245,240,232,0.10)" }}>
          {(["active", "past"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
              style={{
                backgroundColor: tab === t ? "#FAF7F2" : "transparent",
                color: tab === t ? "#3D2B1F" : "#C8BEB5",
                fontFamily: "'Lato', sans-serif",
              }}
              onClick={() => setTab(t)}
            >
              {t === "active" ? `Active (${activeOrders.length})` : `Past (${pastOrders.length})`}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-3 pb-6">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ backgroundColor: "#EDE8DE" }}>
              <Package size={32} color="#9E8070" />
            </div>
            <div className="text-center">
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "16px", fontWeight: 600 }}>
                No {tab} orders
              </p>
              <p className="text-sm mt-1" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif" }}>
                {tab === "active" ? "Browse the marketplace to find your next piece" : "Completed orders will appear here"}
              </p>
            </div>
          </div>
        ) : (
          displayed.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
