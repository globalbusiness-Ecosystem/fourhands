export type FurnitureCategory = {
  id: string;
  nameEn: string;
  nameAr: string;
  count: number;
  accentColor: string;
  bgColor: string;
};

export type FurnitureStyle = {
  id: string;
  nameEn: string;
  nameAr: string;
};

export type Seller = {
  id: string;
  name: string;
  nameAr: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  location: string;
  locationAr: string;
  joinedYear: number;
  totalSales: number;
};

export type FurnitureProduct = {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  category: string;
  style: string;
  material: string;
  dimensions: { width: number; height: number; depth: number; unit: string };
  condition: "New" | "Like New" | "Good" | "Fair";
  images: string[];
  seller: Seller;
  inWishlist?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
};

export type Order = {
  id: string;
  product: FurnitureProduct;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  amount: number;
  trackingNumber?: string;
};

export const CATEGORIES: FurnitureCategory[] = [
  { id: "living-room", nameEn: "Living Room", nameAr: "المعيشة",   count: 342, accentColor: "#8B6F5E", bgColor: "#F0E8E0" },
  { id: "bedroom",     nameEn: "Bedroom",     nameAr: "النوم",      count: 218, accentColor: "#6F7A8B", bgColor: "#E0E4F0" },
  { id: "dining",      nameEn: "Dining",      nameAr: "الطعام",     count: 156, accentColor: "#8B7A5E", bgColor: "#F0EBE0" },
  { id: "office",      nameEn: "Office",      nameAr: "المكتب",     count: 124, accentColor: "#5E7A8B", bgColor: "#E0EBF0" },
  { id: "outdoor",     nameEn: "Outdoor",     nameAr: "الخارجي",    count: 89,  accentColor: "#6F8B7A", bgColor: "#E0F0E8" },
  { id: "decor",       nameEn: "Décor",       nameAr: "الديكور",    count: 412, accentColor: "#8B5E7A", bgColor: "#F0E0EB" },
  { id: "lighting",    nameEn: "Lighting",    nameAr: "الإضاءة",    count: 203, accentColor: "#8B7E5E", bgColor: "#F0EDE0" },
];

export const STYLES: FurnitureStyle[] = [
  { id: "modern",        nameEn: "Modern",        nameAr: "حديث" },
  { id: "mid-century",   nameEn: "Mid-Century",   nameAr: "منتصف القرن" },
  { id: "industrial",    nameEn: "Industrial",    nameAr: "صناعي" },
  { id: "bohemian",      nameEn: "Bohemian",      nameAr: "بوهيمي" },
  { id: "scandinavian",  nameEn: "Scandinavian",  nameAr: "إسكندنافي" },
  { id: "farmhouse",     nameEn: "Farmhouse",     nameAr: "ريفي" },
  { id: "coastal",       nameEn: "Coastal",       nameAr: "ساحلي" },
];

// ── Sellers ─────────────────────────────────────────────────────────────────
const sellerAhmad: Seller = {
  id: "s1", name: "Ahmad Al-Rashidi", nameAr: "أحمد الراشدي",
  rating: 4.8, reviewCount: 127, verified: true,
  location: "Riyadh, Saudi Arabia", locationAr: "الرياض، المملكة العربية السعودية",
  joinedYear: 2021, totalSales: 89,
};
const sellerLayla: Seller = {
  id: "s2", name: "Layla Designs", nameAr: "تصاميم ليلى",
  rating: 4.9, reviewCount: 243, verified: true,
  location: "Dubai, UAE", locationAr: "دبي، الإمارات",
  joinedYear: 2020, totalSales: 201,
};
const sellerKhalid: Seller = {
  id: "s3", name: "Khalid Home Studio", nameAr: "استوديو خالد للمنزل",
  rating: 4.7, reviewCount: 84, verified: false,
  location: "Cairo, Egypt", locationAr: "القاهرة، مصر",
  joinedYear: 2022, totalSales: 56,
};
const sellerNour: Seller = {
  id: "s4", name: "Nour & Co.", nameAr: "نور وشركاه",
  rating: 4.6, reviewCount: 52, verified: true,
  location: "Amman, Jordan", locationAr: "عمان، الأردن",
  joinedYear: 2023, totalSales: 38,
};

// ── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS: FurnitureProduct[] = [
  {
    id: "p1",
    nameEn: "Walnut Sectional Sofa",
    nameAr: "أريكة قسمية خشب الجوز",
    descriptionEn:
      "A beautifully crafted L-shaped sectional sofa with premium walnut frame and hand-stitched linen upholstery. Deep seat cushions offer exceptional comfort for everyday living.",
    descriptionAr:
      "أريكة قسمية على شكل L مصنوعة بعناية مع إطار من خشب الجوز الممتاز وتنجيد من الكتان المخيط يدوياً. مثالية للديكورات الحديثة.",
    price: 1,
    category: "living-room", style: "mid-century",
    material: "Walnut Wood, Linen",
    dimensions: { width: 280, height: 85, depth: 165, unit: "cm" },
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    ],
    seller: sellerAhmad, isFeatured: true, isNew: false,
    rating: 4.9, reviewCount: 34,
    tags: ["sofa", "sectional", "walnut", "linen"],
  },
  {
    id: "p2",
    nameEn: "Marble & Brass Dining Table",
    nameAr: "طاولة طعام رخام ونحاس",
    descriptionEn:
      "Stunning 8-seater dining table with Carrara marble top and brushed brass legs. Each marble slab is unique with natural veining patterns.",
    descriptionAr:
      "طاولة طعام مذهلة تتسع لـ 8 أشخاص مع سطح من رخام كارارا وأرجل من النحاس المصقول.",
    price: 1,
    category: "dining", style: "modern",
    material: "Carrara Marble, Brushed Brass",
    dimensions: { width: 240, height: 75, depth: 110, unit: "cm" },
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400",
    ],
    seller: sellerLayla, isFeatured: true, isNew: true,
    rating: 4.8, reviewCount: 22,
    tags: ["dining table", "marble", "brass"],
  },
  {
    id: "p3",
    nameEn: "Rattan Pendant Lamp",
    nameAr: "مصباح معلق روطان",
    descriptionEn:
      "Handwoven natural rattan pendant lamp creating warm, dappled ambient lighting. Each piece uniquely handcrafted by local artisans.",
    descriptionAr:
      "مصباح معلق من الروطان الطبيعي المنسوج يدوياً. يضفي إضاءة محيطة دافئة ومميزة.",
    price: 1,
    category: "lighting", style: "bohemian",
    material: "Natural Rattan",
    dimensions: { width: 45, height: 60, depth: 45, unit: "cm" },
    condition: "New",
    images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400"],
    seller: sellerAhmad, isFeatured: true, isNew: true,
    rating: 4.7, reviewCount: 58,
    tags: ["lamp", "rattan", "pendant", "lighting"],
  },
  {
    id: "p4",
    nameEn: "Oak Platform Bed",
    nameAr: "سرير منصة خشب البلوط",
    descriptionEn:
      "Low-profile platform bed with solid oak frame and slatted headboard. Clean Scandinavian lines for the modern bedroom. Fits standard king mattress.",
    descriptionAr:
      "سرير منصة منخفض المستوى بإطار صلب من خشب البلوط وسبورة رأس ذات شرائح. خطوط إسكندنافية نظيفة.",
    price: 1,
    category: "bedroom", style: "scandinavian",
    material: "Solid Oak",
    dimensions: { width: 180, height: 35, depth: 210, unit: "cm" },
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    ],
    seller: sellerLayla, isFeatured: false, isNew: false,
    rating: 4.6, reviewCount: 17,
    tags: ["bed", "oak", "platform", "bedroom"],
  },
  {
    id: "p5",
    nameEn: "Industrial Bookshelf",
    nameAr: "رف كتب صناعي",
    descriptionEn:
      "5-tier industrial bookshelf with steel frame and reclaimed wood shelves. Each shelf holds up to 25 kg. Perfect for home office or living room.",
    descriptionAr:
      "رف كتب صناعي بخمسة طوابق مع إطار فولاذي ورفوف من الخشب المستعاد.",
    price: 1,
    category: "office", style: "industrial",
    material: "Steel, Reclaimed Wood",
    dimensions: { width: 120, height: 180, depth: 35, unit: "cm" },
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
    seller: sellerAhmad, isFeatured: false, isNew: false,
    rating: 4.5, reviewCount: 29,
    tags: ["bookshelf", "steel", "wood", "office"],
  },
  {
    id: "p6",
    nameEn: "Ceramic Table Lamp",
    nameAr: "مصباح طاولة سيراميك",
    descriptionEn:
      "Hand-thrown ceramic base with linen shade. Warm terracotta tones add earthy character to any space. E27 bulb compatible.",
    descriptionAr:
      "قاعدة سيراميك مصنوعة يدوياً مع غطاء من الكتان. درجات التراكوتا الدافئة تضيف طابعاً أصيلاً.",
    price: 1,
    category: "lighting", style: "bohemian",
    material: "Ceramic, Linen",
    dimensions: { width: 30, height: 55, depth: 30, unit: "cm" },
    condition: "New",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"],
    seller: sellerLayla, isFeatured: false, isNew: true,
    rating: 4.8, reviewCount: 41,
    tags: ["lamp", "ceramic", "terracotta", "lighting"],
  },
  {
    id: "p7",
    nameEn: "Velvet Accent Chair",
    nameAr: "كرسي مخمل مميز",
    descriptionEn:
      "Sumptuous emerald velvet accent chair with gold-finished legs. A bold statement piece that elevates any living space. Hand-tufted back cushion.",
    descriptionAr:
      "كرسي مخمل زمردي فاخر مع أرجل مطلية بالذهب. قطعة جريئة ومميزة.",
    price: 1,
    category: "living-room", style: "modern",
    material: "Velvet, Gold-Finished Steel",
    dimensions: { width: 75, height: 90, depth: 80, unit: "cm" },
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400",
    ],
    seller: sellerKhalid, isFeatured: true, isNew: true,
    rating: 4.9, reviewCount: 63,
    tags: ["chair", "velvet", "accent", "gold"],
  },
  {
    id: "p8",
    nameEn: "Teak Outdoor Dining Set",
    nameAr: "طقم طاولة طعام خشب الساج للخارج",
    descriptionEn:
      "6-piece outdoor dining set in premium Grade-A teak wood. Weather-resistant and naturally beautiful. Includes table, 4 chairs, and cushions.",
    descriptionAr:
      "طقم طعام خارجي مكون من 6 قطع من خشب الساج الدرجة الأولى. مقاوم للطقس.",
    price: 1,
    category: "outdoor", style: "coastal",
    material: "Grade-A Teak, Sunbrella Fabric",
    dimensions: { width: 200, height: 75, depth: 100, unit: "cm" },
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
    seller: sellerLayla, isFeatured: false, isNew: false,
    rating: 4.7, reviewCount: 14,
    tags: ["outdoor", "teak", "dining", "set"],
  },
  {
    id: "p9",
    nameEn: "Macramé Wall Hanging",
    nameAr: "زينة جدار ماكراميه",
    descriptionEn:
      "Large handcrafted macramé wall art in natural cotton rope. 120 cm wide, a boho statement piece for living rooms and bedrooms.",
    descriptionAr:
      "عمل جداري ضخم من الماكراميه مصنوع يدوياً من حبل القطن الطبيعي بعرض 120 سم.",
    price: 1,
    category: "decor", style: "bohemian",
    material: "Natural Cotton Rope",
    dimensions: { width: 120, height: 90, depth: 5, unit: "cm" },
    condition: "New",
    images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=400"],
    seller: sellerKhalid, isFeatured: false, isNew: true,
    rating: 4.9, reviewCount: 77,
    tags: ["macrame", "wall art", "decor", "bohemian"],
  },
  {
    id: "p10",
    nameEn: "Leather Executive Desk",
    nameAr: "مكتب تنفيذي جلد",
    descriptionEn:
      "Full-grain leather and walnut executive desk with cable management and pull-out keyboard tray. The ultimate home office statement piece.",
    descriptionAr:
      "مكتب تنفيذي من الجلد الكامل وخشب الجوز مع إدارة الكابلات ودرج لوحة المفاتيح.",
    price: 1,
    category: "office", style: "mid-century",
    material: "Full-Grain Leather, Walnut",
    dimensions: { width: 160, height: 78, depth: 80, unit: "cm" },
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    ],
    seller: sellerLayla, isFeatured: false, isNew: false,
    rating: 4.8, reviewCount: 19,
    tags: ["desk", "leather", "office", "walnut"],
  },
  {
    id: "p11",
    nameEn: "Linen Cloud Sofa",
    nameAr: "أريكة سحابة كتان",
    descriptionEn:
      "Ultra-deep, modular linen sofa with detachable cushions. Sink-in comfort with a clean, architectural silhouette. Available in sand, sage and clay.",
    descriptionAr:
      "أريكة كتانية معيارية عميقة جداً مع وسائد قابلة للفصل. راحة استثنائية بتصميم نظيف.",
    price: 1,
    category: "living-room", style: "scandinavian",
    material: "Belgian Linen, Solid Beech",
    dimensions: { width: 310, height: 72, depth: 100, unit: "cm" },
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    ],
    seller: sellerNour, isFeatured: true, isNew: true,
    rating: 4.9, reviewCount: 41,
    tags: ["sofa", "linen", "modular", "cloud"],
  },
  {
    id: "p12",
    nameEn: "Arched Floor Lamp",
    nameAr: "مصباح أرضي قوسي",
    descriptionEn:
      "Statement arched floor lamp in matte black steel with a spun brass diffuser shade. Fully dimmable. Perfect for reading nooks and living rooms.",
    descriptionAr:
      "مصباح أرضي قوسي من الفولاذ الأسود مع غطاء من النحاس. قابل للتعتيم. مثالي لزوايا القراءة.",
    price: 1,
    category: "lighting", style: "modern",
    material: "Matte Black Steel, Spun Brass",
    dimensions: { width: 40, height: 185, depth: 40, unit: "cm" },
    condition: "New",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"],
    seller: sellerAhmad, isFeatured: true, isNew: true,
    rating: 4.7, reviewCount: 33,
    tags: ["lamp", "floor lamp", "arched", "modern"],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2025-001", product: PRODUCTS[0],
    status: "shipped", createdAt: "2025-02-15", updatedAt: "2025-02-18",
    amount: 1850, trackingNumber: "PI-TRK-8821",
  },
  {
    id: "ORD-2025-002", product: PRODUCTS[2],
    status: "delivered", createdAt: "2025-01-20", updatedAt: "2025-01-25",
    amount: 320, trackingNumber: "PI-TRK-7743",
  },
  {
    id: "ORD-2025-003", product: PRODUCTS[4],
    status: "pending", createdAt: "2025-03-01", updatedAt: "2025-03-01",
    amount: 680,
  },
  {
    id: "ORD-2025-004", product: PRODUCTS[6],
    status: "confirmed", createdAt: "2025-03-05", updatedAt: "2025-03-06",
    amount: 890, trackingNumber: "PI-TRK-9102",
  },
];
