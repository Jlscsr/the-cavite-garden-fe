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
          v-for="order in refundRequests"
          :key="order?.id"
        >
          <td class="fs-6 fs-light p-3">
            {{ order?.id?.split("-")[4] }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ order?.customerInfo?.firstName }}
            {{ order?.customerInfo?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ order?.products?.length }}
          </td>
          <td class="fs-6 fs-light p-3">₱{{ order?.totalTransactionPrice }}</td>
          <td
            class="fs-6 fs-medium p-3"
            :class="{
              'text-warning': order?.status === 'pending',
              'text-success': order?.status === 'approved',
              'text-danger': order?.status === 'cancelled',
            }"
          >
            {{ firstLetterUppercase(order?.status) }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ formatDate(order?.createdAt) }}
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
                    @click="viewOrderDetails(order?.id)"
                  >
                    View
                  </button>
                </li>
                <li
                  v-if="order?.status === 'pending'"
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'approved')"
                  >
                    Approved
                  </button>
                </li>

                <li
                  v-if="order?.status === 'approved'"
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'complete')"
                  >
                    Completed
                  </button>
                </li>

                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-danger w-100"
                    @click="setNewTransactionStatus(order?.id, 'cancelled')"
                  >
                    Cancel
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
              Order Details
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
            <p class="fs-5 fs-medium border-bottom">Checkout Information</p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Delivery Method:</p>
              <p class="mb-0">
                {{ formatString(selectedRefundRequest?.orderType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Payment Method:</p>
              <p class="mb-0">
                {{ formatString(selectedRefundRequest?.paymentType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0 me-5">Shipping Address:</p>
              <p class="mb-0 text-end">
                {{
                  selectedRefundRequest?.shippingAddress
                    ? selectedRefundRequest?.shippingAddress
                    : "N/A"
                }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Purchased products</p>
            <div
              v-for="product in selectedRefundRequest?.products"
              :key="product.id"
              class="mb-3"
            >
              <div class="d-flex justify-content-between w-100 border-bottom">
                <p class="fs-medium mb-0">
                  {{ product?.productInfo?.productName }}
                </p>
                <div class="mb-0">
                  <p class="mb-0 text-end">x{{ product.purchasedQuantity }}</p>
                  <p class="mb-0">₱{{ product.productPrice }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-0">Total:</p>
                <p class="mb-0">
                  ₱{{ product.purchasedQuantity * product.productPrice }}.00
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between w-100 mt-3 border-top">
              <p class="fs-medium mb-0 fs-5">Grand Total:</p>
              <p class="mb-0 fs-5">
                ₱{{ selectedRefundRequest?.totalTransactionPrice }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              <span> Close </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  GetAllTransactionAPI,
  UpdateTransactionOrderPurpose,
} from "../../../../composables/Transaction";

const refundRequests = ref([]);
const selectedRefundRequest = ref(null);

const getAllRefundRequests = async () => {
  try {
    const response = await GetAllTransactionAPI("all", "refund");

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch refund requests",
        text: response.message,
      });
      return;
    }

    refundRequests.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const setNewTransactionStatus = async (id, status) => {
  try {
    const payload = {
      status: status,
    };

    const response = await UpdateTransactionOrderPurpose(id, payload);

    if (response.status === "failed") {
      Swal.fire({
        icon: "error",
        title: "Failed to update transaction status",
        text: response.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Transaction status updated",
      text: response.message,
    });
  } catch (error) {
    console.error(error);
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
