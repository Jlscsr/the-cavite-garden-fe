<template>
  <div class="pending-orders container-fluid">
    <div class="title">
      <h1 class="fs-1 fs-medium">Pending Orders</h1>
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
            Show visibility
          </button>
          <div class="dropdown-menu">
            <ul class="d-flex list-unstyled mb-0">
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Order #
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Costumer
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Address
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Transaction Date
              </li>
              <li class="fs-6 fs-light dropdown-item cursor-pointer d-block">
                Actions
              </li>
            </ul>
          </div>
        </div>
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
        :isTableEmpty="pendingOrders?.length === 0"
      >
        <tr
          v-if="pendingOrders?.length > 0"
          v-for="order in pendingOrders"
          :key="order?.id"
        >
          <td class="fs-6 fs-light p-3">
            {{ order?.id }}
          </td>
          <td class="fs-6 fs-light p-3">
            {{ order?.firstName }} {{ order?.lastName }}
          </td>
          <td class="fs-6 fs-light p-3 text-truncate" style="max-width: 200px">
            {{ order?.shippingAddress ? order.shippingAddress : "N/A" }}
          </td>
          <td class="fs-6 fs-light p-3">₱{{ order?.totalPrice }}</td>
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
                    data-bs-target="#pendingOrdersModal"
                    @click="viewOrderDetails(order?.id)"
                  >
                    View
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'approved')"
                  >
                    Approve Order
                  </button>
                </li>
                <li class="px-2 mb-1 cursor-pointer text-center fs-light">
                  <button
                    class="btn btn-danger w-100"
                    @click="setNewTransactionStatus(order?.id, 'cancelled')"
                  >
                    Cancel Order
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </Table>
    </div>
    <div
      ref="pendingOrdersModal"
      class="modal fade"
      id="pendingOrdersModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="pendingOrdersModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 fs-medium" id="pendingOrdersModalLabel">
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
              Order #{{ selectedOrder?.id }}
            </p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Customer Name:</p>
              <p class="mb-0">
                {{ selectedOrder?.firstName }}
                {{ selectedOrder?.lastName }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Status:</p>
              <p
                class="mb-0 fs-medium"
                :class="{
                  'text-warning': selectedOrder?.status === 'pending',
                  'text-success': selectedOrder?.status === 'approved',
                  'text-danger': selectedOrder?.status === 'cancelled',
                }"
              >
                {{ firstLetterUppercase(selectedOrder?.status) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Transaction Date:</p>
              <p class="mb-0">
                {{ formatDate(selectedOrder?.createdAt) }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Checkout Information</p>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Delivery Method:</p>
              <p class="mb-0">
                {{ formatString(selectedOrder?.deliveryMethod) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Payment Method:</p>
              <p class="mb-0">
                {{ formatString(selectedOrder?.paymentMethod) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0 me-5">Shipping Address:</p>
              <p class="mb-0 text-end">
                {{
                  selectedOrder?.shippingAddress
                    ? selectedOrder.shippingAddress
                    : "N/A"
                }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Purchased products</p>
            <div
              v-for="product in selectedOrder?.productsPurchased"
              :key="product.id"
              class="mb-3"
            >
              <div class="d-flex justify-content-between w-100 border-bottom">
                <p class="fs-medium mb-0">
                  {{ product.productName }}
                </p>
                <div class="mb-0">
                  <p class="mb-0 text-end">x{{ product.productQuantity }}</p>
                  <p class="mb-0">₱{{ product.productPrice }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mb-0">Total:</p>
                <p class="mb-0">
                  ₱{{ product.productQuantity * product.productPrice }}.00
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between w-100 mt-3 border-top">
              <p class="fs-medium mb-0 fs-5">Grand Total:</p>
              <p class="mb-0 fs-5">₱{{ selectedOrder?.totalPrice }}</p>
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
import { ref, onMounted, computed } from "vue";
import { tableHeaders } from "./componentData";
import { database, ref as dbRef, update } from "../../../../boot/firebase";
import {
  formatDate,
  firstLetterUppercase,
  formatString,
} from "../../../../composables/Helpers";
import {
  getAllTransactions,
  updateTransactionStatus,
} from "../../../../composables/Transaction";

import Table from "../../../../components/Table/Table.vue";
import swal from "sweetalert";

const pendingOrders = ref([]);
const selectedOrder = ref("");

const setNewTransactionStatus = async (id, status) => {
  let swalMessage = null;
  let swalMessageAfterReq = null;

  if (status === "approved") {
    swalMessage = {
      title: "Confirm Order Approval",
      text: "Are you sure you want to approve this order?",
      icon: "info",
      buttons: ["Cancel", "Yes, approve order"],
    };
    swalMessageAfterReq = "Order has been approved!";
  } else if (status === "cancelled") {
    swalMessage = {
      title: "Confirm Cancel Approval",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      buttons: ["Cancel", "Yes, cancel order"],
    };
    swalMessageAfterReq = "Order has been cancelled!";
  }

  /*  swal(swalMessage).then(async (value) => {
    if (value) {
    }
  }); */

  try {
    const response = await updateTransactionStatus(id, status);

    if (response.status === "failed") {
      //   swal("Something went wrong", "", "error");
      return;
    }

    // add realtime database update base on the id here
    const transactionRef = dbRef(database, `transaction/${id}`);

    await update(transactionRef, { status });

    // swal(swalMessageAfterReq, "", status === "approved" ? "success" : "error");
    await getAllOrderTransactions();
  } catch (error) {
    console.error(error);
  }
};

const viewOrderDetails = (id) => {
  pendingOrders.value.forEach((order) => {
    if (order.id === id) {
      selectedOrder.value = order;
    }
  });
};

const getAllOrderTransactions = async () => {
  try {
    const response = await getAllTransactions("pending");

    if (response.status === "failed") {
      pendingOrders.value = [];
      return;
    }

    pendingOrders.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  await getAllOrderTransactions();
});
</script>

<style scoped lang="scss">
@import "./PendingOrders.scss";
</style>
