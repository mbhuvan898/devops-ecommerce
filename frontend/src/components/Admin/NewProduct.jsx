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
import { categories } from "../../utils/constants";

import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

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

  // ---------------- HIGHLIGHTS ----------------
  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  // ---------------- SPECS ----------------
  const [specInput, setSpecInput] = useState({ title: "", description: "" });
  const [specifications, setSpecifications] = useState([]);

  // ---------------- IMAGES (FILES) ----------------
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

    if (highlights.length === 0 || specifications.length < 2) {
      enqueueSnackbar("Add highlights & minimum 2 specs", {
        variant: "warning",
      });
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

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT */}
        <div className="space-y-3">
          <TextField label="Product Name" required fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Description" multiline rows={3} required fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField label="Price" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
          <TextField label="Cutted Price" type="number" required value={cuttedPrice} onChange={(e) => setCuttedPrice(e.target.value)} />
          <TextField label="Category" select required fullWidth value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField label="Subcategory" fullWidth value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
          <TextField label="Product Type" fullWidth value={productType} onChange={(e) => setProductType(e.target.value)} />
          <TextField label="Stock" type="number" required value={stock} onChange={(e) => setStock(e.target.value)} />
          <TextField label="Warranty (Years)" type="number" required value={warranty} onChange={(e) => setWarranty(e.target.value)} />
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <h3 className="font-semibold">Product Images</h3>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
          <div className="flex flex-wrap gap-2">
            {imagesPreview.map((img, i) => (
              <img key={i} src={img} alt="preview" className="w-24 h-24 object-contain border rounded" />
            ))}
          </div>

          <button type="submit" className="bg-primary-orange text-white px-6 py-3 rounded hover:shadow-lg">
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProduct;
