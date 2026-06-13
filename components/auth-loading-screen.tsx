"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";

export function AuthLoadingScreen() {
  const { authMessage, hasError, reinitialize } = usePiAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div className="max-w-md w-full px-8 text-center space-y-7">

        {/* Brand mark */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: "#3D2B1F", boxShadow: "0 8px 32px rgba(61,43,31,0.25)" }}
          >
            <span style={{ color: "#F5F0E8", fontFamily: "'Playfair Display', serif", fontSize: "34px", fontWeight: 700 }}>
              π
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "22px", fontWeight: 700 }}>
            Four Hands
          </h1>
          <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "12px" }}>
            Premium Furniture Marketplace
          </p>
        </div>

        {/* Spinner / Error icon */}
        <div className="flex justify-center">
          {hasError ? (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(196,98,45,0.12)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              </svg>
            </div>
          ) : (
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full" style={{ border: "3px solid #EDE8DE" }} />
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{ border: "3px solid transparent", borderTopColor: "#C4622D" }}
              />
            </div>
          )}
        </div>

        {/* Status message */}
        <div className="space-y-1.5">
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#3D2B1F",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {hasError ? "Authentication Failed" : "Connecting to Pi Network..."}
          </p>
          <p style={{ color: hasError ? "#C4622D" : "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>
            {authMessage}
          </p>
        </div>

        {/* Retry button */}
        {hasError && (
          <button
            type="button"
            onClick={reinitialize}
            className="px-7 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
            style={{
              backgroundColor: "#C4622D",
              color: "#FAF7F2",
              fontFamily: "'Lato', sans-serif",
              boxShadow: "0 4px 14px rgba(196,98,45,0.4)",
            }}
          >
            Retry Authentication
          </button>
        )}

        {/* Footer */}
        <p style={{ color: "#C8BEB5", fontFamily: "'Lato', sans-serif", fontSize: "11px" }}>
          Secured by Pi Network · fourhands.pi
        </p>
      </div>
    </div>
  );
}
