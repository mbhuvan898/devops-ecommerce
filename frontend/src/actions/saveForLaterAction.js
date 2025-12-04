import {
    REMOVE_FROM_SAVE_FOR_LATER,
    SAVE_FOR_LATER,
} from "../constants/saveForLaterConstants";

// Save item for later
export const saveForLater = (id) => async (dispatch, getState) => {
    const cartItemsArr = getState().cart.cartItems;
    const product = cartItemsArr.find((item) => item.product === id);

    dispatch({
        type: SAVE_FOR_LATER,
        payload: product,
    });

    localStorage.setItem(
        "saveForLaterItems",
        JSON.stringify(getState().saveForLater.saveForLaterItems)
    );
};

// Remove item from save for later
export const removeFromSaveForLater = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_SAVE_FOR_LATER,
        payload: id,
    });

    localStorage.setItem(
        "saveForLaterItems",
        JSON.stringify(getState().saveForLater.saveForLaterItems)
    );
};
