<template>
  <div class="container-fluid">
    <h2 class="mb-4">Orders History</h2>
    <div class="order-list">
      <span class="d-block text-center" v-if="pendingOrders.length === 0">
        No Orders History found.
      </span>
      <div
        v-else
        v-for="order in pendingOrders"
        :key="order?.id"
        class="card mb-3"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Order #{{ order?.id }}</h5>
              <p class="text-muted">{{ formatDate(order?.updatedAt) }}</p>
            </div>
            <div class="d-flex gap-2">
              <span
                class="badge"
                :class="{
                  'bg-success': order?.status === 'completed',
                  'bg-danger': order?.status === 'cancelled',
                }"
              >
                {{ firstLetterUppercase(order?.status) }}
              </span>
            </div>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted"
                >Items: {{ order?.products?.length }}</span
              >
              <span class="h5 mb-0"
                >₱{{ order?.totalTransactionPrice.toFixed(2) }}</span
              >
            </div>
          </div>

          <div class="mt-3">
            <button
              class="btn btn-success me-2"
              @click="viewOrderDetails(order?.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Order Details Modal -->
  <div
    ref="viewProductModal"
    class="modal fade"
    id="viewProductModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="viewProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="viewProductModalLabel">
            Order Details # {{ selectedOrder?.id }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <h2 class="fs-semi-bold fs-heading-6">Order Information</h2>
              <p class="fs-text-paragram">
                Date: {{ selectedOrder?.createdAt }}
              </p>
              <p class="fs-text-paragram">
                Status: {{ selectedOrder?.status }}
              </p>
              <p class="fs-text-paragram">
                Payment: {{ firstLetterUppercase(selectedOrder?.paymentType) }}
              </p>
            </div>
            <div class="col-md-6">
              <h2 class="fs-semi-bold fs-heading-6">Shipping Address</h2>
              <p class="fs-text-paragram">
                {{ selectedOrder?.shippingAddress }}
              </p>
            </div>
          </div>

          <div class="fs-text-paragraph mt-3 text-semi-bold">Order Items</div>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in selectedOrder?.products" :key="product?.id">
                <td>{{ product?.productInfo?.productName }}</td>
                <td>{{ product?.purchasedQuantity }}</td>
                <td>₱{{ product?.totalPrice }}</td>
                <td>
                  <div class="d-flex">
                    <button
                      class="btn btn-light"
                      @click="toggleAddReviewModal(product?.productInfo?.id)"
                    >
                      <StarReview color="#000000" size="30" />
                    </button>

                    <button
                      class="btn btn-light"
                      @click="toggleRequestRefund(product?.productInfo?.id)"
                    >
                      <RefundIcon color="#000000" size="30" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-end me-5">
            <p class="text-semi-bold mt-3 me-3">
              Total: ₱{{ selectedOrder?.totalTransactionPrice.toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Review Modal -->
  <div
    ref="reviewModal"
    class="modal fade"
    id="reviewModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="reviewModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="reviewModalLabel">
            Leave a Review (either for the product or the store)
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="rate" class="form-label">Rate (1-5)</label>
            <div class="star-rating">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ filled: star <= rate }"
                @click="rate = star"
              >
                ★
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label for="review" class="form-label">Comment</label>
            <textarea
              type="text"
              class="form-control"
              id="review"
              v-model="review"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="media" class="form-label">Upload Images/Videos</label>
            <input
              type="file"
              class="form-control"
              id="media"
              multiple
              accept="image/*,video/*"
              @change="handleMediaUpload($event, 'reviews')"
            />
          </div>

          <div v-if="isUploading" class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              :style="{ width: `${uploadProgress}%` }"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <!-- Display uploaded media -->
          <div class="mt-3">
            <h5>Uploaded Media:</h5>
            <div v-if="uploadedMedia.length > 0" class="d-flex flex-wrap gap-2">
              <div
                v-for="(file, index) in uploadedMedia"
                :key="index"
                class="media-preview"
              >
                <div v-if="file.mediaType.startsWith('image/')">
                  <img
                    :src="file.mediaURL"
                    class="img-thumbnail"
                    style="max-width: 200px; max-height: 200px"
                    alt="Preview"
                  />
                </div>
                <div v-else-if="file.mediaType.startsWith('video/')">
                  <video
                    :src="file.mediaURL"
                    autoplay
                    muted
                    loop
                    class="img-thumbnail"
                    style="max-width: 290px; max-height: 290px"
                  ></video>
                </div>
              </div>
            </div>
            <p v-else>No files uploaded yet.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="submitReview(selectedProduct?.productInfo?.id)"
            :disabled="isUploading"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Refund Request Modal -->
  <div
    ref="refundRequestModal"
    class="modal fade"
    id="refundRequestModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="refundRequestModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="refundRequestModalLabel">
            Request Refund for Product #{{ selectedProduct?.productInfo?.id }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="contactDetails" class="form-label"
              >Contact Details</label
            >
            <div class="contactDetails">
              <input
                type="text"
                class="form-control"
                id="contactDetails"
                v-model="refundContactDetails"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="mod" class="form-label">Mode Of Payment</label>
            <div class="mod">
              <select class="form-select" v-model="paymentMethod">
                <option value="counter">Over the counter</option>
                <option value="cod">Cash On Delivery</option>
                <option value="gcash">GCash</option>
              </select>
            </div>
          </div>
          <div v-if="paymentMethod === 'gcash'" class="mb-3">
            <label for="gcashNumber" class="form-label">Gcash Number</label>
            <span v-if="isGcashNumberInvalid" class="text-danger fs-6 d-block">
              Invalid GCash number. Please provide a valid GCash number.
            </span>
            <div class="gcashNumber">
              <input
                type="text"
                class="form-control"
                id="gcashNumber"
                v-model="gcashNumber"
                @input="setGcashNumber()"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="refundQty" class="form-label">Quantity</label>
            <p>{{ selectedProduct?.purchasedQuantity }}</p>
          </div>
          <div class="mb-3">
            <label for="refundReason" class="form-label">Refund Reason</label>
            <textarea
              type="text"
              class="form-control"
              id="refundReason"
              v-model="refundReason"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="media" class="form-label">Upload Images/Videos</label>
            <input
              type="file"
              class="form-control"
              id="media"
              multiple
              accept="image/*,video/*"
              @change="handleMediaUpload($event, 'refunds')"
            />
          </div>

          <div v-if="isUploading" class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              :style="{ width: `${uploadProgress}%` }"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <!-- Display uploaded media -->
          <div class="mt-3">
            <h5>Uploaded Media:</h5>
            <div v-if="uploadedMedia.length > 0" class="d-flex flex-wrap gap-2">
              <div
                v-for="(file, index) in uploadedMedia"
                :key="index"
                class="media-preview"
              >
                <div v-if="file.mediaType.startsWith('image/')">
                  <img
                    :src="file.mediaURL"
                    class="img-thumbnail"
                    style="max-width: 200px; max-height: 200px"
                    alt="Preview"
                  />
                </div>
                <div v-else-if="file.mediaType.startsWith('video/')">
                  <video
                    :src="file.mediaURL"
                    autoplay
                    muted
                    loop
                    class="img-thumbnail"
                    style="max-width: 290px; max-height: 290px"
                  ></video>
                </div>
              </div>
            </div>
            <p v-else>No files uploaded yet.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addNewRefundRequest(selectedProduct?.productInfo?.id)"
            :disabled="isUploading || isGcashNumberInvalid"
          >
            Request Refund
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, database, set } from "../../../boot/firebase";
import { useUserStore } from "../../../store/userStore";
import { firstLetterUppercase } from "../../../composables/Helpers";
import { AddNewProductReviewAPI } from "../../../composables/Reviews";
import { GetAllCustomerTransactionsByID } from "../../../composables/Transaction";

