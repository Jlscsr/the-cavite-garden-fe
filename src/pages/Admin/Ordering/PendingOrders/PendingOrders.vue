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
                    data-bs-target="#pendingOrdersModal"
                    @click="viewOrderDetails(order?.id)"
                  >
                    View
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'over the counter' &&
                    order?.orderType === 'pickup' &&
                    order?.status === 'pending'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'PickedUp')"
                  >
                    Picked Up
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'over the counter' &&
                    order?.orderType === 'pickup' &&
                    order?.status === 'PickedUp'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'completed')"
                  >
                    Completed
                  </button>
                </li>

                <li
                  v-if="
                    order?.paymentType === 'counter' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'pending'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'Preparing')"
                  >
                    Start Preparing
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'counter' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'Preparing'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'To Ship')"
                  >
                    Ship Order
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'counter' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'To Ship'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'completed')"
                  >
                    Completed
                  </button>
                </li>

                <li
                  v-if="
                    order?.paymentType === 'gcash' &&
                    order?.orderType === 'pickup' &&
                    order?.status === 'Preparing'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'To Pick Up')"
                  >
                    Ready for Pickup
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'gcash' &&
                    order?.orderType === 'pickup' &&
                    order?.status === 'To Pick Up'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'completed')"
                  >
                    Completed
                  </button>
                </li>

                <li
                  v-if="
                    order?.paymentType === 'gcash' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'preparing'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'To Ship')"
                  >
                    Ship Order
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'gcash' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'To Ship'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'completed')"
                  >
                    Completed
                  </button>
                </li>

                <li
                  v-if="
                    order?.paymentType === 'cod' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'pending'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'To Ship')"
                  >
                    Ship Order
                  </button>
                </li>
                <li
                  v-if="
                    order?.paymentType === 'cod' &&
                    order?.orderType === 'delivery' &&
                    order?.status === 'To Ship'
                  "
                  class="px-2 mb-1 cursor-pointer text-center fs-light"
                >
                  <button
                    class="btn btn-success w-100"
                    @click="setNewTransactionStatus(order?.id, 'completed')"
                  >
                    Completed
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
                {{ selectedOrder?.customerInfo?.firstName }}
                {{ selectedOrder?.customerInfo?.lastName }}
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
                {{ formatString(selectedOrder?.orderType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0">Payment Method:</p>
              <p class="mb-0">
                {{ formatString(selectedOrder?.paymentType) }}
              </p>
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
              <p class="fs-medium mb-0 me-5">Shipping Address:</p>
              <p class="mb-0 text-end">
                {{
                  selectedOrder?.shippingAddress
                    ? selectedOrder?.shippingAddress
                    : "N/A"
                }}
              </p>
            </div>
            <p class="fs-5 fs-medium border-bottom">Purchased products</p>
            <div
              v-for="product in selectedOrder?.products"
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
                ₱{{ selectedOrder?.totalTransactionPrice }}
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
import {
  GetAllTransactionAPI,
  UpdateTransactionStatus,
} from "../../../../composables/Transaction";

import Table from "../../../../components/Table/Table.vue";
import Swal from "sweetalert2";

const pendingOrders = ref([]);
const selectedOrder = ref("");

const setNewTransactionStatus = async (id, status) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You're about to change the status of this order to ${status}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const payload = {
          status,
        };
        const response = await UpdateTransactionStatus(id, payload);

        if (response.status === "failed") {
          Swal.fire({
            icon: "error",
            title: "Oops, something went wrong!",
            text: response.message,
          });
          return;
        }

        const orderRef = dbRef(database, `orders/${id}`);
        update(
          orderRef,
          { notificationStatus: "unread", status },
          { merge: true }
        );

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "The order status has been successfully updated.",
        });
        await getAllOrderTransactions();
      } catch (error) {
        console.error(error);
      }
    }
  });
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
    const response = await GetAllTransactionAPI("all", "order");

    if (response.status === "failed") {
      pendingOrders.value = [];
      return;
    }

    pendingOrders.value = response.data;

    pendingOrders.value = pendingOrders.value.map((order) => {
      let totalTransactionPrice = 0;

      // Calculate the total price for all products in the order
      for (const item of order.products) {
        totalTransactionPrice += parseFloat(item.totalPrice);
      }

      return {
        ...order,
        totalTransactionPrice,
      };
    });
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
