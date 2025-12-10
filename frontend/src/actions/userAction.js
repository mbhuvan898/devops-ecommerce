import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
} from '../constants/userConstants';

import axios from 'axios';

// ✔ Base URL for all user APIs inside ALB
const API_BASE = "/api/v1";


// -------------------------------
// LOGIN USER
// -------------------------------
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${API_BASE}/login`,
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response?.data?.message || "Login failed",
        });
    }
};


// -------------------------------
// REGISTER USER
// -------------------------------
export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${API_BASE}/register`,
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response?.data?.message || "Registration failed",
        });
    }
};


// -------------------------------
// LOAD USER DETAILS
// -------------------------------
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`${API_BASE}/me`, {
            withCredentials: true,
        });

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.message || "Failed to load user",
        });
    }
};


// -------------------------------
// LOGOUT USER
// -------------------------------
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(`${API_BASE}/logout`, { withCredentials: true });
        dispatch({ type: LOGOUT_USER_SUCCESS });

    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response?.data?.message || "Logout failed",
        });
    }
};


// -------------------------------
// UPDATE PROFILE
// -------------------------------
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.put(
            `${API_BASE}/me/update`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || "Profile update failed",
        });
    }
};


// -------------------------------
// UPDATE PASSWORD
// -------------------------------
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.put(
            `${API_BASE}/password/update`,
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response?.data?.message || "Password update failed",
        });
    }
};


// -------------------------------
// FORGOT PASSWORD
// -------------------------------
export const forgotPassword = (emailData) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const emailValue =
            emailData instanceof FormData ? emailData.get("email")
                : typeof emailData === "object" ? emailData.email
                    : emailData;

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `${API_BASE}/password/forgot`,
            { email: emailValue },
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response?.data?.message || "Error sending email",
        });
    }
};


// -------------------------------
// RESET PASSWORD
// -------------------------------
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `${API_BASE}/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response?.data?.message || "Reset failed",
        });
    }
};


// -------------------------------
// ADMIN – GET ALL USERS
// -------------------------------
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get(`${API_BASE}/admin/users`, {
            withCredentials: true,
        });

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response?.data?.message || "Failed fetching users",
        });
    }
};


// -------------------------------
// ADMIN – GET USER DETAILS
// -------------------------------
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`${API_BASE}/admin/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response?.data?.message || "User not found",
        });
    }
};


// -------------------------------
// ADMIN – UPDATE USER
// -------------------------------
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `${API_BASE}/admin/user/${id}`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response?.data?.message || "Update failed",
        });
    }
};


// -------------------------------
// ADMIN – DELETE USER
// -------------------------------
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(
            `${API_BASE}/admin/user/${id}`
        );

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response?.data?.message || "Delete failed",
        });
    }
};


// -------------------------------
// CLEAR ERRORS
// -------------------------------
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
