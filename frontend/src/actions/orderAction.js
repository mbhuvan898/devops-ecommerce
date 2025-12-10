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

// Correct backend base route
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
// Get single order details
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
// Get payment status
// -------------------------------------------------
export const getPaymentStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_STATUS_REQUEST });

        const { data } = await axios.get(
            `${API_BASE}/payment/status/${id}`,
            { withCredentials: true }
        );

        dispatch({
            type: PAYMENT_STATUS_SUCCESS,
            payload: data.txn,
        });

    } catch (error) {
        dispatch({
            type: PAYMENT_STATUS_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// ADMIN: Get all orders
// -------------------------------------------------
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(
            `${API_BASE}/admin/orders`,
            { withCredentials: true }
        );

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders,
        });

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// ADMIN: Update order
// -------------------------------------------------
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const { data } = await axios.put(
            `${API_BASE}/admin/order/${id}`,
            orderData,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


// -------------------------------------------------
// ADMIN: Delete order
// -------------------------------------------------
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(
            `${API_BASE}/admin/order/${id}`,
            { withCredentials: true }
        );

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response?.data?.message,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

