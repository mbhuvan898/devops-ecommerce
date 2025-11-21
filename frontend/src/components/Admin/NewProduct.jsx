import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: ""
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cuttedPrice, setCuttedPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [productType, setProductType] = useState("");
    const [stock, setStock] = useState("");
    const [warranty, setWarranty] = useState("");
    const [brand, setBrand] = useState("");
    
    // Images state - array of objects with public_id and url
    const [images, setImages] = useState([]);
    const [imageInput, setImageInput] = useState({
        public_id: "",
        url: ""
    });

    // Logo state - object with public_id and url
    const [logo, setLogo] = useState({
        public_id: "",
        url: ""
    });
    const [logoPreview, setLogoPreview] = useState("");

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    }

    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    }

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    }

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index))
    }

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index))
    }

    const handleImageInputChange = (e) => {
        setImageInput({ ...imageInput, [e.target.name]: e.target.value });
    }

    const addImage = () => {
        if (!imageInput.public_id.trim() || !imageInput.url.trim()) {
            enqueueSnackbar("Please enter both Image ID and URL", { variant: "warning" });
            return;
        }
        setImages([...images, imageInput]);
        setImageInput({ public_id: "", url: "" });
    }

    const deleteImage = (index) => {
        setImages(images.filter((img, i) => i !== index))
    }

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        // Required field checks
        if (highlights.length <= 0) {
            enqueueSnackbar("Add Highlights", { variant: "warning" });
            return;
        }
        if (!logo.public_id || !logo.url) {
            enqueueSnackbar("Add Brand Logo (ID and URL)", { variant: "warning" });
            return;
        }
        if (specs.length <= 1) {
            enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
            return;
        }
        if (images.length <= 0) {
            enqueueSnackbar("Add Product Images", { variant: "warning" });
            return;
        }

        const productData = {
            name,
            description,
            price: Number(price),
            cuttedPrice: Number(cuttedPrice),
            category,
            subcategory,
            productType,
            stock: Number(stock),
            warranty: Number(warranty),
            brand: {
                name: brand,
                logo: logo
            },
            images: images,
            highlights: highlights,
            specifications: specs
        };

        dispatch(createProduct(productData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/products");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Product | Best2Buy" />

            {loading && <BackdropLoader />}
            <form onSubmit={newProductSubmitHandler} className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <TextField
                        label="Product Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between gap-2">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Cutted Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((el, i) => (
                                <MenuItem value={el} key={i}>
                                    {el}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Subcategory"
                            type="text"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            placeholder="e.g. Washing Machines"
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Product Type"
                            type="text"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            placeholder="e.g. Front Load"
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 9999
                                }
                            }}
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            label="Warranty (Years)"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                        />
                    </div>

                    <h2 className="font-medium text-gray-700">Highlights</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border rounded">
                            <input 
                                value={highlightInput} 
                                onChange={(e) => setHighlightInput(e.target.value)} 
                                type="text" 
                                placeholder="e.g. 7 Kg Capacity" 
                                className="px-2 py-2 flex-1 outline-none border-none" 
                            />
                            <span onClick={() => addHighlight()} className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer">Add</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                    <p className="text-green-800 text-sm font-medium">{h}</p>
                                    <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="font-medium text-gray-700">Brand Details</h2>
                    <div className="flex flex-col gap-2">
                        <TextField
                            label="Brand Name"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            placeholder="e.g. LG"
                        />
                        <TextField
                            label="Logo Public ID"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={logo.public_id}
                            onChange={(e) => setLogo({ ...logo, public_id: e.target.value })}
                            placeholder="e.g. lg_logo"
                        />
                        <TextField
                            label="Logo URL"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={logo.url}
                            onChange={(e) => {
                                setLogo({ ...logo, url: e.target.value });
                                setLogoPreview(e.target.value);
                            }}
                            placeholder="https://example.com/logo.png"
                        />
                        {logoPreview && (
                            <div className="w-24 h-24 flex items-center justify-center border rounded-lg p-2 bg-gray-50">
                                <img 
                                    draggable="false" 
                                    src={logoPreview} 
                                    alt="Brand Logo" 
                                    className="w-full h-full object-contain" 
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        enqueueSnackbar("Invalid logo URL", { variant: "warning" });
                                    }} 
                                />
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                    <h2 className="font-medium text-gray-700">Specifications</h2>

                    <div className="flex justify-evenly gap-2 items-center">
                        <TextField 
                            value={specsInput.title} 
                            onChange={handleSpecsChange} 
                            name="title" 
                            label="Title" 
                            placeholder="Capacity" 
                            variant="outlined" 
                            size="small" 
                        />
                        <TextField 
                            value={specsInput.description} 
                            onChange={handleSpecsChange} 
                            name="description" 
                            label="Description" 
                            placeholder="7 Kg" 
                            variant="outlined" 
                            size="small" 
                        />
                        <span onClick={() => addSpecs()} className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer">Add</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                                <p className="text-gray-700 font-medium">{spec.title}</p>
                                <p className="text-gray-600">{spec.description}</p>
                                <span onClick={() => deleteSpec(i)} className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer">
                                    <DeleteIcon />
                                </span>
                            </div>
                        ))}
                    </div>

                    <h2 className="font-medium text-gray-700 mt-2">Product Images</h2>
                    <div className="flex flex-col gap-2">
                        <TextField 
                            value={imageInput.public_id} 
                            onChange={handleImageInputChange} 
                            name="public_id" 
                            label="Image Public ID" 
                            placeholder="lg_washing_machine_1" 
                            variant="outlined" 
                            size="small" 
                            fullWidth
                        />
                        <div className="flex gap-2">
                            <TextField 
                                value={imageInput.url} 
                                onChange={handleImageInputChange} 
                                name="url" 
                                label="Image URL" 
                                placeholder="https://example.com/image.jpg" 
                                variant="outlined" 
                                size="small" 
                                fullWidth
                            />
                            <span onClick={() => addImage()} className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer whitespace-nowrap">Add</span>
                        </div>

                        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                            {images.map((img, i) => (
                                <div key={i} className="flex justify-between items-center rounded py-2 px-3 bg-gray-50 border">
                                    <img 
                                        draggable="false" 
                                        src={img.url} 
                                        alt="Product" 
                                        className="w-16 h-16 object-contain rounded" 
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=Error'} 
                                    />
                                    <div className="flex-1 mx-3">
                                        <p className="text-xs text-gray-500 font-medium">ID: {img.public_id}</p>
                                        <p className="text-xs text-gray-600 truncate">{img.url}</p>
                                    </div>
                                    <span onClick={() => deleteImage(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <input 
                            form="mainform" 
                            type="submit" 
                            className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" 
                            value="Submit" 
                        />
                    </div>

                </div>

            </form>
        </>
    );
};

export default NewProduct;