import Swal from "sweetalert2";

import StarReview from "../../../assets/icons/StarReview.vue";
import RefundIcon from "../../../assets/icons/RefundIcon.vue";
import { AddNewRefundTransactionAPI } from "../../../composables/RefundRequest";

const storage = getStorage();
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const pendingOrders = ref([]);
const selectedOrder = ref(null);
const selectedProduct = ref(null);
const rate = ref(0);
const review = ref("");
const isUploading = ref(false);
const uploadedMedia = ref([]);

const uploadProgress = ref(0);
const reviewModal = ref(null);
const viewProductModal = ref(null);
const refundRequestModal = ref(null);
const reviewModalInstance = ref(null);
const viewProductModalInstance = ref(null);
const refundRequestModalInstance = ref(null);

const refundContactDetails = ref("");
const refundQuantity = ref(1);
const refundReason = ref("");
const paymentMethod = ref("");
const gcashNumber = ref("");

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(async () => {
  reviewModalInstance.value = new bootstrap.Modal(reviewModal.value);
  viewProductModalInstance.value = new bootstrap.Modal(viewProductModal.value);
  refundRequestModalInstance.value = new bootstrap.Modal(
    refundRequestModal.value
  );

  try {
    const userID = userStore.getUserInfo().id;
    const response = await GetAllCustomerTransactionsByID(userID);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message,
      });
      return;
    }

    pendingOrders.value = response.data.filter(
      (order) => order.status === "completed"
    );

    pendingOrders.value = pendingOrders.value.map((order) => {
      let totalTransactionPrice = 0;

      // Calculate the total price for all products in the order
      for (const item of order.products) {
        totalTransactionPrice += parseFloat(item.totalPrice); // Ensure totalPrice is a number
      }

      // Add the totalTransactionPrice to the order object
      return {
        ...order,
        totalTransactionPrice, // Include the calculated total in the order
      };
    });

    if (route.params.id) {
      viewOrderDetails(route.params.id);
    }
  } catch (error) {
    console.error(error);
  }
});

