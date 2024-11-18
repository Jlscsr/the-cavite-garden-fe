import { API } from "../boot/axios";

const AddNewProductReviewAPI = async (payload) => {
  try {
    const response = await API.post("/product/review/add", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { AddNewProductReviewAPI };
