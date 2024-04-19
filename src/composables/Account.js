import { API } from "../boot/axios";

const getUserInfo = async () => {
    try {
        const response = await API.get("/user/info");
        if (response.status !== 200) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const addNewUserAddress = async (address) => {
    try {
        const response = await API.post("/user/address/add", address);
        if (response.status !== 201) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { getUserInfo, addNewUserAddress };