const viewOrderDetails = (orderID) => {
  selectedOrder.value = pendingOrders.value.find(
    (order) => order.id === orderID
  );

  viewProductModalInstance.value.show();
};

const toggleAddReviewModal = (productID) => {
  selectedProduct.value = selectedOrder.value.products.find(
    (product) => product?.productInfo?.id === productID
  );
  viewProductModalInstance.value.hide();
  reviewModalInstance.value.show();
};

const handleMediaUpload = async (event, folderName) => {
  let files = Array.from(event.target.files);
  isUploading.value = true;

  for (let file of files) {
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please upload files smaller than 10MB.",
      });
      isUploading.value = false;
      file = null;
      return;
    }
    const fileRef = storageRef(
      storage,
      `${folderName}/${Date.now()}-${file.name}`
    );
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgress.value = progress; // Update the progress value
      },
      (error) => {
        console.error("Error uploading file:", error);
        isUploading.value = false;
      },
      async () => {
        // Get the download URL after upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        uploadedMedia.value.push({
          mediaURL: downloadURL,
          mediaType: file.type,
        });
        isUploading.value = false;
        uploadProgress.value = 0;
      }
    );
  }
};

const submitReview = async (productID) => {
  try {
    if (!rate.value || !review.value) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please provide a rating and a review before submitting.",
      });
      return;
    }

    if (rate.value < 1 || rate.value > 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Please provide a rating between 1 and 5.",
      });
      rate.value = null;
      return;
    }

    const userID = userStore.getUserInfo().id;

    const payload = {
      userID,
      productID,
      userRating: rate.value,
      userComment: review.value,
      mediasReview: uploadedMedia.value,
    };

    const response = await AddNewProductReviewAPI(payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to Submit Review",
        text: response.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Review Submitted",
      text: "Thank you for your feedback!",
    });

    // Reset fields
    rate.value = null;
    review.value = "";
    uploadedMedia.value = [];
    reviewModalInstance.value.hide();
  } catch (error) {
    console.error(error);
  }
};

const addNewRefundRequest = async (productID) => {
  try {
    const userID = userStore.getUserInfo().id;

    const payload = {
      userID,
      productID,
      contactDetails: refundContactDetails.value,
      productQuantity: selectedProduct.value.purchasedQuantity,
      productPrice: selectedProduct.value.productPrice,
      totalPrice: selectedProduct.value.productPrice * refundQuantity.value,
      refundReason: refundReason.value,
      paymentMethod: paymentMethod.value,
      gcashNumber: gcashNumber.value || "n/a",
      status: "pending",
      mediasRefund: uploadedMedia.value,
    };

    const response = await AddNewRefundTransactionAPI(payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to Request Refund",
        text: response.message,
      });
      return;
    }

    payload.refundID = response.data.id;

    await addNewOrderInFirebase(payload);

    Swal.fire({
      icon: "success",
      title: "Refund Request Sent",
      text: "Your refund request has been sent successfully.",
    });
  } catch (error) {
    console.error(error);
  } finally {
    refundRequestModalInstance.value.hide();
    uploadedMedia.value = [];
  }
};

const toggleRequestRefund = async (productID) => {
  selectedProduct.value = selectedOrder.value.products.find(
    (product) => product?.productInfo?.id === productID
  );

  console.log(selectedProduct.value);

  try {
    const response = await Swal.fire({
      title: "Request Refund",
      text: "Are you sure you want to request a refund for this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (response.isConfirmed) {
      refundRequestModalInstance.value.show();
    }
  } catch (error) {
    console.error(error);
  }
};

const addNewOrderInFirebase = async (refundData) => {
  const orderRef = dbRef(database, `refunds/${refundData.refundID}`);
  delete refundData.mediasRefund;
  await set(orderRef, {
    ...refundData,
    notificationStatus: "unread",
  });
};

const isGcashNumberInvalid = ref(false);

const setGcashNumber = () => {
  if (!gcashNumber.value) {
    isGcashNumberInvalid.value = false;
    return;
  }

  if (!gcashNumber.value.match(/^(09|\+639)\d{11}$/)) {
    isGcashNumberInvalid.value = true;
    return;
  }

  isGcashNumberInvalid.value = false;
};
</script>

<style lang="scss" scoped>
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

@media (max-width: 767px) {
  .modal-dialog {
    max-width: 100%;
    margin: 0;
  }
}

.star-rating {
  display: flex;
  gap: 5px;
  font-size: 2rem;
  cursor: pointer;

  .star {
    color: #ccc; // Default star color
    transition: color 0.3s;

    &.filled {
      color: #ffd700; // Filled star color
    }

    .star:hover,
    .star:hover ~ .star,
    .star:hover:nth-child(-n + 5) {
      color: #ffd700;
    }
  }
}
</style>
