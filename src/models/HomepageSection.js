import mongoose from "mongoose";

const homepageSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: String,

    // Not required at the schema level because "categories" and
    // "promo_banner" layouts don't use this field at all — see
    // validateSourceFields in the service for the layout-aware validation
    // that actually enforces it where it matters.
    sourceType: { type: String, enum: ["category", "promo", "custom"] },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    promoFlag: {
      type: String,
      enum: ["isFeatured", "isNewArrival", "isHotSale", "isFlashSale"],
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    limit: { type: Number, default: 8 },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    // "grid"         — the plain product row.
    // "featured"      — banner + catalog-spread product grid.
    // "categories"    — "Shop by Category" tile grid, no products.
    // "promo_banner"  — a full-bleed text announcement strip (headline,
    //                   description, CTA button, optional background
    //                   image) — no products or categories involved at all.
    layout: {
      type: String,
      enum: ["grid", "featured", "categories", "promo_banner"],
      default: "grid",
    },
    banner: {
      image: { url: String, publicId: String },
      title: String,
      subtitle: String,
      linkUrl: String,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    // Only used when layout === "promo_banner".
    promoBanner: {
      image: { url: String, publicId: String }, // optional — a solid dark background is used if omitted
      heading: String,
      description: String,
      ctaLabel: String,
      ctaUrl: String,
      textTheme: { type: String, enum: ["light", "dark"], default: "light" }, // "light" text for a dark image, "dark" text for a light image
    },
  },
  { timestamps: true }
);

export default mongoose.model("HomepageSection", homepageSectionSchema);
