import axios from "axios";
import {
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    NEW_ORDER_FAIL,
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    PAYMENT_STATUS_FAIL,
    PAYMENT_STATUS_REQUEST,
    PAYMENT_STATUS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

const API_BASE = "/api/v1";


// -------------------------------------------------
// Create new order
// -------------------------------------------------
export const newOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST });

        const { data } = await axios.post(
            `${API_BASE}/order/new`,
            order,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// Get logged-in user's orders
// -------------------------------------------------
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get(
            `${API_BASE}/orders/me`,
            { withCredentials: true }
        );

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// Get order details
// -------------------------------------------------
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(
            `${API_BASE}/order/${id}`,
            { withCredentials: true }
        );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// Clear errors
// -------------------------------------------------
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
