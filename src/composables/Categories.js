import { API } from "../boot/axios";

/**
 * Retrieves all categories from the backend API.
 *
 * @return {Object} The data containing all categories.
 */
const GetAllCategoriesAPI = async () => {
    try {
        const response = await API.get("/categories");

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Add a new category through the API.
 *
 * @param {Object} newCategoryInfo - The category object to be added.
 * @return {Object} The data returned from the API after adding the category.
 */
const AddNewCategoryAPI = async (newCategoryInfo) => {
    try {
        const response = await API.post("/category/add", newCategoryInfo);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Add a new subcategory through the API.
 *
 * @param {Object} newSubcategoryInfo - The newSubcategoryInfo object to be added.
 * @return {Object} The data returned from the API after adding the subcategory.
 */
const AddNewSubCategoryAPI = async (newSubcategoryInfo) => {
    try {
        const response = await API.post("/subcategory/add", newSubcategoryInfo);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Edit a category through the API.
 *
 * @param {int} categoryID - The ID of the category to edit.
 * @param {Object} newCategoryInfo - The newCategoryInfo object with updated information.
 * @return {Object} The data returned from the API after editing the category.
 */
const EditCategoryAPI = async (categoryID, newCategoryInfo) => {
    try {
        const response = await API.put(
            "/category/edit/" + categoryID,
            newCategoryInfo
        );

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Delete a category through the API.
 *
 * @param {int} categoryID - The ID of the category to delete.
 * @return {Object} The data returned from the API after deleting the category.
 */
const DeleteCategoryAPI = async (categoryID) => {
    try {
        const response = await API.delete("/category/delete/" + categoryID);

        return response.data;
    } catch (error) {
        return response.data;
    }
};

export {
    GetAllCategoriesAPI,
    AddNewCategoryAPI,
    AddNewSubCategoryAPI,
    EditCategoryAPI,
    DeleteCategoryAPI,
};
