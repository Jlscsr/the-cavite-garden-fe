import { API } from "../boot/axios";

const addToCart = async (data) => {
    try {
        const response = await API.post("/cart/add", data);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const getProductsInCart = async () => {
    try {
        const response = await API.get("/cart");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const getProductsInCartByCustomerId = async (customerId) => {
    try {
        const response = await API.get(`/cart/customer/${customerId}`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const deleteProductFromCart = async (id) => {
    try {
        const response = await API.delete(`/cart/delete/${id}`);
        console.log(response);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
export {
    addToCart,
    getProductsInCartByCustomerId,
    getProductsInCart,
    deleteProductFromCart,
};
