import { API } from "../boot/axios";

const GetAllReviewsAPI = async () => {
  try {
    const response = await API.get("/reviews");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetAllProductReviews = async () => {
  try {
    const response = await API.get("/product/reviews");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AddNewProductReviewAPI = async (payload) => {
  try {
    const response = await API.post("/product/review/add", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AddNewProductReviewReplyAPI = async (payload) => {
  try {
    const response = await API.post("/product/review/reply/add", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const DeleteProductReviewAPI = async (id) => {
  try {
    const response = await API.delete(`/product/review/delete/${id}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  AddNewProductReviewAPI,
  GetAllProductReviews,
  GetAllReviewsAPI,
  DeleteProductReviewAPI,
  AddNewProductReviewReplyAPI,
};
