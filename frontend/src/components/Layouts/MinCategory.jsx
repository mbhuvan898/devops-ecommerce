// src/components/Layouts/MinCategory.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

export const detailedCategories = [
  {
    name: "Mobiles",
    subcategories: [
      { name: "Smartphones", types: ["Android", "iPhone"] },
      { name: "Accessories", types: ["Chargers", "Cables", "Cases"] },
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      { name: "Men", types: ["Shirts", "T-Shirts", "Jeans", "Trousers", "Shoes", "Watches"] },
      { name: "Women", types: ["Sarees", "Kurtis", "Tops", "Dresses", "Jewellery", "Heels"] },
      { name: "Kids", types: ["Clothing", "Toys", "Footwear", "Baby Care"] },
    ],
  },
  {
    name: "Electronics",
    subcategories: [
      { name: "Laptops", types: ["Gaming", "Business", "2-in-1"] },
      { name: "Cameras", types: ["DSLR", "Mirrorless", "Action Cameras"] },
      { name: "Audio", types: ["Headphones", "Speakers", "Soundbars"] },
    ],
  },
  {
    name: "Home",
    subcategories: [
      { name: "Kitchen", types: ["Cookware", "Appliances", "Dining", "Storage"] },
      { name: "Decor", types: ["Lighting", "Wall Art", "Rugs", "Cushions"] },
    ],
  },
  {
    name: "Appliances",
    subcategories: [
      { name: "Televisions", types: ["Smart TVs", "LED TVs", "Android TVs"] },
      { name: "Washing Machines", types: ["Front Load", "Top Load"] },
      { name: "Refrigerators", types: ["Single Door", "Double Door"] },
      { name: "Kitchen Appliances", types: ["Microwaves", "Mixers", "Induction Cooktops"] },
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      { name: "Living Room", types: ["Sofas", "TV Units", "Center Tables", "Recliners"] },
      { name: "Bedroom", types: ["Beds", "Wardrobes", "Mattresses", "Side Tables"] },
      { name: "Office", types: ["Chairs", "Desks", "Bookshelves"] },
      { name: "Outdoor", types: ["Patio Sets", "Garden Chairs", "Swings"] },
    ],
  },
  {
    name: "Beauty,Toys & more",
    subcategories: [
      { name: "Beauty & Grooming", types: ["Makeup", "Perfumes", "Hair Dryers", "Trimmers"] },
      { name: "Toys & Games", types: ["Soft Toys", "Action Figures", "Puzzles", "Board Games"] },
      { name: "Sports & Fitness", types: ["Cricket", "Cycling", "Yoga Mats", "Fitness Bands"] },
    ],
  },
  {
    name: "Grocery",
    subcategories: [
      { name: "Fruits & Vegetables", types: ["Fresh Fruits", "Leafy Greens"] },
      { name: "Snacks & Beverages", types: ["Chips", "Soft Drinks", "Biscuits"] },
      { name: "Essentials", types: ["Detergents", "Cleaners", "Toiletries"] },
    ],
  },
];

const catNav = [
  { name: "Mobiles", icon: <SmartphoneIcon sx={{ fontSize: 18 }} /> },
  { name: "Fashion", icon: <CheckroomIcon sx={{ fontSize: 18 }} /> },
  { name: "Electronics", icon: <DevicesOutlinedIcon sx={{ fontSize: 18 }} /> },
  { name: "Home", icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} /> },
  { name: "Appliances", icon: <TvOutlinedIcon sx={{ fontSize: 18 }} /> },
  { name: "Furniture", icon: <WeekendOutlinedIcon sx={{ fontSize: 18 }} /> },
  { name: "Beauty,Toys & more", icon: <ChildCareOutlinedIcon sx={{ fontSize: 18 }} /> },
  { name: "Grocery", icon: <LocalGroceryStoreOutlinedIcon sx={{ fontSize: 18 }} /> },
];

const buildCategoryData = () =>
  catNav.map((cat) => {
    const exact = detailedCategories.find((d) => d.name === cat.name || d.name.toLowerCase() === cat.name.toLowerCase());
    return { ...cat, dropdownContent: exact ? exact.subcategories : [] };
  });

