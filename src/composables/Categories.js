import { API } from "../boot/axios";

const getAllPlantCategories = async () => {
    try {
        const response = await API.get("/categories");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const addNewCategory = async (category) => {
    try {
        const response = await API.post("/category/add", category);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const addNewSubCategory = async (subcategory) => {
    try {
        const response = await API.post("/subcategory/add", subcategory);

        return response.data;
    } catch (error) {
        return error.response.data;
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

export {
    getAllPlantCategories,
    addNewCategory,
    editCategory,
    deleteCategory,
    addNewSubCategory,
};
