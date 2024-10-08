import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const { data } = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,

        });
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message,
        });
    }
}

//load seller

export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        });
        const { data } = await axios.get(`${server}/shop/getSeller`, {
            withCredentials: true,

        });
        console.log("API Response Data:", data);
        dispatch({
            type: "LoadSellerSuccess",
            payload: data.seller,
        });
    } catch (error) {
        console.error("Error fetching seller data:", error);
        dispatch({
            type: "LoadSellerFail",
            payload: error.response.data.message,
        });
    }
}