const MinCategory = () => {
  const categoriesData = buildCategoryData();
  const [open, setOpen] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const isTouchDevice = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  };

  return (
    <section
      ref={containerRef}
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        marginTop: 56,
        zIndex: 80,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          flexWrap: "nowrap",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {categoriesData.map((cat, idx) => {
          const hasDropdown = cat.dropdownContent && cat.dropdownContent.length > 0;
          const isOpen = open === cat.name;

          return (
            <div key={idx} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onMouseEnter={() => {
                  if (!isTouchDevice()) setOpen(cat.name);
                }}
                onClick={(e) => {
                  if (hasDropdown && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    setOpen((prev) => (prev === cat.name ? null : cat.name));
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  padding: "10px 14px",
                  borderRadius: 12,
                  transition: "300ms",
                  background: isOpen ? "rgba(34,139,34,0.1)" : "transparent",
                  boxShadow: isOpen ? "0 4px 12px rgba(34,139,34,0.15)" : "none",
                  transform: isOpen ? "translateY(-2px)" : "translateY(0)",
                  textDecoration: "none",
                }}
                className="mincat-btn"
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isOpen ? "#ffffff" : "rgba(34,139,34,0.1)",
                    boxShadow: isOpen ? "0 4px 12px rgba(34,139,34,0.2)" : "0 2px 6px rgba(34,139,34,0.1)",
                  }}
                  className="icon-container"
                >
                  <span style={{ color: "#228B22" }}>{cat.icon}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#212121" }}>
                    {cat.name}
                  </span>

                  {hasDropdown && (
                    <small style={{ fontSize: 10, color: "#228B22", display: "flex", alignItems: "center", gap: 2, marginTop: 3 }}>
                      {isOpen ? "Close" : "Explore"}
                      <ExpandMoreIcon
                        sx={{
                          fontSize: 14,
                          transition: "transform .3s",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </small>
                  )}
                </div>
              </Link>

              {/* DROPDOWN */}
              {hasDropdown && (
                <div
                  onMouseEnter={() => {
                    if (!isTouchDevice()) setOpen(cat.name);
                  }}
                  onMouseLeave={() => {
                    if (!isTouchDevice()) setOpen(null);
                  }}
                  style={{
                    position: "absolute",
                    ...(idx >= categoriesData.length - 3 ? { right: 0 } : { left: 0 }),
                    top: "100%",
                    marginTop: 4,
                    minWidth: 380,
                    maxWidth: 620,
                    background: "#ffffff",
                    border: "1px solid rgba(34,139,34,0.1)",
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    padding: 0,
                    zIndex: 1000,
                    display: isOpen ? "block" : "none",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                    transition: "300ms",
                    overflow: "hidden",
                  }}
                  className="dropdown-menu"
                >
                  <div style={{ height: 4, background: "#228B22" }} />

                  <div style={{ padding: "20px" }}>
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        paddingBottom: 16,
                        borderBottom: "2px solid rgba(34,139,34,0.1)",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#228B22" }}>
                          {cat.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#878787", textTransform: "uppercase" }}>
                          Popular Categories
                        </div>
                      </div>

                      <Link
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        style={{
                          textDecoration: "none",
                          color: "#ffffff",
                          background: "#228B22",
                          fontWeight: 700,
                          padding: "8px 16px",
                          borderRadius: 10,
                          fontSize: 12,
                        }}
                      >
                        View All →
                      </Link>
                    </div>

                    {/* GRID */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: 14,
                      }}
                    >
                      {cat.dropdownContent.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            padding: "12px",
                            borderRadius: 12,
                            border: "1px solid transparent",
                            background: "#fafafa",
                          }}
                          className="subcategory-card"
                        >
                          {/* TITLE */}
                          <Link
                            to={`/products?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#212121",
                                marginBottom: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#228B22",
                                }}
                              />
                              {sub.name}
                            </div>
                          </Link>

                          {/* TYPES ONLY — BRANDS REMOVED */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {sub.types.map((type, tIdx) => (
                              <Link
                                key={tIdx}
                                to={`/products?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub.name)}&productType=${encodeURIComponent(type)}`}
                                style={{
                                  fontSize: 12,
                                  color: "#878787",
                                  textDecoration: "none",
                                  padding: "8px 12px",
                                  borderRadius: 8,
                                  transition: "300ms",
                                }}
                                className="subcategory-type"
                              >
                                {type}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MinCategory;
