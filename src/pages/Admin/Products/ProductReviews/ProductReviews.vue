<template>
  <div class="container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Product Reviews</h1>
    </div>
    <div class="content mt-5 d-flex justify-content-between align-items-center">
      <div class="buttons">
        <div class="dropdown">
          <button
            class="btn btn-outline-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Show 10 Rows
          </button>
          <div class="dropdown-menu">
            <ul class="d-flex list-unstyled mb-0">
              <li class="dropdown-item cursor-pointer d-block">10</li>
              <li class="dropdown-item cursor-pointer d-block">20</li>
              <li class="dropdown-item cursor-pointer d-block">30</li>
              <li class="dropdown-item cursor-pointer d-block">50</li>
              <li class="dropdown-item cursor-pointer d-block">All</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="search-field">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search by product name"
            aria-label="Product Name"
            aria-describedby="button-addon2"
            v-model="searchQuery"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="table-container mt-4">
      <Table
        :tableHeaders="tableHeaders"
        :isTableEmpty="productReviews.length === 0"
      >
        <tr
          v-if="productReviews.length > 0"
          v-for="review in productReviews"
          :key="review.id"
        >
          <td class="fs-6 fs-medium p-3">
            {{ firstLetterUppercase(review?.product?.productName) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ review?.user?.firstName }} {{ review?.user?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ review?.userRating }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(review.createdAt) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(review.updatedAt) }}
          </td>
          <td class="text-center">
            <div class="btn-group dropstart">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-h"></i>
              </button>
              <ul class="dropdown-menu">
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-success w-100"
                    @click="viewReviewDetails(review)"
                  >
                    View
                  </button>
                </li>

                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-danger w-100"
                    @click="deleteReview(review.id)"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </Table>
    </div>
  </div>

  <ReviewDetailsModal
    ref="reviewDetailsModal"
    :reviewDetails="selectedReview"
    @close-modal="closeModal"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  GetAllReviewsAPI,
  DeleteProductReviewAPI,
} from "../../../../composables/Reviews";
import {
  formatDate,
  firstLetterUppercase,
} from "../../../../composables/Helpers";
import { useBootstrapModal } from "../../../../composables/helpers/UseBootStrapModal";
import { displaySuccessNotification } from "../../../../composables/helpers/NotificationService";

import Swal from "sweetalert2";

import ReviewDetailsModal from "./components/ReviewDetailsModal/ReviewDetailsModal.vue";
import Table from "../../../../components/Table/Table.vue";

const tableHeaders = [
  {
    id: 1,
    label: "Product Name",
  },
  {
    id: 2,
    label: "User Name",
  },
  {
    id: 3,
    label: "Rating",
  },
  {
    id: 4,
    label: "Date Created",
  },

  {
    id: 5,
    label: "Date Modified",
  },
];

const reviewDetailsModal = ref(null);
const { show: showReviewDetailsModal, hide: hideReviewDetailsModal } =
  useBootstrapModal(reviewDetailsModal);

const productReviews = ref([]);
const selectedReview = ref(null);

const getAllReviews = async () => {
  try {
    const response = await GetAllReviewsAPI();

    if (response.status === "failed") {
      console.log(response["message"]);
      productReviews.value = [];
      return;
    }

    // filter out first all the reviews that has a value in key "product" of 'false'
    response.data = response.data.filter((review) => review.product !== false);

    productReviews.value = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (error) {
    console.error(error);
  }
};

const viewReviewDetails = (review) => {
  selectedReview.value = review;
  showReviewDetailsModal();
};

const deleteReview = async (reviewId) => {
  try {
    Swal.fire({
      title: "Delete Review",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it.",
      cancelButtonText: "No, cancel.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteProductReviewAPI(reviewId);

        if (response.status === "failed") {
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          console.log(response.message);
          return;
        }

        displaySuccessNotification("Review deleted successfully");
        getAllReviews();
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const closeModal = () => {
  selectedReview.value = null;
  hideReviewDetailsModal();
};

onMounted(async () => {
  await getAllReviews();
});
</script>

<style lang="scss" scoped>
@import "./ProductReviews.scss";
</style>
