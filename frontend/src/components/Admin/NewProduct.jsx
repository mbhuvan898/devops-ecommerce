import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { createProduct, clearErrors } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

// CATEGORIES DATA - Matching MinCategory.jsx structure
const detailedCategories = [
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

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, success, error } = useSelector(
    (state) => state.newProduct
  );

  // ---------------- BASIC INFO ----------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cuttedPrice, setCuttedPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productType, setProductType] = useState("");
  const [stock, setStock] = useState("");
  const [warranty, setWarranty] = useState("");

  // ---------------- BRAND ----------------
  const [brand, setBrand] = useState("");
  const [logo, setLogo] = useState({ public_id: "", url: "" });
  const [logoPreview, setLogoPreview] = useState("");

  // ---------------- HIGHLIGHTS ----------------
  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  // ---------------- SPECS ----------------
  const [specInput, setSpecInput] = useState({ title: "", description: "" });
  const [specifications, setSpecifications] = useState([]);

  // ---------------- IMAGES (FILES) ----------------
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // ---------------- DEPENDENT DROPDOWNS ----------------
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [availableProductTypes, setAvailableProductTypes] = useState([]);

  // Update subcategories when category changes
  useEffect(() => {
    if (category) {
      const selectedCat = detailedCategories.find(cat => cat.name === category);
      setAvailableSubcategories(selectedCat ? selectedCat.subcategories : []);
      setSubcategory(""); // Reset subcategory
      setProductType(""); // Reset product type
      setAvailableProductTypes([]);
    } else {
      setAvailableSubcategories([]);
      setAvailableProductTypes([]);
    }
  }, [category]);

  // Update product types when subcategory changes
  useEffect(() => {
    if (subcategory && category) {
      const selectedCat = detailedCategories.find(cat => cat.name === category);
      if (selectedCat) {
        const selectedSub = selectedCat.subcategories.find(sub => sub.name === subcategory);
        setAvailableProductTypes(selectedSub ? selectedSub.types : []);
        setProductType(""); // Reset product type
      }
    } else {
      setAvailableProductTypes([]);
    }
  }, [subcategory, category]);

  // =====================================================
  // IMAGE HANDLER (FILES ONLY)
  // =====================================================
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      setImages((old) => [...old, file]);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // =====================================================
  // ADD / REMOVE HIGHLIGHTS
  // =====================================================
  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const removeHighlight = (i) =>
    setHighlights(highlights.filter((_, idx) => idx !== i));

  // =====================================================
  // ADD / REMOVE SPECS
  // =====================================================
  const addSpec = () => {
    if (!specInput.title || !specInput.description) return;
    setSpecifications([...specifications, specInput]);
    setSpecInput({ title: "", description: "" });
  };

  const removeSpec = (i) =>
    setSpecifications(specifications.filter((_, idx) => idx !== i));

  // =====================================================
  // SUBMIT
  // =====================================================
  const submitHandler = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      enqueueSnackbar("Upload at least one image", { variant: "warning" });
      return;
    }

    if (highlights.length === 0) {
      enqueueSnackbar("Add at least one highlight", { variant: "warning" });
      return;
    }

    if (specifications.length < 2) {
      enqueueSnackbar("Add at least 2 specifications", { variant: "warning" });
      return;
    }

    if (!logo.url || !logo.public_id) {
      enqueueSnackbar("Add brand logo URL and public_id", { variant: "warning" });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("cuttedPrice", cuttedPrice);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("productType", productType);
    formData.append("stock", stock);
    formData.append("warranty", warranty);

    formData.append("brand[name]", brand);
    formData.append("brand[logo][public_id]", logo.public_id);
    formData.append("brand[logo][url]", logo.url);

    highlights.forEach((h) => formData.append("highlights[]", h));
    specifications.forEach((s, i) => {
      formData.append(`specifications[${i}][title]`, s.title);
      formData.append(`specifications[${i}][description]`, s.description);
    });

    images.forEach((img) => formData.append("images", img));

    dispatch(createProduct(formData));
  };

  // =====================================================
  // EFFECTS
  // =====================================================
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Product created successfully", {
        variant: "success",
      });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, enqueueSnackbar, navigate]);

  // =====================================================
  // UI
  // =====================================================
  return (
    <>
      <MetaData title="Admin: New Product | Best2Buy" />
      {loading && <BackdropLoader />}

      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the product details below</p>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* ============= LEFT COLUMN ============= */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
            
            <TextField 
              label="Product Name" 
              required 
              fullWidth 
              size="small"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Redmi Note 13 Pro+ 5G"
            />
            
            <TextField 
              label="Description" 
              multiline 
              rows={3} 
              required 
              fullWidth 
              size="small"
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed product description..."
            />

            <div className="grid grid-cols-2 gap-3">
              <TextField 
                label="Price (₹)" 
                type="number" 
                required 
                fullWidth
                size="small"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField 
                label="Original Price (₹)" 
                type="number" 
                required 
                fullWidth
                size="small"
                value={cuttedPrice} 
                onChange={(e) => setCuttedPrice(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </div>

            {/* CATEGORY DROPDOWN */}
            <TextField 
              label="Category" 
              select 
              required 
              fullWidth 
              size="small"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {detailedCategories.map((cat) => (
                <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
              ))}
            </TextField>

            {/* SUBCATEGORY DROPDOWN - Depends on Category */}
            <TextField 
              label="Subcategory" 
              select
              fullWidth 
              size="small"
              value={subcategory} 
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
            >
              <MenuItem value="">
                <em>{category ? "Select Subcategory" : "Select Category First"}</em>
              </MenuItem>
              {availableSubcategories.map((sub) => (
                <MenuItem key={sub.name} value={sub.name}>{sub.name}</MenuItem>
              ))}
            </TextField>

            {/* PRODUCT TYPE DROPDOWN - Depends on Subcategory */}
            <TextField 
              label="Product Type" 
              select
              fullWidth 
              size="small"
              value={productType} 
              onChange={(e) => setProductType(e.target.value)}
              disabled={!subcategory}
            >
              <MenuItem value="">
                <em>{subcategory ? "Select Product Type" : "Select Subcategory First"}</em>
              </MenuItem>
              {availableProductTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <div className="grid grid-cols-2 gap-3">
              <TextField 
                label="Stock" 
                type="number" 
                required 
                fullWidth
                size="small"
                value={stock} 
                onChange={(e) => setStock(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField 
                label="Warranty (Years)" 
                type="number" 
                required 
                fullWidth
                size="small"
                value={warranty} 
                onChange={(e) => setWarranty(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </div>

            {/* BRAND SECTION */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">Brand Details</h2>
            
            <TextField 
              label="Brand Name" 
              required 
              fullWidth 
              size="small"
              value={brand} 
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Samsung, Redmi, Apple"
            />

            <TextField 
              label="Logo Public ID" 
              required 
              fullWidth 
              size="small"
              value={logo.public_id} 
              onChange={(e) => setLogo({ ...logo, public_id: e.target.value })}
              placeholder="e.g. samsung_logo"
            />

            <TextField 
              label="Logo URL" 
              required 
              fullWidth 
              size="small"
              value={logo.url} 
              onChange={(e) => {
                setLogo({ ...logo, url: e.target.value });
                setLogoPreview(e.target.value);
              }}
              placeholder="https://example.com/logo.svg"
            />

            {logoPreview && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                <img 
                  src={logoPreview} 
                  alt="Brand Logo" 
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    enqueueSnackbar("Invalid logo URL", { variant: "warning" });
                  }}
                />
              </div>
            )}

            {/* HIGHLIGHTS SECTION */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">Product Highlights</h2>
            
            <div className="flex gap-2">
              <TextField 
                label="Add Highlight" 
                fullWidth 
                size="small"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="e.g. 6.7 inch AMOLED Display"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
              />
              <button 
                type="button"
                onClick={addHighlight}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-sm text-green-800 flex-1">{h}</span>
                  <button 
                    type="button"
                    onClick={() => removeHighlight(i)}
                    className="text-red-600 hover:bg-red-100 p-1 rounded-full transition-colors"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              ))}
              {highlights.length === 0 && (
                <p className="text-sm text-gray-500 italic">No highlights added yet</p>
              )}
            </div>
          </div>

          {/* ============= RIGHT COLUMN ============= */}
          <div className="space-y-4">
            {/* SPECIFICATIONS SECTION */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Specifications</h2>
            
            <div className="space-y-3">
              <TextField 
                label="Specification Title" 
                fullWidth 
                size="small"
                value={specInput.title}
                onChange={(e) => setSpecInput({ ...specInput, title: e.target.value })}
                placeholder="e.g. Display, Processor, RAM"
              />
              <TextField 
                label="Specification Description" 
                fullWidth 
                size="small"
                value={specInput.description}
                onChange={(e) => setSpecInput({ ...specInput, description: e.target.value })}
                placeholder="e.g. 6.7 inch, Full HD+"
              />
              <button 
                type="button"
                onClick={addSpec}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Specification
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {specifications.map((spec, i) => (
                <div key={i} className="flex items-start justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-900">{spec.title}</p>
                    <p className="text-sm text-blue-700">{spec.description}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="text-red-600 hover:bg-red-100 p-1 rounded-full transition-colors ml-2"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              ))}
              {specifications.length === 0 && (
                <p className="text-sm text-gray-500 italic">No specifications added yet</p>
              )}
            </div>

            {/* IMAGES SECTION */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">Product Images</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <ImageIcon className="text-gray-400 mb-2" style={{ fontSize: 48 }} />
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImagesChange}
                  className="hidden"
                />
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload images
                </span>
                <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
              </label>
            </div>

            {imagesPreview.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {imagesPreview.map((img, i) => (
                  <div key={i} className="relative group">
                    <img 
                      src={img} 
                      alt={`preview-${i}`} 
                      className="w-full h-24 object-cover border-2 border-gray-200 rounded-lg group-hover:border-blue-500 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all" />
                  </div>
                ))}
              </div>
            )}

            {imagesPreview.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center">No images uploaded yet</p>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
