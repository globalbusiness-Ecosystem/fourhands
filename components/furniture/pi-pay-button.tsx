"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type PayStatus = "idle" | "loading" | "success" | "error";

interface PiPayButtonProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
  fullWidth?: boolean;
  amount?: number;
  productName?: string;
  productId?: string;
}

export function PiPayButton({
  label,
  className = "",
  style,
  onSuccess,
  onError,
  fullWidth = true,
  amount = 1,
  productName = "FourHands Product",
  productId = "default",
}: PiPayButtonProps) {
  const [status, setStatus] = useState<PayStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePay = () => {
    setStatus("loading");
    setErrorMsg(null);

    if (
      typeof window !== "undefined" &&
      typeof (window as any).pay === "function"
    ) {
      (window as any).pay({
        amount,
        memo: productName,
        metadata: { productId },
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
      setStatus("error");
      setErrorMsg("Pi Network not available.");
      onError?.(new Error("window.pay is not defined"));
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setErrorMsg(null);
  };

  const isDisabled = status === "loading" || status === "success";

  const buttonLabel = (() => {
    if (status === "loading") return (
      <span className="flex items-center justify-center gap-2">
        <Loader2 size={16} className="animate-spin" />Processing...
      </span>
    );
    if (status === "success") return (
      <span className="flex items-center justify-center gap-2">
        <CheckCircle size={16} />Payment Initiated
      </span>
    );
    return label ?? `Buy Now · π ${amount}`;
  })();

  return (
    <div className={fullWidth ? "w-full" : ""}>
      <button
        type="button"
        disabled={isDisabled}
        onClick={status === "error" ? resetStatus : handlePay}
        className={`${fullWidth ? "w-full" : ""} py-3.5 px-6 rounded-2xl font-bold text-base transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 ${className}`}
        style={{
          backgroundColor: status === "success" ? "#3D2B1F" : status === "error" ? "#8B1A1A" : "#C4622D",
          color: "#FAF7F2",
          fontFamily: "'Lato', sans-serif",
          boxShadow: "0 4px 16px rgba(196,98,45,0.4)",
          ...style,
        }}
      >
        {status === "error" ? (
          <span className="flex items-center justify-center gap-2">
            <AlertCircle size={16} />Retry Payment
          </span>
        ) : buttonLabel}
      </button>
      {status === "error" && errorMsg && (
        <p className="text-xs mt-1.5 text-center" style={{ color: "#C4622D" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
