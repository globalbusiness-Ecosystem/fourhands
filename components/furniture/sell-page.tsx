"use client";

import { useState } from "react";
import { Camera, Plus, X, CheckCircle, ChevronDown, Info } from "lucide-react";
import { CATEGORIES, STYLES } from "@/lib/furniture-data";
import { PiPayButton } from "./pi-pay-button";

const CONDITIONS = ["New", "Like New", "Good", "Fair"];
const MATERIALS  = ["Wood", "Metal", "Marble", "Rattan", "Ceramic", "Linen", "Leather", "Fabric", "Glass", "Other"];

interface FormState {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: string;
  category: string;
  style: string;
  material: string;
  condition: string;
  width: string;
  height: string;
  depth: string;
  photos: string[];
}
type FormErrors = Partial<Record<keyof FormState, string>>;

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block mb-1.5" style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif", fontSize: "13px", fontWeight: 700 }}>
      {children}
      {required && <span style={{ color: "#C4622D", marginLeft: "3px" }}>*</span>}
    </label>
  );
}

function TextInput({ placeholder, value, onChange, error, dir, type = "text" }: {
  placeholder: string; value: string; onChange: (v: string) => void; error?: string; dir?: "rtl" | "ltr"; type?: string;
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className="w-full px-3.5 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          backgroundColor: "#FAF7F2",
          border: `1.5px solid ${error ? "#C4622D" : "#D9D0C0"}`,
          color: "#3D2B1F",
          fontFamily: "'Lato', sans-serif",
        }}
      />
      {error && <p className="text-xs mt-1" style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}>{error}</p>}
    </div>
  );
}

function SelectInput({ value, onChange, options, error }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-3 rounded-xl text-sm outline-none appearance-none"
          style={{
            backgroundColor: "#FAF7F2",
            border: `1.5px solid ${error ? "#C4622D" : "#D9D0C0"}`,
            color: value ? "#3D2B1F" : "#9E8070",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" color="#7A5C4A" />
      </div>
      {error && <p className="text-xs mt-1" style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}>{error}</p>}
    </div>
  );
}

