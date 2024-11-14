import { API } from "../boot/axios";

/**
 * Retrieves all products from the API.
 *
 * @return {Object} The data containing all products.
 */
const GetAllProductsAPI = async () => {
  try {
    const response = await API.get("/products");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetProductByIDAPI = async (productID) => {
  try {
    const response = await API.get(`/product/id/${productID}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Retrieves all products by category ID from the API.
 *
 * @param {int} categoryId - The ID of the category to retrieve products from.
 * @return {Object} The data containing products of the specified category.
 */
const GetAllProductsByCategoryIDAPI = async (categoryId) => {
  try {
    const response = await API.get("/products/category/" + categoryId);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Add a new product through the API.
 *
 * @param {Object} newProductInfo - The information of the new product to be added.
 * @return {Object} The data returned from the API after adding the new product.
 */
const AddNewProductAPI = async (newProductInfo) => {
  try {
    const response = await API.post("/product/add", newProductInfo);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Edit a product through the API.
 *
 * @param {int} productID - The ID of the product to be edited.
 * @param {Object} newProductInfo - The updated information of the product.
 * @return {Object} The data returned from the API after editing the product.
 */
const EditProductAPI = async (productID, newProductInfo) => {
  try {
    const response = await API.put(
      `/product/edit/${productID}`,
      newProductInfo
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Delete a product through the API.
 *
 * @param {int} productID - The ID of the product to delete.
 * @return {Object} The data returned from the API after deleting the product.
 */
const DeleteProductAPI = async (productID) => {
  try {
    const response = await API.delete(`/product/delete/${productID}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  GetAllProductsAPI,
  GetAllProductsByCategoryIDAPI,
  GetProductByIDAPI,
  AddNewProductAPI,
  EditProductAPI,
  DeleteProductAPI,
};
