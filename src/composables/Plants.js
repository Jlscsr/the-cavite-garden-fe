import { API } from "../boot/axios";

const getAllPlants = async () => {
    try {
        const response = await API.get("/plant");

        if (response.status !== 200) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching plants: ", error.message);
        return [];
    }
};

const getAllPlantsByCategory = async (categoryId) => {
    try {
        const response = await API.get("/plant/category/" + categoryId);

        if (response.status !== 200) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching plants by category: ${error.message}`);
        return [];
    }
};

const addNewPlant = async (plant) => {
    try {
        const response = await API.post("/plant/add", plant);

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(`Error adding new plant: ${error.message}`);
        return false;
    }
};

const editPlant = async (id, plant) => {
    try {
        const response = await API.put(`/plant/edit/${id}`, plant);

        if (response.status !== 201) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(`Error editing plant: ${error.message}`);
        return false;
    }
};

const deletePlant = async (id) => {
    try {
        const response = await API.delete(`/plant/delete/${id}`);
        console.log(response);
        if (response.status !== 200) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.error(`Error deleting plant: ${error.message}`);
        return false;
    }
};

export {
    getAllPlants,
    getAllPlantsByCategory,
    addNewPlant,
    editPlant,
    deletePlant,
};
