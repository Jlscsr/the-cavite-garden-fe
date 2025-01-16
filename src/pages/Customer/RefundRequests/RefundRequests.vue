// PendingOrders.vue
<template>
  <div class="container-fluid">
    <h2 class="mb-4">Refund Requests</h2>

    <div class="order-list">
      <span class="d-block text-center" v-if="refundRequests.length === 0">
        No refund requests found.
      </span>
      <div
        v-else
        v-for="refund in refundRequests"
        :key="refund?.id"
        class="card mb-3"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Refund #{{ refund?.id }}</h5>
              <p class="text-muted">{{ formatDate(refund?.updatedAt) }}</p>
            </div>
            <div class="d-flex gap-4">
              <span
                class="badge text-black"
                :class="{
                  'bg-warning': refund?.status === 'pending',
                  'bg-success': refund?.status === 'approved',
                }"
                >{{ firstLetterUppercase(refund?.status) }}
              </span>
            </div>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted"
                >Product Name:
                <span class="fw-bold">{{
                  refund?.productInfo?.productName
                }}</span></span
              >
            </div>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted"
                >Quantity: {{ refund?.productQuantity }}</span
              >
            </div>
          </div>

          <div class="order-details mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted"
                >Total Price: {{ refund?.totalPrice }}</span
              >
            </div>
          </div>

          <div class="mt-3">
            <button
              class="btn btn-success me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="viewRefundRequest(refund?.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    ref="viewRefundDetailsModal"
    class="modal fade"
    id="viewRefundDetailsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="viewRefundDetailsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="viewRefundDetailsModalLabel">
            Refund Details # {{ selectedRequest?.id }}
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
            <div class="col">
              <h2 class="fs-semi-bold fs-heading-6">Refund Information</h2>
              <p class="fs-text-paragram">
                Date: {{ selectedRequest?.createdAt }}
              </p>
              <p class="fs-text-paragram">
                Status: {{ selectedRequest?.status }}
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h2 class="fs-semi-bold fs-heading-6">Medias</h2>
              <div
                v-for="media in selectedRequest?.medias"
                class="medias"
                style="width: 150px"
              >
                <img
                  v-if="media.mediaType.split('/')[0] === 'image'"
                  style="width: 150px"
                  :src="media.mediaURL"
                  alt="Product Image"
                  class="img-fluid"
                />
                <video
                  v-else
                  :src="media.mediaURL"
                  controls
                  class="img-fluid"
                ></video>
              </div>
            </div>
          </div>

          <div class="fs-text-paragraph mt-3 text-semi-bold">Refund Item</div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ selectedRequest?.productInfo?.productName }}</td>
                <td>{{ selectedRequest?.productQuantity }}</td>
                <td>₱{{ selectedRequest?.productPrice }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-end me-5">
            <p class="text-semi-bold mt-3 me-3">
              Total: ₱{{ selectedRequest?.totalPrice }}
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import { firstLetterUppercase } from "../../../composables/Helpers";
import { GetAllRefundTransactionsAPI } from "../../../composables/RefundRequest";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import Swal from "sweetalert2";

const refundRequests = ref([]);
const selectedRequest = ref(null);
const viewRefundDetailsModal = ref(false);
const modalInstance = ref(null);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getAllRefundRequests = async () => {
  try {
    const [pendingRequests, ApprovedRequests] = await Promise.all([
      GetAllRefundTransactionsAPI("pending"),
      GetAllRefundTransactionsAPI("approved"),
    ]);

    if (
      pendingRequests.status === "failed" ||
      ApprovedRequests.status === "failed"
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch refund requests",
      });
    }

    refundRequests.value = pendingRequests.data.concat(ApprovedRequests.data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  modalInstance.value = new bootstrap.Modal(viewRefundDetailsModal.value);
  await getAllRefundRequests();
});

const viewRefundRequest = (refundID) => {
  console.log(refundID);
  selectedRequest.value = refundRequests.value.find(
    (request) => request.id === refundID
  );
  console.log(selectedRequest.value);
  modalInstance.value.show();
};
</script>

<style scoped></style>
