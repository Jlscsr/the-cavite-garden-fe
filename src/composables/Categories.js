import { API } from "../boot/axios";

const getAllPlantCategories = async () => {
    try {
        const response = await API.get("/categories");

        if (response.status !== 200) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching plant categories: ${error.message}`);
        return [];
    }
};

const addNewCategory = async (category) => {
    try {
        const response = await API.post("/category/add", category);

        if (response.status !== 201) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error("Error adding new category: ", error.message);
        return [];
    }
};

const editCategory = async (id, category) => {
    try {
        const response = await API.put("/category/edit/" + id, category);

        if (response.status !== 201) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error("Error editing category: ", error.message);
        return [];
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await API.delete("/category/delete/" + id);

        if (response.status !== 200) {
            return [];
        }

        return response.data;
    } catch (error) {
        console.error("Error deleting category: ", error.message);
        return [];
    }
};

export { getAllPlantCategories, addNewCategory, editCategory, deleteCategory };
