// C:\Users\BHUVAN M\Downloads\newone\project\frontend\src\components\Cart\CartItem.jsx
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartItem = ({ product, name, price, cuttedPrice, image, stock, quantity, inConfirmOrder }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            enqueueSnackbar("Product Stock Limited", { variant: "warning" });
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            enqueueSnackbar("Minimum Quantity Reached", { variant: "warning" });
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Product Removed From Cart", { variant: "success" });
    }

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b">

            <Link to={`/product/${product}`} className="flex flex-col sm:flex-row gap-5 items-stretch w-full group">
                {/* Product Image */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                </div>

                {/* Product Details */}
                <div className="flex flex-col sm:gap-5 w-full pr-6">
                    {/* Product Name */}
                    <div className="flex flex-col sm:flex-row justify-between items-start pr-5">
                        <div className="flex flex-col gap-0.5 sm:w-3/5">
                            <p className="group-hover:text-primary-blue">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</p>
                            <span className="text-sm text-gray-500">Seller: RetailNet</span>
                        </div>

                        <div className="flex flex-col sm:gap-2 mt-2 sm:mt-0">
                            <p className="text-sm">Price: <span className="font-medium">₹{price?.toLocaleString()}</span></p>
                            {cuttedPrice && (
                                <p className="text-xs line-through text-gray-500">₹{cuttedPrice?.toLocaleString()}</p>
                            )}
                        </div>
                    </div>

                    {/* Quantity Controls & Remove - Only show if NOT in confirm order page */}
                    {!inConfirmOrder && (
                        <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6 items-center">
                            {/* Quantity */}
                            <div className="flex gap-1 items-center">
                                <span className="text-sm font-medium mr-2">Quantity:</span>
                                <button
                                    onClick={() => decreaseQuantity(product, quantity)}
                                    disabled={quantity <= 1}
                                    className="w-7 h-7 text-3xl font-light bg-gray-50 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <RemoveIcon />
                                </button>
                                <input
                                    className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    onClick={() => increaseQuantity(product, quantity, stock)}
                                    disabled={quantity >= stock}
                                    className="w-7 h-7 text-xl font-light bg-gray-50 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <AddIcon />
                                </button>
                            </div>

                            {/* Remove Item */}
                            <button
                                onClick={() => removeCartItem(product)}
                                className="font-medium hover:text-red-600 transition-colors"
                            >
                                REMOVE
                            </button>
                        </div>
                    )}

                    {/* Display quantity only in confirm order page */}
                    {inConfirmOrder && (
                        <div className="flex gap-2 items-center text-sm">
                            <span className="font-medium">Quantity:</span>
                            <span>{quantity}</span>
                        </div>
                    )}
                </div>
            </Link>

        </div>
    );
};

export default CartItem;