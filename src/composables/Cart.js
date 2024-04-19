import { API } from "../boot/axios";

const addToCart = async (data) => {
    try {
        const response = await API.post("/cart/add", data);

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

const getProductsInCart = async () => {
    try {
        const response = await API.get("/cart");

        if (response.status !== 200) {
            return false;
        }

        return response.data;
    } catch (error) {}
};

const deleteProductFromCart = async (id) => {
    try {
        const response = await API.delete(`/cart/delete/${id}`);
        console.log(response);

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};
export { addToCart, getProductsInCart, deleteProductFromCart };