export function SellPage() {
  const [form, setForm] = useState<FormState>({
    nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "",
    price: "", category: "", style: "", material: "",
    condition: "", width: "", height: "", depth: "", photos: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<FormErrors>({});

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.nameEn.trim())           e.nameEn    = "English name is required";
    if (!form.price || Number(form.price) <= 0) e.price = "Valid price is required";
    if (!form.category)                e.category  = "Please select a category";
    if (!form.condition)               e.condition = "Please select condition";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "", price: "", category: "", style: "", material: "", condition: "", width: "", height: "", depth: "", photos: [] });
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 pb-24" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EDE8DE" }}>
          <CheckCircle size={44} color="#C4622D" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h2 className="text-balance mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "24px", fontWeight: 700 }}>
            Listing Submitted!
          </h2>
          <p style={{ color: "#3D2B1F", fontFamily: "'Playfair Display', serif", fontSize: "14px" }}>تم تقديم الإعلان!</p>
        </div>
        <div className="w-full rounded-2xl p-4" style={{ backgroundColor: "#FAF7F2", border: "1px solid #D9D0C0" }}>
          <p className="text-sm text-center leading-relaxed" style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif" }}>
            Your furniture listing is under review and will be live within 24 hours.
          </p>
          <p className="text-sm text-center leading-relaxed mt-2" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", direction: "rtl" }}>
            قائمتك قيد المراجعة وستكون متاحة خلال 24 ساعة.
          </p>
        </div>
        <button
          type="button"
          className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ backgroundColor: "#C4622D", color: "#FAF7F2", fontFamily: "'Lato', sans-serif", boxShadow: "0 4px 14px rgba(196,98,45,0.35)" }}
          onClick={resetForm}
        >
          List Another Item · إضافة قائمة أخرى
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24" style={{ backgroundColor: "#F5F0E8" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 px-4 pt-10 pb-4" style={{ backgroundColor: "#3D2B1F" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", fontSize: "20px", fontWeight: 700 }}>
          List Your Furniture
        </h1>
        <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "12px", marginTop: "2px" }}>
          بيع أثاثك · Earn Pi Network currency
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-5 space-y-5 pb-6">

        {/* Tip banner */}
        <div
          className="flex items-start gap-3 p-3.5 rounded-2xl"
          style={{ backgroundColor: "rgba(196,98,45,0.09)", border: "1px solid rgba(196,98,45,0.18)" }}
        >
          <Info size={16} color="#C4622D" className="flex-shrink-0 mt-0.5" />
          <p style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "12px", lineHeight: 1.5 }}>
            Listings with photos and bilingual descriptions sell 3× faster. Price in π — buyers pay directly through Pi Network.
          </p>
        </div>

        {/* ── Photo Upload ── */}
        <div>
          <FieldLabel>Photos · الصور</FieldLabel>
          <div className="flex gap-2 flex-wrap">
            {form.photos.map((_, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 rounded-xl overflow-hidden"
                style={{ backgroundColor: "#EDE8DE", border: "1px solid #D9D0C0" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Camera size={20} color="#7A5C4A" />
                </div>
                <button
                  type="button"
                  className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#3D2B1F" }}
                  onClick={() => setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }))}
                  aria-label="Remove photo"
                >
                  <X size={10} color="#F5F0E8" />
                </button>
                {idx === 0 && (
                  <span
                    className="absolute bottom-1 left-1 px-1.5 rounded"
                    style={{ backgroundColor: "rgba(61,43,31,0.8)", color: "#F5F0E8", fontFamily: "'Lato', sans-serif", fontSize: "8px", fontWeight: 700 }}
                  >
                    Cover
                  </span>
                )}
              </div>
            ))}
            {form.photos.length < 6 && (
              <button
                type="button"
                className="w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                style={{ backgroundColor: "#FAF7F2", border: "2px dashed #C4622D" }}
                onClick={() => setForm((prev) => ({ ...prev, photos: [...prev.photos, ""] }))}
                aria-label="Add photo"
              >
                <Plus size={20} color="#C4622D" />
                <span style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif", fontSize: "9px", fontWeight: 700 }}>Add Photo</span>
              </button>
            )}
          </div>
          <p style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "11px", marginTop: "6px" }}>
            Up to 6 photos. First photo is the cover image.
          </p>
        </div>

        {/* ── Names ── */}
        <div className="space-y-3">
          <div>
            <FieldLabel required>Name (English)</FieldLabel>
            <TextInput placeholder="e.g. Walnut Dining Chair" value={form.nameEn} onChange={(v) => update("nameEn", v)} error={errors.nameEn} />
          </div>
          <div>
            <FieldLabel>الاسم (عربي) · Name (Arabic)</FieldLabel>
            <TextInput placeholder="مثال: كرسي طعام من خشب الجوز" value={form.nameAr} onChange={(v) => update("nameAr", v)} dir="rtl" />
          </div>
        </div>

        {/* ── Price ── */}
        <div>
          <FieldLabel required>Price in Pi (π)</FieldLabel>
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: `1.5px solid ${errors.price ? "#C4622D" : "#D9D0C0"}`, backgroundColor: "#FAF7F2" }}
          >
            <span
              className="px-4 py-3 font-bold border-r"
              style={{ color: "#C4622D", borderColor: "#D9D0C0", fontFamily: "'Playfair Display', serif", fontSize: "16px" }}
            >
              π
            </span>
            <input
              type="number"
              placeholder="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="flex-1 px-3.5 py-3 text-sm outline-none bg-transparent"
              style={{ color: "#3D2B1F", fontFamily: "'Lato', sans-serif" }}
            />
          </div>
          {errors.price && <p className="text-xs mt-1" style={{ color: "#C4622D", fontFamily: "'Lato', sans-serif" }}>{errors.price}</p>}
        </div>

        {/* ── Category & Condition ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel required>Category</FieldLabel>
            <SelectInput value={form.category} onChange={(v) => update("category", v)} options={CATEGORIES.map((c) => ({ value: c.id, label: c.nameEn }))} error={errors.category} />
          </div>
          <div>
            <FieldLabel required>Condition</FieldLabel>
            <SelectInput value={form.condition} onChange={(v) => update("condition", v)} options={CONDITIONS.map((c) => ({ value: c, label: c }))} error={errors.condition} />
          </div>
        </div>

        {/* ── Style & Material ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Style</FieldLabel>
            <SelectInput value={form.style} onChange={(v) => update("style", v)} options={STYLES.map((s) => ({ value: s.id, label: s.nameEn }))} />
          </div>
          <div>
            <FieldLabel>Material</FieldLabel>
            <SelectInput value={form.material} onChange={(v) => update("material", v)} options={MATERIALS.map((m) => ({ value: m, label: m }))} />
          </div>
        </div>

        {/* ── Dimensions ── */}
        <div>
          <FieldLabel>Dimensions (cm) · الأبعاد</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {(["width", "height", "depth"] as const).map((dim) => (
              <div key={dim}>
                <input
                  type="number"
                  placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                  value={form[dim]}
                  onChange={(e) => update(dim, e.target.value)}
                  className="w-full px-3 py-3 rounded-xl text-sm outline-none text-center"
                  style={{ backgroundColor: "#FAF7F2", border: "1.5px solid #D9D0C0", color: "#3D2B1F", fontFamily: "'Lato', sans-serif" }}
                />
                <p className="text-center mt-1" style={{ color: "#9E8070", fontFamily: "'Lato', sans-serif", fontSize: "10px" }}>
                  {dim.charAt(0).toUpperCase() + dim.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Descriptions ── */}
        <div>
          <FieldLabel>Description (English)</FieldLabel>
          <textarea
            placeholder="Describe your item in detail — condition, age, any wear or defects..."
            value={form.descriptionEn}
            onChange={(e) => update("descriptionEn", e.target.value)}
            rows={3}
            className="w-full px-3.5 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ backgroundColor: "#FAF7F2", border: "1.5px solid #D9D0C0", color: "#3D2B1F", fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}
          />
        </div>

        <div>
          <FieldLabel>الوصف (عربي) · Description (Arabic)</FieldLabel>
          <textarea
            placeholder="اكتب وصفاً تفصيلياً للمنتج..."
            value={form.descriptionAr}
            onChange={(e) => update("descriptionAr", e.target.value)}
            rows={3}
            dir="rtl"
            className="w-full px-3.5 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ backgroundColor: "#FAF7F2", border: "1.5px solid #D9D0C0", color: "#3D2B1F", fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}
          />
        </div>

        {/* ── Submit ── */}
        <button
          type="button"
          className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98] disabled:opacity-60"
          style={{
            backgroundColor: "#3D2B1F",
            color: "#FAF7F2",
            fontFamily: "'Lato', sans-serif",
            boxShadow: "0 4px 16px rgba(61,43,31,0.3)",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "List Item · نشر الإعلان"}
        </button>

        {/* ── Listing Fee Payment ── */}
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: "#FAF7F2", border: "1px solid #E5DDD0" }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "14px", fontWeight: 700 }}>
              Listing Fee · رسوم النشر
            </p>
            <p style={{ color: "#7A5C4A", fontFamily: "'Lato', sans-serif", fontSize: "11px", marginTop: "3px" }}>
              Pay with Pi to publish your listing and boost visibility across the marketplace.
            </p>
          </div>
          <PiPayButton
            label="Pay Listing Fee · ادفع رسوم النشر"
            fullWidth={true}
            onSuccess={() => { handleSubmit(); }}
          />
        </div>
      </div>
    </div>
  );
}
