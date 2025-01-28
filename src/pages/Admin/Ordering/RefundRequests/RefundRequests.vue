<template>
  <div class="pending-orders container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Refund Requests</h1>
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
              <li class="dropdown-item cursor-pointer d-block">60</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="search-field">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-label="Product Name"
            aria-describedby="button-addon2"
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
        :isTableEmpty="refundRequests?.length === 0"
      >
        <tr
          v-if="refundRequests?.length > 0"
          v-for="refund in refundRequests"
          :key="refund?.id"
        >
          <td class="fs-6 fs-light p-3">
            {{ refund?.id?.split("-")[4] }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ refund?.customerInfo?.firstName }}
            {{ refund?.customerInfo?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ refund?.productInfo?.productName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ refund?.productQuantity }}
          </td>
          <td class="fs-6 fs-light p-3">₱{{ refund?.totalPrice }}</td>
          <td
            class="fs-6 fs-medium p-3"
            :class="{
              'text-warning': order?.status === 'pending',
              'text-success': order?.status === 'approved',
            }"
          >
            {{ firstLetterUppercase(refund?.status) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(refund?.updatedAt) }}
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
                    class="btn btn-dark w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#refundRequestsModal"
                    @click="viewOrderDetails(refund?.id)"
                  >
                    View
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </Table>
    </div>

    <div
      ref="refundRequestsModal"
      class="modal fade"
      id="refundRequestsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="refundRequestsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-3 fs-medium"
              id="refundRequestsModalLabel"
            >
              Refund Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="fs-5 fs-medium border-bottom">
              Order #{{ selectedRefundRequest?.id }}
            </p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Customer Name:</p>
              <p class="mb-0">
                {{ selectedRefundRequest?.customerInfo?.firstName }}
                {{ selectedRefundRequest?.customerInfo?.lastName }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Contact Details:</p>
              <p class="mb-0">
                {{ selectedRefundRequest?.contactDetails }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Status:</p>
              <p
                class="mb-0 fs-medium"
                :class="{
                  'text-warning': selectedRefundRequest?.status === 'pending',
                  'text-success': selectedRefundRequest?.status === 'approved',
                  'text-danger': selectedRefundRequest?.status === 'cancelled',
                }"
              >
                {{ firstLetterUppercase(selectedRefundRequest?.status) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Transaction Date:</p>
              <p class="mb-0">
                {{ formatDate(selectedRefundRequest?.createdAt) }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Product Information</p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Product Name:</p>
              <p class="mb-0">
                {{
                  formatString(selectedRefundRequest?.productInfo?.productName)
                }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Quantity:</p>
              <p class="mb-0">
                {{ selectedRefundRequest?.productQuantity }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0 me-5">Product Price:</p>
              <p class="mb-0 text-end">
                {{ selectedRefundRequest?.productPrice }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Refund Information</p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Mode Of Payment:</p>
              <p class="mb-0">
                {{ formatString(selectedRefundRequest?.paymentMethod) }}
              </p>
            </div>
            <div
              v-if="selectedRefundRequest?.paymentMethod === 'gcash'"
              class="d-flex justify-content-between w-100 mb-3"
            >
              <p class="fs-medium mb-0">Gcash Ref Number:</p>
              <p class="mb-0">
                {{ formatString(selectedRefundRequest?.gcashRefNumber) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Refund Reason:</p>
              <p class="mb-0">
                {{ formatString(selectedRefundRequest?.refundReason) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <div
                v-for="media in selectedRefundRequest?.medias"
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
            <div class="d-flex justify-content-between w-100 mt-3 border-top">
              <p class="fs-medium mb-0 fs-5">Grand Total:</p>
              <p class="mb-0 fs-5">₱{{ selectedRefundRequest?.totalPrice }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-if="selectedRefundRequest?.status === 'pending'"
              type="button"
              class="btn btn-danger"
              @click="
                setNewTransactionStatus(selectedRefundRequest?.id, 'cancelled')
              "
            >
              Cancel
            </button>
            <button
              v-if="selectedRefundRequest?.status === 'pending'"
              type="button"
              class="btn btn-primary"
              @click="
                setNewTransactionStatus(selectedRefundRequest?.id, 'approved')
              "
            >
              Approved
            </button>
            <button
              v-if="selectedRefundRequest?.status === 'approved'"
              type="button"
              class="btn btn-success"
              @click="
                setNewTransactionStatus(selectedRefundRequest?.id, 'completed')
              "
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { tableHeaders } from "./componentData";
import { database, ref as dbRef, update } from "../../../../boot/firebase";
import {
  formatDate,
  firstLetterUppercase,
  formatString,
} from "../../../../composables/Helpers";

import Table from "../../../../components/Table/Table.vue";
import Swal from "sweetalert2";
import {
  GetAllRefundTransactionsAPI,
  UpdateRefundTransactionStatusAPI,
} from "../../../../composables/RefundRequest";

const router = useRouter();
const refundRequests = ref([]);
const selectedRefundRequest = ref(null);

const getAllRefundRequests = async () => {
  try {
    const [pendingRequests, approvedRequests] = await Promise.all([
      GetAllRefundTransactionsAPI("pending"),
      GetAllRefundTransactionsAPI("approved"),
    ]);

    if (
      pendingRequests.status === "failed" ||
      approvedRequests.status === "failed"
    ) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch refund requests",
        text: pendingRequests.message || approvedRequests.message,
      });
      return;
    }

    refundRequests.value = [
      ...pendingRequests.data,
      ...approvedRequests.data,
    ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error(error);
  }
};

const setNewTransactionStatus = async (id, status) => {
  Swal.fire({
    icon: "info",
    title: "Updating transaction status",
    text: `Are you sure you want to update the transaction status to ${status}?`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      updateTransactionStatus(id, status);
    }
  });
};

const updateTransactionStatus = async (id, status) => {
  try {
    const payload = {
      status: status,
    };

    const response = await UpdateRefundTransactionStatusAPI(id, payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to update transaction status",
        text: response.message,
      });
      return;
    }

    const refundRef = dbRef(database, `refunds/${id}`);
    update(
      refundRef,
      { notificationStatus: "unread", status },
      { merge: true }
    );

    Swal.fire({
      icon: "success",
      title: "Transaction status updated",
      text: response.message,
    });
    router.go();
  } catch (error) {
    console.log(error);
  }
};

const viewOrderDetails = (id) => {
  selectedRefundRequest.value = refundRequests.value.find(
    (order) => order.id === id
  );
};

onMounted(() => {
  getAllRefundRequests();
});
</script>

<style scoped lang="scss">
@import "./RefundRequests.scss";
</style>
