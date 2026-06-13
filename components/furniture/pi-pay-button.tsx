"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type PayStatus = "idle" | "loading" | "success" | "error";

interface PiPayButtonProps {
  /** Override label – defaults to "Buy Now · π {price}" */
  label?: string;
  /** Extra Tailwind / inline styles for the outer wrapper */
  className?: string;
  style?: React.CSSProperties;
  /** Called after a successful payment */
  onSuccess?: () => void;
  /** Called after a failed payment */
  onError?: (err: unknown) => void;
  /** If true renders a full-width block button */
  fullWidth?: boolean;
}

export function PiPayButton({
  label,
  className = "",
  style,
  onSuccess,
  onError,
  fullWidth = true,
}: PiPayButtonProps) {
  const { products } = usePiAuth();
  const [status, setStatus] = useState<PayStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69ac746c4c417cb93c35d39e
  );

  const handlePay = () => {
    if (!product) return;

    setStatus("loading");
    setErrorMsg(null);

    const amount = product.price_in_pi;

    if (
      typeof window !== "undefined" &&
      typeof (window as Record<string, unknown>).pay === "function"
    ) {
      const pay = (window as Record<string, unknown>).pay as (
        opts: Record<string, unknown>
      ) => void;

      pay({
        amount,
        memo: product.name,
        metadata: { productId: product.id },
        onComplete: () => {
          setStatus("success");
          onSuccess?.();
        },
        onError: (err: unknown) => {
          setStatus("error");
          setErrorMsg("Payment failed. Please try again.");
          onError?.(err);
        },
      });
    } else {
      // Fallback: Pi not available in this environment
      setTimeout(() => {
        setStatus("error");
        setErrorMsg("Pi Network not available in this environment.");
        onError?.(new Error("window.pay is not defined"));
      }, 300);
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setErrorMsg(null);
  };

  const isDisabled = !product || status === "loading" || status === "success";

  const buttonLabel = (() => {
    if (status === "loading") {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          Processing...
        </span>
      );
    }
    if (status === "success") {
      return (
        <span className="flex items-center justify-center gap-2">
          <CheckCircle size={16} />
          Payment Initiated · تم بدء الدفع
        </span>
      );
    }
    if (!product) {
      return "Unavailable";
    }
    return label ?? `Buy Now · π ${product.price_in_pi.toLocaleString()}`;
  })();

  return (
    <div className={fullWidth ? "w-full" : ""}>
      <button
        type="button"
        disabled={isDisabled}
        onClick={status === "error" ? resetStatus : handlePay}
        className={`${fullWidth ? "w-full" : ""} py-3.5 px-6 rounded-2xl font-bold text-base transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 ${className}`}
        style={{
          backgroundColor:
            status === "success"
              ? "#3D2B1F"
              : status === "error"
              ? "#8B1A1A"
              : !product
              ? "#9E8070"
              : "#C4622D",
          color: "#FAF7F2",
          fontFamily: "'Lato', sans-serif",
          boxShadow:
            status === "success" || !product
              ? "none"
              : "0 4px 16px rgba(196,98,45,0.4)",
          ...style,
        }}
        aria-label={
          !product
            ? "Payment unavailable"
            : `Pay π ${product?.price_in_pi} for ${product?.name}`
        }
      >
        {status === "error" ? (
          <span className="flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            Retry Payment · إعادة المحاولة
          </span>
        ) : (
          buttonLabel
        )}
      </button>

      {status === "error" && errorMsg && (
        <p
          className="text-xs mt-1.5 text-center"
          style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}
