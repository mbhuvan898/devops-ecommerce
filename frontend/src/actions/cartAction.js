import axios from "axios";
import {
    ADD_TO_CART,
    EMPTY_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Add item to cart
export const addItemsToCart = (id, quantity = 1) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_BASE}/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            seller: data.product.brand?.name,
            price: data.product.price,
            cuttedPrice: data.product.cuttedPrice,
            image: data.product.images?.[0]?.url,
            stock: data.product.stock,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove item from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Empty cart
export const emptyCart = () => async (dispatch, getState) => {
    dispatch({ type: EMPTY_CART });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};
